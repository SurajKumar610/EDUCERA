import { useState, useEffect } from 'react';
import { getCurrentUser, getProfile, updateProfile, getTaskStats, getAttendanceStats, logout, getSubjects, createSubject, deleteSubject } from '../services/api';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Profile() {
  const [user, setUser] = useState(getCurrentUser());
  const [stats, setStats] = useState({ tasks: null, attendance: null });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    class_name: '',
    board: 'CBSE',
  });
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const [profileRes, taskRes, attendRes, subRes] = await Promise.allSettled([
        getProfile(),
        getTaskStats(),
        getAttendanceStats(new Date().getMonth() + 1, new Date().getFullYear()),
        getSubjects(),
      ]);

      if (profileRes.status === 'fulfilled') {
        const u = profileRes.value.user;
        setUser(u);
        setForm({ name: u.name, class_name: u.class_name || '', board: u.board || 'CBSE' });
      }
      if (taskRes.status === 'fulfilled') setStats(prev => ({ ...prev, tasks: taskRes.value.stats }));
      if (attendRes.status === 'fulfilled') setStats(prev => ({ ...prev, attendance: attendRes.value.stats }));
      if (subRes.status === 'fulfilled') setSubjects(subRes.value.subjects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(form);
      // Update local storage
      const updatedUser = { ...user, ...form };
      localStorage.setItem('educera_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      setToast({ message: 'Profile updated! 🎉', type: 'success' });
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed to update profile', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    setLoadingSubjects(true);
    try {
      const res = await createSubject({ name: newSubject });
      setSubjects([...subjects, res.subject]);
      setNewSubject('');
      setToast({ message: 'Subject added!', type: 'success' });
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed to add subject', type: 'error' });
    } finally {
      setLoadingSubjects(false);
    }
  };

  const handleDeleteSubject = async (id) => {
    if (!window.confirm('Delete this subject?')) return;
    try {
      await deleteSubject(id);
      setSubjects(subjects.filter(s => s.id !== id));
      setToast({ message: 'Subject deleted!', type: 'info' });
    } catch (err) {
      setToast({ message: 'Failed to delete subject', type: 'error' });
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'ED';
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : 'Recently';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="page-enter space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Profile Header */}
      <div className="profile-gradient rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 right-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-violet-500 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl
                       border-2 border-white/20"
            style={{ backgroundColor: user?.avatar_color || '#6C63FF' }}
          >
            {getInitials(user?.name)}
          </div>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-extrabold font-display">{user?.name || 'Student'}</h1>
            <p className="text-white/70 text-sm mt-1">{user?.email}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3 justify-center sm:justify-start">
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium border border-white/10">
                {user?.level === 'college' ? '🎓 College' : '🏫 School'}
              </span>
              {user?.class_name && (
                <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium border border-white/10">
                  📚 {user.class_name}
              </span>
            )}
            {user?.level === 'school' && (
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium border border-white/10">
                📋 {user?.board || 'CBSE'} Board
              </span>
            )}
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium border border-white/10">
                📅 Since {memberSince}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl 
                       text-sm font-semibold transition-all duration-200 border border-white/10"
            >
              {isEditing ? '✕ Cancel' : '✏️ Edit'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 hover-lift">
          <div className="text-2xl mb-2">📋</div>
          <p className="text-2xl font-bold text-dark-800 animate-count-up">{stats.tasks?.total || 0}</p>
          <p className="text-xs text-dark-400 mt-1">Total Tasks</p>
        </div>
        <div className="card p-5 hover-lift">
          <div className="text-2xl mb-2">✅</div>
          <p className="text-2xl font-bold text-emerald-600 animate-count-up">{stats.tasks?.completed || 0}</p>
          <p className="text-xs text-dark-400 mt-1">Completed</p>
        </div>
        <div className="card p-5 hover-lift">
          <div className="text-2xl mb-2">📅</div>
          <p className="text-2xl font-bold text-primary-600 animate-count-up">{stats.attendance?.percentage || 0}%</p>
          <p className="text-xs text-dark-400 mt-1">Attendance Rate</p>
        </div>
        <div className="card p-5 hover-lift">
          <div className="text-2xl mb-2 animate-flame">🔥</div>
          <p className="text-2xl font-bold text-orange-600 animate-count-up">{stats.attendance?.streak || 0}</p>
          <p className="text-xs text-dark-400 mt-1">Day Streak</p>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="card p-6 animate-slide-up border-2 border-primary-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-white text-lg">✏️</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-dark-800 font-display">Edit Profile</h2>
              <p className="text-xs text-dark-400">Update your personal information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-600 mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">
                  {user?.level === 'school' ? 'Class' : 'Year'}
                </label>
                <select
                  value={form.class_name}
                  onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select {user?.level === 'school' ? 'class' : 'year'}</option>
                  {user?.level === 'school'
                    ? ['6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(c => (
                        <option key={c} value={c}>Class {c}</option>
                      ))
                    : ['1st Year', '2nd Year', '3rd Year', '4th Year'].map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))
                  }
                </select>
              </div>

              {user?.level === 'school' && (
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-1.5">Board</label>
                  <select
                    value={form.board}
                    onChange={(e) => setForm({ ...form, board: e.target.value })}
                    className="input-field"
                  >
                    {['CBSE', 'ICSE', 'State Board', 'IB', 'Other'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Account Details */}
        <div className="card p-6">
          <h3 className="font-bold text-dark-800 mb-4 font-display flex items-center gap-2">
            <span className="text-lg">👤</span> Account Details
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Name', value: user?.name, icon: '📛' },
              { label: 'Email', value: user?.email, icon: '📧' },
              { label: 'Level', value: user?.level === 'college' ? 'College' : 'School', icon: user?.level === 'college' ? '🎓' : '🏫' },
              { label: user?.level === 'school' ? 'Class' : 'Year', value: user?.class_name || 'Not set', icon: '📚' },
              ...(user?.level === 'school' ? [{ label: 'Board', value: user?.board || 'CBSE', icon: '📋' }] : []),
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-dark-50 last:border-0">
                <span className="text-sm text-dark-400 flex items-center gap-2">
                  <span>{item.icon}</span> {item.label}
                </span>
                <span className="text-sm font-semibold text-dark-700">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="font-bold text-dark-800 mb-4 font-display flex items-center gap-2">
            <span className="text-lg">⚡</span> Quick Actions
          </h3>
          <div className="space-y-3">
            <a
              href="/tasks"
              className="flex items-center gap-3 p-3 rounded-xl bg-dark-50 hover:bg-primary-50 
                       hover:text-primary-600 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 
                            flex items-center justify-center text-white text-lg
                            group-hover:scale-110 transition-transform">
                ✅
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-dark-700 group-hover:text-primary-600">View Tasks</p>
                <p className="text-xs text-dark-400">{stats.tasks?.pending || 0} pending tasks</p>
              </div>
              <span className="text-dark-300 group-hover:text-primary-400">→</span>
            </a>

            <a
              href="/attendance"
              className="flex items-center gap-3 p-3 rounded-xl bg-dark-50 hover:bg-emerald-50 
                       hover:text-emerald-600 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 
                            flex items-center justify-center text-white text-lg
                            group-hover:scale-110 transition-transform">
                📅
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-dark-700 group-hover:text-emerald-600">Attendance</p>
                <p className="text-xs text-dark-400">{stats.attendance?.present || 0} days present</p>
              </div>
              <span className="text-dark-300 group-hover:text-emerald-400">→</span>
            </a>

            <a
              href="/notes"
              className="flex items-center gap-3 p-3 rounded-xl bg-dark-50 hover:bg-orange-50 
                       hover:text-orange-600 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 
                            flex items-center justify-center text-white text-lg
                            group-hover:scale-110 transition-transform">
                🤖
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-dark-700 group-hover:text-orange-600">AI Notes</p>
                <p className="text-xs text-dark-400">Generate study material</p>
              </div>
              <span className="text-dark-300 group-hover:text-orange-400">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Manage Subjects */}
      <div className="card p-6 border-primary-50 border-2">
        <h3 className="font-bold text-dark-800 mb-4 font-display flex items-center gap-2">
          <span className="text-lg">📚</span> Manage Subjects
        </h3>
        <p className="text-sm text-dark-400 mb-4">Add your coursework subjects to easily tag tasks and track attendance.</p>
        
        <form onSubmit={handleAddSubject} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Add new subject e.g. Data Structures"
            className="input-field flex-1"
          />
          <button 
            type="submit" 
            disabled={loadingSubjects || !newSubject.trim()} 
            className="btn-primary whitespace-nowrap"
          >
            {loadingSubjects ? 'Adding...' : 'Add Subject'}
          </button>
        </form>

        <div className="bg-dark-50 rounded-xl p-4 min-h-[100px]">
          {subjects.length === 0 ? (
            <div className="text-center text-dark-400 text-sm py-4">
              No subjects added yet. Add your first subject above!
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {subjects.map(s => (
                <div key={s.id} className="badge bg-white shadow-sm border border-dark-100 px-3 py-1.5 flex items-center gap-2 group">
                  <span className="font-medium text-dark-700">{s.name}</span>
                  <button 
                    onClick={() => handleDeleteSubject(s.id)}
                    className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all font-semibold"
                    title="Delete subject"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="card p-6">
        <h3 className="font-bold text-dark-800 mb-4 font-display flex items-center gap-2">
          <span className="text-lg">ℹ️</span> About EDUCERA
        </h3>
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-5 border border-primary-100">
          <p className="text-sm text-dark-600 leading-relaxed">
            <strong className="text-primary-600">EDUCERA</strong> is your intelligent learning companion designed for Indian students. 
            Track your daily attendance, manage study tasks with priorities, and get AI-powered study notes 
            aligned to your curriculum. Stay organized, stay ahead! 🚀
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['📊 Attendance Tracking', '✅ Task Management', '🤖 AI Notes', user?.level === 'school' ? '📐 CBSE Aligned' : '🎓 College Curriculum'].map((feature, i) => (
              <span key={i} className="text-xs bg-white/70 text-dark-600 px-3 py-1.5 rounded-lg font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card p-6 border-red-100 border-2">
        <h3 className="font-bold text-red-700 mb-2 font-display flex items-center gap-2">
          <span className="text-lg">⚠️</span> Account Actions
        </h3>
        <p className="text-sm text-dark-400 mb-4">Manage your account session</p>
        <button
          onClick={handleLogout}
          className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-semibold text-sm
                   hover:bg-red-100 transition-all duration-200 border border-red-200
                   flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>
      </div>
    </div>
  );
}
