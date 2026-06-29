import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const isServices = location.pathname === '/services';
  const isBooking = location.pathname === '/booking';

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home', active: isHome },
    { to: '/about', label: 'About', active: isAbout },
    { to: '/services', label: 'Services', active: isServices },
    { to: '/booking', label: 'Book Online', active: isBooking },
  ];

  return (
    <>
      <nav className="sticky top-0 w-full bg-surface/90 backdrop-blur-md z-50 shadow-[0px_20px_24px_-4px_rgba(19,27,46,0.08)]">
        <div className="flex justify-between items-center max-w-container-max mx-auto px-5 md:px-margin-desktop h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img alt="SmileCare Dental Logo" className="h-8 md:h-10 w-auto" src={logo} />
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                className={`font-label-md text-label-md transition-all duration-300 ${link.active ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: auth + hamburger */}
          <div className="flex items-center gap-2 md:gap-3">
            {user ? (
              /* ── Logged-in avatar + dropdown ── */
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-outline-variant/30 hover:bg-surface-container-low transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border-2 border-primary/30">
                    {getInitials(user.name)}
                  </div>
                  <span className="text-sm font-semibold text-on-surface max-w-[100px] truncate hidden sm:block">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant transition-transform duration-200" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    expand_more
                  </span>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-surface rounded-2xl border border-outline-variant/20 shadow-[0px_20px_40px_-8px_rgba(19,27,46,0.15)] overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-outline-variant/10 bg-surface-container-lowest">
                      <p className="text-sm font-semibold text-on-surface truncate">{user.name}</p>
                      <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">person</span>
                        My Profile
                      </Link>
                      <Link
                        to="/booking"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_month</span>
                        Book Appointment
                      </Link>
                      <div className="border-t border-outline-variant/10 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/5 transition-colors w-full text-left"
                        >
                          <span className="material-symbols-outlined text-[18px]">logout</span>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Logged-out: Login + Book buttons (desktop only) ── */
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/auth"
                  className={`font-label-md text-label-md transition-all duration-300 ${location.pathname === '/auth' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  Login
                </Link>
                <Link
                  to="/booking"
                  className="bg-primary text-on-primary px-6 py-3 rounded-medical font-label-md text-label-md hover:bg-primary-container transition-all duration-300 shadow-md inline-block text-center"
                >
                  Book Appointment
                </Link>
              </div>
            )}

            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-surface-container-low transition-colors"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-on-surface">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop overlay */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-40 bg-on-surface/30 backdrop-blur-sm md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-16 right-0 bottom-0 z-50 w-72 bg-surface shadow-[0px_20px_40px_-8px_rgba(19,27,46,0.15)] md:hidden transform transition-all duration-300 ease-in-out border-l border-outline-variant/10 flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Content */}
        <div className="flex-grow overflow-y-auto px-5 py-6 space-y-6">
          {/* User profile section if logged in */}
          {user && (
            <div className="pb-6 border-b border-outline-variant/10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-base border-2 border-primary/30 shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-on-surface truncate">{user.name}</p>
                <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation links */}
          <div className="space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-sm transition-all ${
                  link.active
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User options inside drawer if logged in */}
          {user && (
            <div className="pt-6 border-t border-outline-variant/10 flex flex-col gap-1">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-label-md text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                My Profile
              </Link>
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-label-md text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                Book Appointment
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-label-md text-error hover:bg-error/5 rounded-xl transition-all w-full text-left mt-2"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sign Out
              </button>
            </div>
          )}

          {!user && (
            <div className="pt-6 border-t border-outline-variant/10 flex flex-col gap-2">
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl border border-outline-variant text-on-surface font-label-md text-sm hover:bg-surface-container-low transition-all"
              >
                Login
              </Link>
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-primary text-on-primary py-3 rounded-xl font-label-md text-sm hover:bg-primary-container transition-all shadow-md"
              >
                Book Appointment
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
