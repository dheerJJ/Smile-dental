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
  const isProfile = location.pathname === '/profile';

  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 w-full bg-surface/90 backdrop-blur-md z-50 shadow-[0px_20px_24px_-4px_rgba(19,27,46,0.08)]">
      <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-desktop h-20">
        <Link to="/" className="flex items-center gap-2">
          <img alt="SmileCare Dental Logo" className="h-10 w-auto" src={logo} />
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            className={`font-label-md text-label-md transition-all duration-300 ${isHome ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`font-label-md text-label-md transition-all duration-300 ${isAbout ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
            to="/about"
          >
            About
          </Link>
          <Link
            className={`font-label-md text-label-md transition-all duration-300 ${isServices ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
            to="/services"
          >
            Services
          </Link>
          <Link
            className={`font-label-md text-label-md transition-all duration-300 ${isBooking ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
            to="/booking"
          >
            Book Online
          </Link>
        </div>

        {/* Right side: auth */}
        <div className="flex items-center gap-3">
          {user ? (
            /* ── Logged-in avatar + dropdown ── */
            <div className="relative" ref={dropdownRef}>
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
                <div className="absolute right-0 mt-2 w-52 bg-surface rounded-2xl border border-outline-variant/20 shadow-[0px_20px_40px_-8px_rgba(19,27,46,0.15)] overflow-hidden animate-fade-in z-50">
                  {/* User info header */}
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
            /* ── Logged-out: Login + Book buttons ── */
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
