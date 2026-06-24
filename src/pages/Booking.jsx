import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAppointment, getServices } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

export default function Booking() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [services, setServices] = useState({});
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    service: '',
    date: '9',
    time: '11:00 AM',
  });

  useEffect(() => {
    setServices(getServices());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectService = (e) => {
    setFormData((prev) => ({ ...prev, service: e.target.value }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.email) {
        alert('Please fill out all patient information fields.');
        return;
      }
    }
    if (step === 2) {
      if (!formData.service) {
        alert('Please select a dental service.');
        return;
      }
    }
    if (step === 3) {
      // Save appointment to storage helper
      addAppointment({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        date: `Oct ${formData.date}`,
        time: formData.time,
        notes: 'Booked online.'
      });
      setShowSuccess(true);
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getServiceInfo = () => {
    const srv = services[formData.service];
    if (srv) {
      return { cost: srv.cost, duration: srv.duration };
    }
    return { cost: 'Starts from $120.00', duration: 'Approx. 45-60 mins' };
  };

  const serviceInfo = getServiceInfo();

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased select-none">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Main Content Area: Booking Flow */}
          <div className="lg:col-span-8">
            <div className="bg-surface-container-lowest rounded-xl shadow-[0px_20px_24px_-4px_rgba(19,27,46,0.08)] border border-outline-variant/30 p-8 md:p-12 overflow-hidden relative">
              
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-label-md font-label-md text-primary uppercase tracking-widest" id="step-label">
                    {step === 1 && 'Step 1: Patient Details'}
                    {step === 2 && 'Step 2: Service Selection'}
                    {step === 3 && 'Step 3: Schedule Your Visit'}
                  </span>
                  <span className="text-body-md text-on-surface-variant" id="step-count">
                    {step} of 3
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                    id="progress-bar"
                  ></div>
                </div>
              </div>

              {/* Step 1: Patient Information */}
              {step === 1 && (
                <div className="step-transition">
                  <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">Welcome to SmileCare</h2>
                  <p className="text-body-md text-on-surface-variant mb-8">Please provide your contact information to begin the booking process.</p>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-on-surface">Full Name</label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder="e.g. Arjun Sharma"
                          type="text"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-on-surface">Phone Number</label>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder="+91 98765 43210"
                          type="tel"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-on-surface">Email Address</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="you@example.com"
                        type="email"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Service Selection */}
              {step === 2 && (
                <div className="step-transition">
                  <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">Select Your Treatment</h2>
                  <p className="text-body-md text-on-surface-variant mb-8">What brings you to see us today? Select a service from the options below.</p>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block font-label-md text-label-md text-on-surface">Service Type</label>
                      <select
                        value={formData.service}
                        onChange={handleSelectService}
                        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer"
                        required
                      >
                        <option value="" disabled>Choose a dental service</option>
                        {Object.values(services).map((srv) => (
                          <option key={srv.id} value={srv.id}>
                            {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-outline-variant/50 rounded-xl bg-surface/50 flex gap-4 items-start">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">payments</span>
                        <div>
                          <p className="font-label-md text-on-surface">Estimated Cost</p>
                          <p className="text-caption text-on-surface-variant">{serviceInfo.cost}</p>
                        </div>
                      </div>
                      <div className="p-4 border border-outline-variant/50 rounded-xl bg-surface/50 flex gap-4 items-start">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">timer</span>
                        <div>
                          <p className="font-label-md text-on-surface">Duration</p>
                          <p className="text-caption text-on-surface-variant">{serviceInfo.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Calendar & Time */}
              {step === 3 && (
                <div className="step-transition">
                  <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">Schedule Your Visit</h2>
                  <p className="text-body-md text-on-surface-variant mb-8">Select your preferred date and time from our available slots.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calendar visual */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-2">
                        <button type="button" className="material-symbols-outlined text-on-surface-variant">chevron_left</button>
                        <span className="font-label-md text-on-surface">October 2024</span>
                        <button type="button" className="material-symbols-outlined text-on-surface-variant">chevron_right</button>
                      </div>
                      <div className="grid grid-cols-7 text-center text-caption font-label-md text-on-surface-variant mb-2">
                        <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        <button type="button" className="h-10 w-full flex items-center justify-center rounded-lg text-on-surface-variant/40 cursor-not-allowed">29</button>
                        <button type="button" className="h-10 w-full flex items-center justify-center rounded-lg text-on-surface-variant/40 cursor-not-allowed">30</button>
                        <button type="button" className="h-10 w-full flex items-center justify-center rounded-lg hover:bg-primary/5">1</button>
                        <button type="button" className="h-10 w-full flex items-center justify-center rounded-lg hover:bg-primary/5">2</button>
                        <button type="button" className="h-10 w-full flex items-center justify-center rounded-lg hover:bg-primary/5">3</button>
                        <button type="button" className="h-10 w-full flex items-center justify-center rounded-lg hover:bg-primary/5">4</button>
                        <button type="button" className="h-10 w-full flex items-center justify-center rounded-lg hover:bg-primary/5">5</button>
                        <button type="button" className="h-10 w-full flex items-center justify-center rounded-lg hover:bg-primary/5">6</button>
                        <button type="button" className="h-10 w-full flex items-center justify-center rounded-lg hover:bg-primary/5">7</button>
                        <button type="button" className="h-10 w-full flex items-center justify-center rounded-lg hover:bg-primary/5">8</button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, date: '9' }))}
                          className={`h-10 w-full flex items-center justify-center rounded-lg shadow-sm font-bold transition-all ${
                            formData.date === '9'
                              ? 'bg-primary text-on-primary'
                              : 'hover:bg-primary/5'
                          }`}
                        >
                          9
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, date: '10' }))}
                          className={`h-10 w-full flex items-center justify-center rounded-lg shadow-sm font-bold transition-all ${
                            formData.date === '10'
                              ? 'bg-primary text-on-primary'
                              : 'hover:bg-primary/5'
                          }`}
                        >
                          10
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, date: '11' }))}
                          className={`h-10 w-full flex items-center justify-center rounded-lg shadow-sm font-bold transition-all ${
                            formData.date === '11'
                              ? 'bg-primary text-on-primary'
                              : 'hover:bg-primary/5'
                          }`}
                        >
                          11
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, date: '12' }))}
                          className={`h-10 w-full flex items-center justify-center rounded-lg shadow-sm font-bold transition-all ${
                            formData.date === '12'
                              ? 'bg-primary text-on-primary'
                              : 'hover:bg-primary/5'
                          }`}
                        >
                          12
                        </button>
                      </div>
                    </div>
                    {/* Time Slots */}
                    <div className="space-y-4">
                      <label className="block font-label-md text-label-md text-on-surface">Available Slots</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['09:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '04:45 PM'].map((slotTime) => (
                          <button
                            key={slotTime}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, time: slotTime }))}
                            className={`py-3 px-4 border rounded-lg text-body-md font-semibold transition-all ${
                              formData.time === slotTime
                                ? 'bg-primary text-on-primary border-primary'
                                : 'border-outline-variant hover:border-primary hover:bg-primary/5'
                            }`}
                          >
                            {slotTime}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-12 pt-8 border-t border-outline-variant/20 flex justify-between items-center">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-on-surface-variant font-label-md flex items-center gap-2 hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-md text-headline-md flex items-center gap-2 hover:shadow-lg hover:opacity-95 transition-all active:scale-95 group"
                >
                  <span>{step === 3 ? 'Confirm Appointment' : 'Continue'}</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-gutter">
            {/* Trust Badges */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 space-y-6">
              <h3 className="font-headline-md text-headline-md text-on-surface">Why SmileCare?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  </div>
                  <p className="text-body-md text-on-surface-variant">Board-certified specialists with 15+ years experience.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                  </div>
                  <p className="text-body-md text-on-surface-variant">Advanced laser dentistry &amp; pain-free procedures.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </div>
                  <p className="text-body-md text-on-surface-variant">Voted #1 Dental Clinic for patient care in 2023.</p>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Banner */}
            <div className="bg-inverse-surface text-white p-6 rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container/20 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10">
                <span className="bg-error text-on-error px-2 py-0.5 rounded text-caption font-bold inline-block mb-3">24/7 SUPPORT</span>
                <h3 className="text-headline-md font-headline-md mb-2 text-white">Emergency?</h3>
                <p className="text-body-md text-surface-dim/90 mb-6">Need immediate dental care? Call our emergency hotline for instant assistance.</p>
                <a className="inline-flex items-center gap-3 bg-primary-fixed text-on-primary-fixed px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors w-full justify-center" href="tel:+91800SMILE">
                  <span className="material-symbols-outlined">call</span>
                  +91-800-SMILE-CARE
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity duration-500">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-10 text-center shadow-2xl">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h2 className="text-headline-xl font-headline-xl text-on-surface mb-4">Confirmed!</h2>
            <p className="text-body-lg text-body-lg text-on-surface-variant mb-8">
              Your appointment is scheduled for Oct {formData.date}, 2024 at {formData.time}. A confirmation has been sent to {formData.email}.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-md hover:opacity-90 transition-all cursor-pointer"
            >
              View My Appointments
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
