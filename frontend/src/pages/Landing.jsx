import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: '📊',
      title: 'Smart Attendance',
      desc: 'Track daily attendance with calendar view, streaks, and monthly analytics. Never miss a day!',
      color: 'from-emerald-500 to-teal-600',
      highlight: 'bg-emerald-50 border-emerald-200',
    },
    {
      icon: '✅',
      title: 'Task Management',
      desc: 'Organize assignments with priorities, due dates, and status tracking. Stay on top of your studies.',
      color: 'from-violet-500 to-purple-600',
      highlight: 'bg-violet-50 border-violet-200',
    },
    {
      icon: '🤖',
      title: 'AI-Powered Notes',
      desc: 'Generate comprehensive study notes aligned with CBSE curriculum. AI does the heavy lifting for you.',
      color: 'from-orange-500 to-red-500',
      highlight: 'bg-orange-50 border-orange-200',
    },
    {
      icon: '📐',
      title: 'CBSE Aligned',
      desc: 'Designed specifically for Indian school and college students. Subjects, topics, and content—all CBSE-ready.',
      color: 'from-blue-500 to-indigo-600',
      highlight: 'bg-blue-50 border-blue-200',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Students', icon: '👥' },
    { value: '50K+', label: 'Notes Generated', icon: '📝' },
    { value: '100K+', label: 'Tasks Completed', icon: '✅' },
    { value: '95%', label: 'Satisfaction', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-dark-100' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/25">
              <span className="text-white text-lg font-bold">E</span>
            </div>
            <h1 className="text-xl font-extrabold font-display gradient-text tracking-tight">
              EDUCERA
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-dark-600 hover:text-primary-600 font-semibold text-sm transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link to="/signup" className="btn-primary text-sm py-2 px-5">
              Get Started →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-1.5 mb-8">
              <span className="animate-sparkle text-sm">✨</span>
              <span className="text-xs font-semibold text-primary-700">EDUCERA : Your Full Time Batchie</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-tight text-dark-900 mb-6">
              Your Full Time
              <br />
              <span className="gradient-text">Batchie</span>
            </h1>

            <p className="text-lg text-dark-500 max-w-xl mx-auto leading-relaxed mb-10">
              Track attendance, manage tasks, and get AI-powered study notes—all tailored 
              for CBSE and Indian curricula. Designed for students who mean business.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary text-base px-8 py-3.5 shadow-xl shadow-primary-500/20 
                                         hover:shadow-2xl hover:shadow-primary-500/30 transition-all">
                Start Learning Free →
              </Link>
              <Link to="/login" className="btn-secondary text-base px-8 py-3.5">
                I have an account
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl shadow-dark-900/10 border border-dark-200/50 p-1 overflow-hidden">
              <div className="bg-dark-50 rounded-xl p-6">
                {/* Fake dashboard preview */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <div className="flex-1 mx-8 h-7 bg-white rounded-lg flex items-center px-3">
                    <span className="text-xs text-dark-400">educera.app/dashboard</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Tasks', val: '12', color: 'bg-violet-100 text-violet-700' },
                    { label: 'Completed', val: '8', color: 'bg-emerald-100 text-emerald-700' },
                    { label: 'Attendance', val: '94%', color: 'bg-blue-100 text-blue-700' },
                    { label: 'Streak', val: '7🔥', color: 'bg-orange-100 text-orange-700' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
                      <p className={`text-lg font-bold ${s.color.split(' ')[1]}`}>{s.val}</p>
                      <p className="text-xs text-dark-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['📊 Dashboard', '✅ Tasks', '🤖 AI Notes'].map((label, i) => (
                    <div key={i} className={`rounded-xl p-4 text-center text-sm font-semibold shadow-sm ${
                      i === 0 ? 'bg-primary-500 text-white' : 'bg-white text-dark-600'
                    }`}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-dark-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <span className="text-2xl block mb-1">{stat.icon}</span>
                <p className="text-2xl font-extrabold text-white font-display">{stat.value}</p>
                <p className="text-xs text-white/50 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-gradient-mesh">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-3 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-dark-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-dark-500 max-w-lg mx-auto">
              Powerful tools designed specifically for Indian students, aligned with CBSE and other curricula.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveFeature(i)}
                className={`card p-7 group cursor-pointer transition-all duration-500 hover-lift ${
                  activeFeature === i ? `border-2 ${feature.highlight}` : ''
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color}
                              flex items-center justify-center text-2xl mb-5
                              shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-800 mb-2 font-display">{feature.title}</h3>
                <p className="text-sm text-dark-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-500 mb-3 block">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-dark-900">
              Get Started in 3 Steps
            </h2>
          </div>

          <div className="space-y-6">
            {[
              { step: '01', title: 'Create Your Account', desc: 'Sign up with your email. Choose school or college level, select your board, and you\'re ready!', icon: '🚀' },
              { step: '02', title: 'Set Up Your Dashboard', desc: 'Add your subjects, create tasks with priorities, and mark your daily attendance to build streaks.', icon: '⚡' },
              { step: '03', title: 'Learn with AI', desc: 'Generate AI-powered study notes for any CBSE topic. Edit, save, and access them anytime.', icon: '🤖' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 p-6 rounded-2xl hover:bg-dark-50 transition-all duration-300 group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center
                              text-white font-extrabold text-lg shadow-lg shadow-primary-500/20
                              group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-800 mb-1 font-display flex items-center gap-2">
                    {item.title} <span className="text-xl">{item.icon}</span>
                  </h3>
                  <p className="text-sm text-dark-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-bg rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold font-display mb-4">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto">
                Join thousands of Indian students who use EDUCERA — Your Full Time Batchie — to stay organized and ace their exams.
              </p>
              <Link to="/signup" className="inline-block bg-white text-primary-600 px-8 py-3.5 rounded-xl 
                                          font-bold hover:bg-white/90 transition-all duration-200 shadow-xl
                                          hover:shadow-2xl hover:translate-y-[-2px]">
                Create Free Account →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white text-sm font-bold">E</span>
              </div>
              <span className="text-white font-bold font-display">EDUCERA</span>
              <span className="text-white/50 text-xs">: Your Full Time Batchie</span>
            </div>
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} EDUCERA : Your Full Time Batchie. Built for Indian students with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
