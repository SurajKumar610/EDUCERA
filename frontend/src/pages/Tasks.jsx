import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import { getCurrentUser, getSubjects } from '../services/api';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function Tasks() {
  const user = getCurrentUser();
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    subject: '',
    priority: 'medium',
    due_date: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksRes, subjectsRes] = await Promise.allSettled([
        getTasks(),
        getSubjects(),
      ]);
      if (tasksRes.status === 'fulfilled') setTasks(tasksRes.value.tasks || []);
      if (subjectsRes.status === 'fulfilled') setSubjects(subjectsRes.value.subjects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const res = await updateTask(editingTask.id, form);
        setTasks(tasks.map(t => t.id === editingTask.id ? res.task : t));
        setToast({ message: 'Task updated!', type: 'success' });
      } else {
        const res = await createTask(form);
        setTasks([res.task, ...tasks]);
        setToast({ message: 'Task created!', type: 'success' });
      }
      resetForm();
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed to save task', type: 'error' });
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      const res = await updateTask(task.id, { status: newStatus });
      setTasks(tasks.map(t => t.id === task.id ? res.task : t));
      if (newStatus === 'completed') {
        setToast({ message: '🎉 Task completed!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: 'Failed to update task', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      setToast({ message: 'Task deleted', type: 'info' });
    } catch (err) {
      setToast({ message: 'Failed to delete task', type: 'error' });
    }
  };

  const resetForm = () => {
    setForm({ title: '', description: '', subject: '', priority: 'medium', due_date: '' });
    setShowForm(false);
    setEditingTask(null);
  };

  const startEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description || '',
      subject: task.subject || '',
      priority: task.priority,
      due_date: task.due_date || '',
    });
    setEditingTask(task);
    setShowForm(true);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const priorityColors = {
    high: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-l-red-500', badge: 'badge-danger' },
    medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-l-amber-500', badge: 'badge-warning' },
    low: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-l-emerald-500', badge: 'badge-success' },
  };

  if (loading) return <div className="flex items-center justify-center h-[60vh]"><LoadingSpinner size="lg" text="Loading tasks..." /></div>;

  return (
    <div className="page-enter space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-dark-800 font-display">Tasks</h1>
          <p className="text-sm text-dark-400">Manage your assignments and to-dos</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All', count: tasks.length },
          { key: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
          { key: 'in_progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in_progress').length },
          { key: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap
              ${filter === f.key
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                : 'bg-white text-dark-500 border border-dark-200 hover:border-primary-300'
              }`}
          >
            {f.label} <span className="text-xs opacity-80">({f.count})</span>
          </button>
        ))}
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={(e) => e.target === e.currentTarget && resetForm()}>
          <div className="card p-6 w-full max-w-lg animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark-800 font-display">
                {editingTask ? 'Edit Task' : 'New Task'}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-dark-50 rounded-lg transition-colors text-dark-400">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Complete Math Assignment"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Add details..."
                  className="input-field min-h-[80px] resize-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-1.5 flex justify-between">
                    <span>Subject</span>
                    <a href="/profile" className="text-xs text-primary-500 hover:underline">Manage</a>
                  </label>
                  <input
                    list="task-subjects"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Enter or select subject"
                    className="input-field"
                  />
                  <datalist id="task-subjects">
                    {subjects.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-1.5">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="input-field"
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Due Date</label>
                <input
                  type="date"
                  value={form.due_date}
                  onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={resetForm} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          icon="📋"
          title={filter === 'all' ? 'No tasks yet' : `No ${filter.replace('_', ' ')} tasks`}
          message="Start by creating a new task to organize your study schedule."
          action="Add Your First Task"
          onAction={() => { resetForm(); setShowForm(true); }}
        />
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task, index) => {
            const pc = priorityColors[task.priority] || priorityColors.medium;
            const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed';

            return (
              <div
                key={task.id}
                className={`card p-4 border-l-4 ${pc.border} animate-fade-in group
                  ${task.status === 'completed' ? 'opacity-60' : ''}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Status checkbox */}
                  <button
                    onClick={() => handleStatusChange(task, task.status === 'completed' ? 'pending' : 'completed')}
                    className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 
                              transition-all duration-200
                              ${task.status === 'completed' 
                                ? 'bg-emerald-500 border-emerald-500 text-white' 
                                : 'border-dark-300 hover:border-primary-500'}`}
                  >
                    {task.status === 'completed' && <span className="text-xs">✓</span>}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-semibold text-dark-800 ${task.status === 'completed' ? 'line-through' : ''}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button
                          onClick={() => startEdit(task)}
                          className="p-1.5 rounded-lg hover:bg-dark-50 text-dark-400 hover:text-primary-500 transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-dark-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    {task.description && (
                      <p className="text-sm text-dark-400 mt-1 line-clamp-2">{task.description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className={`${pc.badge} text-xs`}>{task.priority}</span>
                      {task.subject && (
                        <span className="badge-primary text-xs">{task.subject}</span>
                      )}
                      {task.due_date && (
                        <span className={`text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-dark-400'}`}>
                          {isOverdue ? '⚠️ Overdue: ' : '📅 '}
                          {new Date(task.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                      {task.status === 'in_progress' && (
                        <span className="badge bg-blue-100 text-blue-700 text-xs">In Progress</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick status change */}
                {task.status !== 'completed' && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-dark-100 opacity-0 group-hover:opacity-100 transition-all">
                    {task.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(task, 'in_progress')}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        ▶ Start Working
                      </button>
                    )}
                    <button
                      onClick={() => handleStatusChange(task, 'completed')}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      ✓ Mark Complete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
