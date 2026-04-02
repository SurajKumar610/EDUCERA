import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import Toast from '../components/Toast';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    level: 'school',
    program: '',
    class_name: '',
    board: 'CBSE',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser(form);
      setToast({ message: res.message || 'Account created!', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed. Please try again.';
      setToast({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-2xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6
                          shadow-lg">
              <span className="text-3xl font-bold">E</span>
            </div>
            <h1 className="text-5xl font-extrabold font-display mb-4 leading-tight">
              Welcome to<br />EDUCERA
            </h1>
            <p className="text-sm text-white/60 font-medium tracking-wider uppercase mb-4">Your Full Time Batchie</p>
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
              Your intelligent learning companion. Track attendance, manage tasks, 
              and get AI-powered study notes tailored to the Indian curriculum.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            {[
              { icon: '📊', text: 'Smart attendance tracking' },
              { icon: '✅', text: 'Priority-based task management' },
              { icon: '🤖', text: 'AI-generated study notes (CBSE)' },
              { icon: '🎯', text: 'Personalized for School & College' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <span>{feature.icon}</span>
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
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
              <h2 className="text-2xl font-bold text-dark-800 font-display">Create Account</h2>
              <p className="text-sm text-dark-400 mt-1">
                {step === 1 ? 'Enter your details to get started' : 'Tell us about your education'}
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8 px-4">
              <div className={`flex-1 h-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-primary-500' : 'bg-dark-200'}`} />
              <div className={`flex-1 h-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-primary-500' : 'bg-dark-200'}`} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-dark-600 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      placeholder="Enter your full name"
                      className="input-field"
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-600 mb-1.5">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      placeholder="Min. 6 characters"
                      className="input-field"
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (form.name && form.email && form.password.length >= 6) {
                        setStep(2);
                      } else {
                        setToast({ message: 'Please fill all fields correctly', type: 'warning' });
                      }
                    }}
                    className="btn-primary w-full text-center"
                  >
                    Continue →
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-dark-600 mb-1.5">Education Level</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['school', 'college'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setForm({ ...form, level })}
                          className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                            form.level === level
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-dark-200 hover:border-primary-300'
                          }`}
                        >
                          <span className="text-2xl block mb-1">{level === 'school' ? '🏫' : '🎓'}</span>
                          <span className="text-sm font-semibold capitalize">{level}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {form.level === 'college' && (
                    <div className="animate-fade-in">
                      <label className="block text-sm font-medium text-dark-600 mb-1.5">Undergraduate Program</label>
                      <select
                        name="program"
                        value={form.program}
                        onChange={handleChange}
                        className="input-field"
                        required
                      >
                        <option value="">Select program</option>
                        {['BTech', 'BBA', 'BCA', 'BALLB', 'BSc', 'BA', 'BCom', 'MBBS', 'Other'].map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-dark-600 mb-1.5">
                      {form.level === 'school' ? 'Class' : 'Year'}
                    </label>
                    <select
                      name="class_name"
                      value={form.class_name}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select {form.level === 'school' ? 'class' : 'year'}</option>
                      {form.level === 'school'
                        ? ['6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(c => (
                            <option key={c} value={c}>Class {c}</option>
                          ))
                        : ['1st Year', '2nd Year', '3rd Year', '4th Year'].map(y => (
                            <option key={y} value={y}>{y}</option>
                          ))
                      }
                    </select>
                  </div>
                  {form.level === 'school' && (
                    <div className="animate-fade-in">
                      <label className="block text-sm font-medium text-dark-600 mb-1.5">Board</label>
                      <select
                        name="board"
                        value={form.board}
                        onChange={handleChange}
                        className="input-field"
                      >
                        {['CBSE', 'ICSE', 'State Board', 'IB', 'Other'].map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <p className="text-center text-sm text-dark-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 font-semibold hover:text-primary-600 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}