import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import Toast from '../components/Toast';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      setToast({ message: `Welcome back, ${res.user.name}! 🎉`, type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please check your credentials.';
      setToast({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-80 h-80 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-accent-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 
                          flex items-center justify-center mb-6 shadow-glow-lg">
              <span className="text-3xl font-bold">E</span>
            </div>
            <h1 className="text-5xl font-extrabold font-display mb-4 leading-tight">
              Welcome<br />Back! 👋
            </h1>
            <p className="text-lg text-white/60 max-w-md">
              Continue your learning journey. Your tasks, notes, and progress await you.
            </p>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Active Users', value: '10K+', icon: '👥' },
              { label: 'Notes Created', value: '50K+', icon: '📝' },
              { label: 'Tasks Done', value: '100K+', icon: '✅' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-xl font-bold mt-2">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-dark-50">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-glow">
              <span className="text-white text-2xl font-bold">E</span>
            </div>
            <h1 className="text-2xl font-extrabold font-display gradient-text">EDUCERA</h1>
            <p className="text-xs text-dark-400 mt-1">Your Full Time Batchie</p>
          </div>

          <div className="card p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-dark-800 font-display">Sign In</h2>
              <p className="text-sm text-dark-400 mt-1">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="you@example.com"
                  className="input-field"
                  onChange={handleChange}
                  required
                  id="login-email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  placeholder="Enter your password"
                  className="input-field"
                  onChange={handleChange}
                  required
                  id="login-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
                id="login-submit"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In →'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-dark-400 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 font-semibold hover:text-primary-600 transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
