import { useState, useEffect } from 'react';
import { getAttendance, getAttendanceStats, markAttendance, updateAttendance, deleteAttendance, getCurrentUser, getSubjects } from '../services/api';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function Attendance() {
  const user = getCurrentUser();
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showMarkForm, setShowMarkForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [markForm, setMarkForm] = useState({
    date: now.toISOString().split('T')[0],
    status: 'present',
    subject: '',
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, [month, year]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [attendRes, statsRes, subRes] = await Promise.allSettled([
        getAttendance(month, year),
        getAttendanceStats(month, year),
        getSubjects(),
      ]);
      if (attendRes.status === 'fulfilled') setRecords(attendRes.value.attendance || []);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value.stats || null);
      if (subRes.status === 'fulfilled') setSubjects(subRes.value.subjects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setMarkForm({
      date: record.date,
      status: record.status,
      subject: record.subject || '',
      notes: record.notes || '',
    });
    setEditId(record.id);
    setShowMarkForm(true);
  };

  const handleMark = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateAttendance(editId, markForm);
        setToast({ message: 'Attendance updated! ✅', type: 'success' });
      } else {
        await markAttendance(markForm);
        setToast({ message: 'Attendance marked! ✅', type: 'success' });
      }
      setShowMarkForm(false);
      setEditId(null);
      setMarkForm({ date: now.toISOString().split('T')[0], status: 'present', subject: '', notes: '' });
      loadData();
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed to save attendance', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this attendance record?')) return;
    try {
      await deleteAttendance(id);
      setToast({ message: 'Record removed', type: 'info' });
      loadData();
    } catch (err) {
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  const navigateMonth = (dir) => {
    let newMonth = month + dir;
    let newYear = year;
    if (newMonth > 12) { newMonth = 1; newYear++; }
    if (newMonth < 1) { newMonth = 12; newYear--; }
    setMonth(newMonth);
    setYear(newYear);
  };

  // Generate calendar data
  const getDaysInMonth = (m, y) => new Date(y, m, 0).getDate();
  const getFirstDayOfMonth = (m, y) => new Date(y, m - 1, 1).getDay();
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const getStatusForDate = (day) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return records.find(r => r.date === dateStr);
  };

  const statusColors = {
    present: 'bg-emerald-500 text-white',
    absent: 'bg-red-500 text-white',
    half_day: 'bg-amber-500 text-white',
  };

  const percentage = stats?.percentage || 0;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  if (loading) return <div className="flex items-center justify-center h-[60vh]"><LoadingSpinner size="lg" text="Loading attendance..." /></div>;

  return (
    <div className="page-enter space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-dark-800 font-display">Attendance</h1>
          <p className="text-sm text-dark-400">Track your daily attendance and streaks</p>
        </div>
        <button
          onClick={() => { setEditId(null); setShowMarkForm(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <span className="text-lg">+</span> Mark Attendance
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 flex items-center gap-4">
          {/* Circular Progress */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <circle cx="60" cy="60" r="54" fill="none" stroke="#6C63FF" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-dark-800">{percentage}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-dark-400">Attendance</p>
            <p className="text-lg font-bold text-dark-800">{stats?.present || 0}/{stats?.total_days || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="text-2xl">✅</span>
          <p className="text-2xl font-bold text-emerald-600">{stats?.present || 0}</p>
          <p className="text-xs text-dark-400">Present</p>
        </div>

        <div className="stat-card">
          <span className="text-2xl">❌</span>
          <p className="text-2xl font-bold text-red-600">{stats?.absent || 0}</p>
          <p className="text-xs text-dark-400">Absent</p>
        </div>

        <div className="stat-card">
          <span className="text-2xl">🔥</span>
          <p className="text-2xl font-bold text-orange-600">{stats?.streak || 0}</p>
          <p className="text-xs text-dark-400">Day Streak</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigateMonth(-1)} className="btn-secondary px-3 py-2 text-sm">← Prev</button>
          <h2 className="text-lg font-bold text-dark-800 font-display">
            {MONTHS[month - 1]} {year}
          </h2>
          <button onClick={() => navigateMonth(1)} className="btn-secondary px-3 py-2 text-sm">Next →</button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs font-semibold text-dark-400 py-2">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for first day offset */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const record = getStatusForDate(day);
            const isToday = day === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear();
            const isFuture = new Date(year, month - 1, day) > now;

            return (
              <div
                key={day}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm
                  transition-all duration-200 cursor-default relative group
                  ${record ? statusColors[record.status] : isFuture ? 'text-dark-300' : 'bg-dark-50 text-dark-500 hover:bg-dark-100'}
                  ${isToday && !record ? 'ring-2 ring-primary-500 ring-offset-2' : ''}
                `}
              >
                <span className={`font-semibold ${isToday && !record ? 'text-primary-600' : ''}`}>
                  {day}
                </span>
                {record && (
                  <div className="absolute -top-2 -right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(record)}
                      className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center transform hover:scale-110 shadow-sm"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="w-5 h-5 rounded-full bg-red-500 text-white text-[12px] flex items-center justify-center transform hover:scale-110 shadow-sm"
                      title="Delete"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-dark-100">
          {[
            { label: 'Present', color: 'bg-emerald-500' },
            { label: 'Absent', color: 'bg-red-500' },
            { label: 'Half Day', color: 'bg-amber-500' },
            { label: 'Today', color: 'ring-2 ring-primary-500 bg-dark-50' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${item.color}`} />
              <span className="text-xs text-dark-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mark Attendance Modal */}
      {showMarkForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={(e) => e.target === e.currentTarget && setShowMarkForm(false)}>
          <div className="card p-6 w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark-800 font-display">{editId ? 'Edit Attendance' : 'Mark Attendance'}</h2>
              <button 
                onClick={() => { setShowMarkForm(false); setEditId(null); }} 
                className="p-2 hover:bg-dark-50 rounded-lg"
              >✕</button>
            </div>

            <form onSubmit={handleMark} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Date</label>
                <input
                  type="date"
                  value={markForm.date}
                  onChange={(e) => setMarkForm({ ...markForm, date: e.target.value })}
                  className="input-field disabled:opacity-50"
                  max={now.toISOString().split('T')[0]}
                  disabled={!!editId}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'present', label: 'Present', icon: '✅', color: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
                    { value: 'absent', label: 'Absent', icon: '❌', color: 'border-red-500 bg-red-50 text-red-700' },
                    { value: 'half_day', label: 'Half Day', icon: '🌗', color: 'border-amber-500 bg-amber-50 text-amber-700' },
                  ].map(s => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setMarkForm({ ...markForm, status: s.value })}
                      className={`p-3 rounded-xl border-2 text-center transition-all text-sm font-semibold
                        ${markForm.status === s.value ? s.color : 'border-dark-200 hover:border-dark-300'}`}
                    >
                      <span className="text-lg block mb-1">{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5 flex justify-between">
                  <span>Subject (optional)</span>
                  <a href="/profile" className="text-xs text-primary-500 hover:underline">Manage</a>
                </label>
                <input
                  list="attendance-subjects"
                  value={markForm.subject}
                  onChange={(e) => setMarkForm({ ...markForm, subject: e.target.value })}
                  placeholder="General / All Subjects"
                  className="input-field"
                />
                <datalist id="attendance-subjects">
                  {subjects.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Notes</label>
                <input
                  type="text"
                  value={markForm.notes}
                  onChange={(e) => setMarkForm({ ...markForm, notes: e.target.value })}
                  placeholder="Optional notes..."
                  className="input-field"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                {editId ? 'Update Attendance' : 'Mark Attendance'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Recent Records */}
      <div className="card p-5">
        <h3 className="font-bold text-dark-800 mb-4 font-display">Recent Records</h3>
        {records.length === 0 ? (
          <p className="text-center text-sm text-dark-400 py-6">No attendance records for this month</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {records.slice(0, 15).map(r => (
              <div key={r.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-dark-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${statusColors[r.status]?.split(' ')[0] || 'bg-gray-400'}`} />
                  <div>
                    <span className="text-sm font-medium text-dark-700">
                      {new Date(r.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                    {r.subject && <span className="text-xs text-dark-400 ml-2">• {r.subject}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold capitalize
                    ${r.status === 'present' ? 'text-emerald-600' : r.status === 'absent' ? 'text-red-600' : 'text-amber-600'}`}>
                    {r.status.replace('_', ' ')}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(r)} className="text-blue-500 hover:text-blue-700 text-xs font-medium bg-blue-50 px-2 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700 text-xs font-medium bg-red-50 px-2 py-1 rounded">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
