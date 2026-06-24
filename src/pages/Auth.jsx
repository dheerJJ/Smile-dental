import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [tab, setTab] = useState('login'); // 'login' | 'register'

  // Login state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // ── Handlers ───────────────────────────────────────────────

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginData.email || !loginData.password) {
      setLoginError('Please fill in all fields.');
      return;
    }
    setLoginLoading(true);
    setTimeout(() => {
      const result = login(loginData.email, loginData.password);
      setLoginLoading(false);
      if (result.success) {
        navigate('/profile');
      } else {
        setLoginError(result.error);
      }
    }, 600);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');
    if (regData.password !== regData.confirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }
    // Validate phone: must be exactly 10 digits
    const digitsOnly = regData.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      setRegError('Phone number must be exactly 10 digits.');
      return;
    }
    setRegLoading(true);
    setTimeout(() => {
      const result = register({
        name: regData.name,
        email: regData.email,
        phone: regData.phone,
        password: regData.password,
      });
      setRegLoading(false);
      if (result.success) {
        setRegSuccess('Account created! Redirecting…');
        setTimeout(() => navigate('/profile'), 900);
      } else {
        setRegError(result.error);
      }
    }, 600);
  };

  // ── Helpers ────────────────────────────────────────────────

  const inputClass =
    'w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200';

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-16 animate-fade-in">
      {/* Background blob */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo & branding */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="SmileCare Logo" className="h-12 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-headline-md font-headline-md text-on-surface">
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            {tab === 'login'
              ? 'Sign in to view your appointments and profile.'
              : 'Join SmileCare to manage your dental visits.'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 shadow-[0px_20px_60px_-12px_rgba(19,27,46,0.12)] overflow-hidden">

          {/* Tab switcher */}
          <div className="flex border-b border-outline-variant/20">
            <button
              onClick={() => { setTab('login'); setLoginError(''); }}
              className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 ${
                tab === 'login'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">login</span>
                Sign In
              </span>
            </button>
            <button
              onClick={() => { setTab('register'); setRegError(''); setRegSuccess(''); }}
              className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 ${
                tab === 'register'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                Create Account
              </span>
            </button>
          </div>

          <div className="p-8">

            {/* ── LOGIN FORM ── */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      mail
                    </span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={`${inputClass} pl-10`}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      lock
                    </span>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`${inputClass} pl-10`}
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                {loginError && (
                  <div className="flex items-center gap-2 bg-error/10 border border-error/20 text-error text-sm px-4 py-3 rounded-xl">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loginLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                      Signing in…
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">login</span>
                      Sign In
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-on-surface-variant">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('register')}
                    className="text-primary font-semibold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </form>
            )}

            {/* ── REGISTER FORM ── */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-5 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      person
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Arjun Sharma"
                      value={regData.name}
                      onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                      className={`${inputClass} pl-10`}
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      mail
                    </span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      className={`${inputClass} pl-10`}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      phone
                    </span>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={regData.phone}
                      onChange={(e) => {
                        // Allow digits, spaces, + and - for formatting
                        setRegData({ ...regData, phone: e.target.value });
                      }}
                      className={`${inputClass} pl-10 pr-14`}
                      autoComplete="tel"
                      maxLength={15}
                    />
                    {/* Digit counter */}
                    <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold ${
                      regData.phone.replace(/\D/g, '').length === 10
                        ? 'text-primary'
                        : 'text-on-surface-variant/50'
                    }`}>
                      {regData.phone.replace(/\D/g, '').length}/10
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                        lock
                      </span>
                      <input
                        type="password"
                        placeholder="Min. 6 characters"
                        value={regData.password}
                        onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                        className={`${inputClass} pl-10`}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      Confirm
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                        lock_open
                      </span>
                      <input
                        type="password"
                        placeholder="Re-enter password"
                        value={regData.confirmPassword}
                        onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                        className={`${inputClass} pl-10`}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                </div>

                {regError && (
                  <div className="flex items-center gap-2 bg-error/10 border border-error/20 text-error text-sm px-4 py-3 rounded-xl">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    {regError}
                  </div>
                )}

                {regSuccess && (
                  <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-sm px-4 py-3 rounded-xl">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    {regSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {regLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                      Creating account…
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">person_add</span>
                      Create Account
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-on-surface-variant">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6 text-xs text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Back to SmileCare Home
          </Link>
        </p>
      </div>
    </div>
  );
}
