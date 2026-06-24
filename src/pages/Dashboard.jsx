import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import {
  getAppointments,
  getSettings,
  getServices,
} from '../utils/storage';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('My Appointments');

  // Core State
  const [appointments, setAppointments] = useState([]);
  const [settings, setSettings] = useState({});
  const [services, setServices] = useState({});

  // User profile (simulated — in a real app this would come from auth)
  const [userProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 (555) 012-3456',
    avatar: 'JD',
  });

  // Load state on mount
  useEffect(() => {
    setAppointments(getAppointments());
    setSettings(getSettings());
    setServices(getServices());
  }, []);

  // Helper mappings
  const getServiceLabel = (serviceId) => {
    const srv = services[serviceId];
    return srv ? srv.title : 'General Consultation';
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-primary-fixed/20 text-primary';
      case 'Pending':
        return 'bg-secondary-container/20 text-on-secondary-container';
      case 'Completed':
        return 'bg-surface-container-highest text-on-surface-variant';
      case 'Cancelled':
        return 'bg-error-container/20 text-error';
      default:
        return 'bg-surface-container-low text-on-surface';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed': return 'check_circle';
      case 'Pending': return 'schedule';
      case 'Completed': return 'verified';
      case 'Cancelled': return 'cancel';
      default: return 'info';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'PT';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // My appointments stats
  const myAppointments = appointments;
  const upcomingCount = myAppointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending').length;
  const completedCount = myAppointments.filter((a) => a.status === 'Completed').length;
  const pendingCount = myAppointments.filter((a) => a.status === 'Pending').length;

  const navTabs = [
    { id: 'My Appointments', icon: 'calendar_month' },
    { id: 'Book New', icon: 'add_circle' },
    { id: 'Services', icon: 'medical_services' },
    { id: 'My Profile', icon: 'person' },
  ];

  return (
    <div className="bg-surface font-body-md text-on-surface select-none overflow-x-hidden min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-md flex flex-col p-gutter space-y-unit transition-all duration-300">
        <div className="mb-10 px-2 py-4 cursor-pointer" onClick={() => navigate('/')}>
          <img
            alt="SmileCare Dental Logo"
            className="h-10 w-auto object-contain hover:opacity-80 transition-opacity"
            src={logo}
            title="Go to Home"
          />
        </div>
        <div className="flex flex-col space-y-2 flex-grow">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => tab.id === 'Book New' ? navigate('/booking') : setActiveTab(tab.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg font-semibold transition-transform active:scale-95 text-left w-full ${
                activeTab === tab.id && tab.id !== 'Book New'
                  ? 'bg-secondary-container text-on-secondary-container scale-98 shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              <span className="font-label-md text-label-md">{tab.id}</span>
            </button>
          ))}
        </div>
        <div className="mt-auto pt-6 border-t border-outline-variant/20">
          <Link
            to="/booking"
            className="w-full flex items-center justify-center space-x-2 py-3 bg-primary text-on-primary rounded-xl font-headline-md text-sm hover:opacity-90 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined">event_available</span>
            <span>Book Appointment</span>
          </Link>
          <div className="mt-6 flex items-center space-x-3 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm border-2 border-primary/30">
              {userProfile.avatar}
            </div>
            <div>
              <p className="text-on-surface font-semibold text-xs">{userProfile.name}</p>
              <p className="text-on-surface-variant text-[10px]">Patient Portal</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 flex-grow min-h-screen flex flex-col">
        {/* Top Bar Header */}
        <header className="h-20 bg-surface/90 backdrop-blur-md sticky top-0 z-40 px-margin-desktop flex items-center justify-between border-b border-outline-variant/10">
          <div>
            <h1 className="text-headline-md font-headline-md text-on-surface">
              {activeTab === 'My Appointments' && 'My Appointments'}
              {activeTab === 'Services' && 'Our Services'}
              {activeTab === 'My Profile' && 'My Profile'}
            </h1>
            <p className="text-xs text-on-surface-variant">
              {activeTab === 'My Appointments' && 'Track and manage your dental visits'}
              {activeTab === 'Services' && 'Explore treatments available at SmileCare'}
              {activeTab === 'My Profile' && 'Your personal account information'}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/booking"
              className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-label-md text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Appointment
            </Link>
            <div className="h-8 w-[1px] bg-outline-variant/30"></div>
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('My Profile')}>
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm border-2 border-primary/30 group-hover:border-primary transition-colors">
                {userProfile.avatar}
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold group-hover:text-primary transition-colors">{userProfile.name}</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Patient</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-container-max mx-auto space-y-8 flex-grow w-full">

          {/* SCREEN: MY APPOINTMENTS */}
          {activeTab === 'My Appointments' && (
            <div className="space-y-8 animate-fade-in">

              {/* Summary Cards */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl shadow-[0px_20px_24px_-4px_rgba(19,27,46,0.04)] border border-outline-variant/30 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-primary-fixed/30 text-primary rounded-xl">
                      <span className="material-symbols-outlined">upcoming</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase font-semibold tracking-wide">Upcoming</p>
                      <p className="text-headline-lg font-headline-lg text-on-surface">{upcomingCount}</p>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant">Confirmed &amp; pending visits</p>
                </div>
                <div className="glass-card p-6 rounded-2xl shadow-[0px_20px_24px_-4px_rgba(19,27,46,0.04)] border border-outline-variant/30 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-surface-container-highest text-on-surface rounded-xl">
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase font-semibold tracking-wide">Completed</p>
                      <p className="text-headline-lg font-headline-lg text-on-surface">{completedCount}</p>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant">Successfully treated visits</p>
                </div>
                <div className="glass-card p-6 rounded-2xl shadow-[0px_20px_24px_-4px_rgba(19,27,46,0.04)] border border-outline-variant/30 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-secondary-container/20 text-on-secondary-container rounded-xl">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase font-semibold tracking-wide">Awaiting</p>
                      <p className="text-headline-lg font-headline-lg text-on-surface">{pendingCount}</p>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant">Pending clinic confirmation</p>
                </div>
              </section>

              {/* Appointments List */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Your Visit History</h2>
                  <Link
                    to="/booking"
                    className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Book New
                  </Link>
                </div>

                {myAppointments.length === 0 ? (
                  <div className="bg-surface-container-low rounded-2xl p-16 text-center border border-dashed border-outline-variant/30">
                    <span className="material-symbols-outlined text-on-surface-variant/40 text-5xl block mb-4">calendar_month</span>
                    <h3 className="font-headline-md text-on-surface mb-2">No appointments yet</h3>
                    <p className="text-sm text-on-surface-variant mb-6">Start your dental journey by booking your first appointment.</p>
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md hover:opacity-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">add_circle</span>
                      Book Your First Appointment
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myAppointments.slice().reverse().map((apt) => (
                      <div
                        key={apt.id}
                        className="bg-surface rounded-2xl border border-outline-variant/20 p-6 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base border-2 border-primary/20 shrink-0">
                          {getInitials(apt.name)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h3 className="font-semibold text-base text-on-surface">{getServiceLabel(apt.service)}</h3>
                            <span className={`flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold ${getStatusStyle(apt.status)}`}>
                              <span className="material-symbols-outlined text-[12px]">{getStatusIcon(apt.status)}</span>
                              {apt.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-on-surface-variant">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                              {apt.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">schedule</span>
                              {apt.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">person</span>
                              {apt.name}
                            </span>
                          </div>
                          {apt.notes && (
                            <p className="text-xs text-on-surface-variant mt-2 bg-surface-container-low px-3 py-1.5 rounded-lg inline-block">
                              📋 {apt.notes}
                            </p>
                          )}
                        </div>
                        {(apt.status === 'Pending' || apt.status === 'Confirmed') && (
                          <Link
                            to="/booking"
                            className="shrink-0 px-4 py-2 border border-primary/30 text-primary text-sm font-semibold rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2 whitespace-nowrap"
                          >
                            <span className="material-symbols-outlined text-sm">edit_calendar</span>
                            Reschedule
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          {/* SCREEN: SERVICES */}
          {activeTab === 'Services' && (
            <div className="space-y-6 animate-fade-in">
              <div className="max-w-2xl">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Our Dental Services</h2>
                <p className="text-body-md text-on-surface-variant">
                  Explore the range of professional dental treatments we offer. Click "Book Now" on any service to schedule your visit.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(services).map((srv) => (
                  <div key={srv.id} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 hover:shadow-md transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined">medical_services</span>
                      </div>
                      <h4 className="font-headline-md text-[18px] mb-2">{srv.title}</h4>
                      <div className="flex gap-4 mb-4 text-xs font-semibold text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-lg">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">payments</span>
                          {srv.cost}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">timer</span>
                          {srv.duration}
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/booking"
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-primary text-on-primary py-2.5 rounded-xl font-label-md text-sm hover:opacity-90 transition-all text-center"
                    >
                      <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                      Book Now
                    </Link>
                  </div>
                ))}
                {Object.values(services).length === 0 && (
                  <div className="col-span-3 text-center py-16 text-on-surface-variant text-sm">
                    No services available at the moment.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCREEN: MY PROFILE */}
          {activeTab === 'My Profile' && (
            <div className="space-y-8 animate-fade-in max-w-2xl">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">My Profile</h2>
                <p className="text-body-md text-on-surface-variant">Your personal and contact information on file with SmileCare.</p>
              </div>

              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl border-4 border-primary/30">
                    {userProfile.avatar}
                  </div>
                  <div>
                    <h3 className="font-headline-md text-xl text-on-surface">{userProfile.name}</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[14px]">verified_user</span>
                      Registered Patient
                    </p>
                    <span className="inline-block mt-2 px-3 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase">Full Name</label>
                    <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-lg px-4 py-2.5">
                      <span className="material-symbols-outlined text-on-surface-variant text-[16px]">person</span>
                      <span className="text-sm">{userProfile.name}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase">Email Address</label>
                    <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-lg px-4 py-2.5">
                      <span className="material-symbols-outlined text-on-surface-variant text-[16px]">mail</span>
                      <span className="text-sm">{userProfile.email}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase">Phone Number</label>
                    <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-lg px-4 py-2.5">
                      <span className="material-symbols-outlined text-on-surface-variant text-[16px]">phone</span>
                      <span className="text-sm">{userProfile.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase">Clinic</label>
                    <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-lg px-4 py-2.5">
                      <span className="material-symbols-outlined text-on-surface-variant text-[16px]">local_hospital</span>
                      <span className="text-sm">{settings.clinicName || 'SmileCare Dental Clinic'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
                <h3 className="font-headline-md text-[16px] mb-4 border-b border-outline-variant/20 pb-2">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link
                    to="/booking"
                    className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant/30 hover:bg-primary/5 hover:border-primary/30 transition-all group"
                  >
                    <span className="material-symbols-outlined text-primary">calendar_add_on</span>
                    <div>
                      <p className="text-sm font-semibold group-hover:text-primary transition-colors">Book Appointment</p>
                      <p className="text-xs text-on-surface-variant">Schedule your next visit</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => setActiveTab('My Appointments')}
                    className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant/30 hover:bg-primary/5 hover:border-primary/30 transition-all group text-left"
                  >
                    <span className="material-symbols-outlined text-primary">history</span>
                    <div>
                      <p className="text-sm font-semibold group-hover:text-primary transition-colors">View History</p>
                      <p className="text-xs text-on-surface-variant">See all your appointments</p>
                    </div>
                  </button>
                  <Link
                    to="/"
                    className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant/30 hover:bg-primary/5 hover:border-primary/30 transition-all group"
                  >
                    <span className="material-symbols-outlined text-primary">home</span>
                    <div>
                      <p className="text-sm font-semibold group-hover:text-primary transition-colors">Go to Home</p>
                      <p className="text-xs text-on-surface-variant">Back to main website</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => setActiveTab('Services')}
                    className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant/30 hover:bg-primary/5 hover:border-primary/30 transition-all group text-left"
                  >
                    <span className="material-symbols-outlined text-primary">medical_services</span>
                    <div>
                      <p className="text-sm font-semibold group-hover:text-primary transition-colors">Our Services</p>
                      <p className="text-xs text-on-surface-variant">Explore treatments offered</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
