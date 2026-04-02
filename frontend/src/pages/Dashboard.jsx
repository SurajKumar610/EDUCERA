import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, getTaskStats, getAttendanceStats } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { ClipboardList, CheckCircle, Calendar, Flame, TrendingUp, AlertCircle, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const user = getCurrentUser();
  const [taskStats, setTaskStats] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [taskRes, attendRes] = await Promise.allSettled([
        getTaskStats(),
        getAttendanceStats(new Date().getMonth() + 1, new Date().getFullYear()),
      ]);

      if (taskRes.status === 'fulfilled') setTaskStats(taskRes.value.stats);
      if (attendRes.status === 'fulfilled') setAttendanceStats(attendRes.value.stats);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { title: 'Add Task', icon: <CheckCircle className="w-6 h-6" />, desc: 'Create a new task', path: '/tasks', color: 'from-violet-500 to-purple-600' },
    { title: 'Mark Attendance', icon: <Calendar className="w-6 h-6" />, desc: 'Log today\'s attendance', path: '/attendance', color: 'from-emerald-500 to-teal-600' },
    { title: 'AI Notes', icon: <Sparkles className="w-6 h-6" />, desc: 'Generate study notes', path: '/notes', color: 'from-orange-500 to-red-500' },
  ];

  const tips = [
    `📌 Use AI Notes to generate ${user?.level === 'school' ? 'CBSE-aligned' : 'comprehensive'} study material for any subject!`,
    '🎯 Set task priorities to stay on top of your most important assignments.',
    '📅 Mark your attendance daily to build a consistent study streak!',
    '📖 Review your notes weekly for better retention and understanding.',
    '🔥 Aim for 7-day attendance streaks to stay disciplined and focused.',
    '💡 Break large tasks into smaller sub-tasks for better progress tracking.',
  ];

  const [randomTip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

  // Calculate task completion percentage
  const taskCompletionPct = taskStats?.total > 0
    ? Math.round((Number(taskStats.completed) / Number(taskStats.total)) * 100)
    : 0;

  // Today's date formatted
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <motion.div variants={itemVariants} className="gradient-bg rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-primary-500/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white rounded-full blur-2xl" />
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white rounded-full blur-xl" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm text-white/80 font-medium tracking-wide update-y-1">{greeting} 👋</p>
              <h1 className="text-4xl font-extrabold font-display mt-1 drop-shadow-sm">
                {user?.name || 'Student'}
              </h1>
              <p className="text-white/80 mt-2 text-sm font-medium">
                {user?.level === 'college' ? '🎓' : '🏫'} {user?.class_name || ''}
                {user?.level === 'school' && ` • ${user?.board || 'CBSE'} Board`}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
              <p className="text-white font-medium text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {today}
              </p>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-accent-300" />
            <p className="text-white/90 text-sm font-medium">
              {randomTip.replace('📌', '').replace('🎯', '').replace('📅', '').replace('📖', '').replace('🔥', '').replace('💡', '')}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Tasks', value: taskStats?.pending || 0, sub: `${taskStats?.total || 0} Total`, icon: <ClipboardList className="w-6 h-6 text-primary-500" />, badge: 'badge-primary' },
          { label: 'Completed', value: taskStats?.completed || 0, sub: `${taskCompletionPct}% Rate`, icon: <CheckCircle className="w-6 h-6 text-emerald-500" />, badge: 'badge-success' },
          { label: 'Days Present', value: `${attendanceStats?.present || 0}/${attendanceStats?.total_days || 0}`, sub: `${attendanceStats?.percentage || 0}%`, icon: <Calendar className="w-6 h-6 text-blue-500" />, badge: 'badge-warning' },
          { label: 'Day Streak', value: attendanceStats?.streak || 0, sub: 'Active Streak', icon: <Flame className="w-6 h-6 text-orange-500 animate-pulse-slow" />, badge: 'badge-danger' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="stat-card hover-lift bg-white/80 backdrop-blur-xl border border-white/60">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-dark-50 rounded-xl shadow-inner">{stat.icon}</div>
              <span className={stat.badge}>{stat.sub}</span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-extrabold text-dark-800 font-display drop-shadow-sm">{stat.value}</p>
              <p className="text-sm font-medium text-dark-500 mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Task Completion Progress */}
      <motion.div variants={itemVariants} className="card-glass p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-dark-800 font-display flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-500" />
            Task Completion Progress
          </h3>
          <Link to="/tasks" className="text-sm text-primary-600 font-semibold hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors">
            View All →
          </Link>
        </div>
        <div className="w-full bg-dark-100 rounded-full h-5 overflow-hidden shadow-inner border border-dark-200/50 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${taskCompletionPct}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-primary-500 relative shadow-lg"
          >
            {taskCompletionPct > 10 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-white font-bold drop-shadow-md">
                {taskCompletionPct}%
              </span>
            )}
          </motion.div>
        </div>
        <div className="flex justify-between mt-3 text-sm font-medium text-dark-500">
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> {taskStats?.completed || 0} completed</span>
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /> {taskStats?.in_progress || 0} in progress</span>
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400" /> {taskStats?.pending || 0} pending</span>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-bold text-dark-800 mb-4 font-display flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-500" /> Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="card-glass p-6 group hover-lift border border-white/60"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.color} 
                            flex items-center justify-center text-white mb-5
                            shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {link.icon}
              </div>
              <h3 className="text-lg font-bold text-dark-800 group-hover:text-primary-600 transition-colors font-display">
                {link.title}
              </h3>
              <p className="text-sm font-medium text-dark-500 mt-1">{link.desc}</p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Priority Tasks Preview */}
      {taskStats && Number(taskStats.high_priority) > 0 && (
        <motion.div variants={itemVariants} className="card-glass p-6 border-l-4 border-l-red-500 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-red-500/5 rounded-bl-[100px] pointer-events-none" />
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-dark-800 font-display">High Priority</h3>
            <span className="badge-danger ml-auto shadow-sm px-3">{taskStats.high_priority} tasks</span>
          </div>
          <p className="text-sm font-medium text-dark-600 leading-relaxed">
            You have {taskStats.high_priority} high-priority task(s) that need immediate attention.{' '}
            <Link to="/tasks" className="text-red-600 font-bold hover:text-red-700 underline underline-offset-2">
              Review tasks →
            </Link>
          </p>
        </motion.div>
      )}

      {/* Attendance & Study Tip Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-glass p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-dark-800 font-display flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" /> This Month's Attendance
            </h3>
            <Link to="/attendance" className="text-sm text-primary-600 font-semibold hover:text-primary-700">
              Details →
            </Link>
          </div>
          <div className="w-full bg-dark-100 rounded-full h-4 overflow-hidden shadow-inner p-0.5 border border-dark-200/50">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${attendanceStats?.percentage || 0}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 relative shadow-md"
            />
          </div>
          <div className="flex justify-between mt-4 text-sm font-medium text-dark-500">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> {attendanceStats?.present || 0} present</span>
            <span className="flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-red-500" /> {attendanceStats?.absent || 0} absent</span>
          </div>
        </div>

        {/* Study Tip Card */}
        <div className="card border-[1.5px] border-primary-100 p-0 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative p-6 flex items-start gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-primary-100/50 flex-shrink-0 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-800 mb-2 font-display">Pro Study Tip</h3>
              <p className="text-sm font-medium text-dark-600 leading-relaxed">
                Use the <Link to="/notes" className="text-primary-600 font-bold hover:text-primary-700 underline underline-offset-2 decoration-primary-300">AI Notes Generator</Link> to 
                create comprehensive study material for any {user?.level === 'school' ? 'CBSE ' : ''}topic. Keys concepts, formulas, 
                and exam tips are aligned natively to your curriculum!
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}