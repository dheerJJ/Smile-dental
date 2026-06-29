import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAppointments, saveAppointments, getSettings, getServices } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [settings, setSettings] = useState({});
  const [services, setServices] = useState({});
  // Reschedule inline state
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' });
  const [rescheduleSuccess, setRescheduleSuccess] = useState(null);

  useEffect(() => {
    // Only show appointments that belong to the logged-in user
    const all = getAppointments();
    const mine = user ? all.filter(
      (a) => a.email && a.email.toLowerCase() === user.email.toLowerCase()
    ) : [];
    setAppointments(mine);
    setSettings(getSettings());
    setServices(getServices());
  }, [user]);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getServiceLabel = (serviceId) => {
    const srv = services[serviceId];
    return srv ? srv.title : 'General Consultation';
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-primary-fixed/20 text-primary';
      case 'Pending': return 'bg-secondary-container/20 text-on-secondary-container';
      case 'Completed': return 'bg-surface-container-highest text-on-surface-variant';
      case 'Cancelled': return 'bg-error-container/20 text-error';
      default: return 'bg-surface-container-low text-on-surface';
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

  const upcomingCount = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;
  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;

  const userName = user?.name || 'Patient';
  const userEmail = user?.email || '—';
  const userPhone = user?.phone || '—';

  return (
    <div className="min-h-screen bg-surface animate-fade-in">
      <div className="max-w-container-max mx-auto px-5 md:px-margin-desktop py-8 md:py-12">

        {/* ── Page Heading ─────────────────────────────────────── */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-headline-lg font-headline-lg text-on-surface">My Profile</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Your personal account information and visit history at SmileCare.
          </p>
        </div>

        {/* ── Profile Card ─────────────────────────────────────── */}
        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl border border-outline-variant/20 shadow-sm mb-10">
          <div className="flex items-center text-left gap-4 md:gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl border-4 border-primary/30 shrink-0">
              {getInitials(userName)}
            </div>
            <div>
              <h2 className="font-headline-md text-xl text-on-surface">{userName}</h2>
              <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                Registered Patient
              </p>
              <span className="inline-block mt-2 px-3 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 min-w-0">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">Full Name</label>
              <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-xl px-4 py-3 min-w-0">
                <span className="material-symbols-outlined text-on-surface-variant text-[16px] shrink-0">person</span>
                <span className="text-sm truncate flex-1 min-w-0">{userName}</span>
              </div>
            </div>
            <div className="space-y-1.5 min-w-0">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email Address</label>
              <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-xl px-4 py-3 min-w-0">
                <span className="material-symbols-outlined text-on-surface-variant text-[16px] shrink-0">mail</span>
                <span className="text-sm truncate flex-1 min-w-0" title={userEmail}>{userEmail}</span>
              </div>
            </div>
            <div className="space-y-1.5 min-w-0">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">Phone Number</label>
              <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-xl px-4 py-3 min-w-0">
                <span className="material-symbols-outlined text-on-surface-variant text-[16px] shrink-0">phone</span>
                <span className="text-sm truncate flex-1 min-w-0">{userPhone}</span>
              </div>
            </div>
            <div className="space-y-1.5 min-w-0">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">Clinic</label>
              <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-xl px-4 py-3 min-w-0">
                <span className="material-symbols-outlined text-on-surface-variant text-[16px] shrink-0">local_hospital</span>
                <span className="text-sm truncate flex-1 min-w-0">{settings.clinicName || 'SmileCare Dental Clinic'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Appointment Stats ─────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-5">Appointment Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <span className="material-symbols-outlined">upcoming</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase font-semibold tracking-wide">Upcoming</p>
                  <p className="text-3xl font-bold text-on-surface">{upcomingCount}</p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant">Confirmed &amp; pending visits</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-surface-container-highest text-on-surface rounded-xl">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase font-semibold tracking-wide">Completed</p>
                  <p className="text-3xl font-bold text-on-surface">{completedCount}</p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant">Successfully treated visits</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-secondary-container/20 text-on-secondary-container rounded-xl">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase font-semibold tracking-wide">Awaiting</p>
                  <p className="text-3xl font-bold text-on-surface">{pendingCount}</p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant">Pending clinic confirmation</p>
            </div>
          </div>
        </div>

        {/* ── Visit History ─────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="font-headline-md text-xl md:text-headline-md text-on-surface">Your Visit History</h2>
            <Link
              to="/booking"
              className="w-full sm:w-auto justify-center px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm shrink-0">add</span>
              <span className="whitespace-nowrap">Book New</span>
            </Link>
          </div>

          {appointments.length === 0 ? (
            <div className="bg-surface-container-low rounded-2xl p-6 sm:p-16 text-center border border-dashed border-outline-variant/30">
              <span className="material-symbols-outlined text-on-surface-variant/40 text-5xl block mb-4">calendar_month</span>
              <h3 className="font-headline-md text-on-surface mb-2">No appointments yet</h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Start your dental journey by booking your first appointment.
              </p>
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
              {appointments.slice().reverse().map((apt) => {
                const isRescheduling = rescheduleId === apt.id;
                const calDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
                const timeSlots = ['09:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '04:45 PM'];

                return (
                  <div key={apt.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden transition-all">
                    {/* Appointment row */}
                    <div className="p-6 flex flex-col md:flex-row md:items-center gap-4">
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
                        <button
                          onClick={() => {
                            if (isRescheduling) {
                              setRescheduleId(null);
                            } else {
                              setRescheduleId(apt.id);
                              const dateNum = apt.date.replace('Oct ', '');
                              setRescheduleData({ date: dateNum, time: apt.time });
                              setRescheduleSuccess(null);
                            }
                          }}
                          className={`w-full md:w-auto justify-center shrink-0 px-4 py-2 border text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                            isRescheduling
                              ? 'border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                              : 'border-primary/30 text-primary hover:bg-primary/5'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">{isRescheduling ? 'close' : 'edit_calendar'}</span>
                          {isRescheduling ? 'Cancel' : 'Reschedule'}
                        </button>
                      )}
                    </div>

                    {/* ── Inline reschedule panel ── */}
                    {isRescheduling && (
                      <div className="border-t border-outline-variant/20 bg-surface-container-low/50 p-6 animate-fade-in">
                        <p className="text-sm font-semibold text-on-surface mb-4">Pick a new date &amp; time</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                          {/* Calendar */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">October 2024</span>
                            </div>
                            <div className="grid grid-cols-7 text-center text-[11px] font-bold text-on-surface-variant mb-1">
                              <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {/* Oct starts on Tuesday — 2 empty cells */}
                              <span /><span />
                              {calDays.map((d) => (
                                <button
                                  key={d}
                                  type="button"
                                  onClick={() => setRescheduleData(prev => ({ ...prev, date: String(d) }))}
                                  className={`h-9 w-full flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                                    rescheduleData.date === String(d)
                                      ? 'bg-primary text-on-primary shadow-sm'
                                      : 'hover:bg-primary/10 text-on-surface'
                                  }`}
                                >
                                  {d}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Time slots */}
                          <div className="space-y-3">
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Available Slots</span>
                            <div className="grid grid-cols-2 gap-2">
                              {timeSlots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setRescheduleData(prev => ({ ...prev, time: slot }))}
                                  className={`py-2.5 px-3 border rounded-xl text-sm font-semibold transition-all ${
                                    rescheduleData.time === slot
                                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                                      : 'border-outline-variant hover:border-primary hover:bg-primary/5'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Confirm row */}
                        <div className="mt-5 flex items-center gap-4">
                          <button
                            type="button"
                            disabled={!rescheduleData.date || !rescheduleData.time}
                            onClick={() => {
                              // Update the appointment in localStorage
                              const all = getAppointments();
                              const updated = all.map(a =>
                                a.id === apt.id
                                  ? { ...a, date: `Oct ${rescheduleData.date}`, time: rescheduleData.time }
                                  : a
                              );
                              saveAppointments(updated);
                              // Refresh local state
                              const mine = updated.filter(
                                (a) => a.email && a.email.toLowerCase() === user.email.toLowerCase()
                              );
                              setAppointments(mine);
                              setRescheduleSuccess(apt.id);
                              setRescheduleId(null);
                            }}
                            className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Confirm Reschedule
                          </button>
                          {rescheduleData.date && rescheduleData.time && (
                            <p className="text-xs text-on-surface-variant">
                              New slot: <strong>Oct {rescheduleData.date}</strong> at <strong>{rescheduleData.time}</strong>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Success toast */}
                    {rescheduleSuccess === apt.id && (
                      <div className="border-t border-primary/20 bg-primary/5 px-6 py-3 flex items-center gap-2 text-primary text-sm font-semibold animate-fade-in">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Appointment rescheduled successfully!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Quick Actions ─────────────────────────────────────── */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
          <h3 className="font-headline-md text-[16px] mb-5 pb-3 border-b border-outline-variant/15">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Link
              to="/services"
              className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant/30 hover:bg-primary/5 hover:border-primary/30 transition-all group"
            >
              <span className="material-symbols-outlined text-primary">medical_services</span>
              <div>
                <p className="text-sm font-semibold group-hover:text-primary transition-colors">Our Services</p>
                <p className="text-xs text-on-surface-variant">Explore treatments offered</p>
              </div>
            </Link>
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
            <Link
              to="/about"
              className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant/30 hover:bg-primary/5 hover:border-primary/30 transition-all group"
            >
              <span className="material-symbols-outlined text-primary">info</span>
              <div>
                <p className="text-sm font-semibold group-hover:text-primary transition-colors">About Us</p>
                <p className="text-xs text-on-surface-variant">Learn about SmileCare</p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
