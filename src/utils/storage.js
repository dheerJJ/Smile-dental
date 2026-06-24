// Local Storage Manager for SmileCare Clinic

const DEFAULT_SETTINGS = {
  clinicName: 'SmileCare Dental Clinic',
  contactEmail: 'appointments@smilecare.com',
  contactPhone: '+91-800-SMILE-CARE',
  hours: 'Mon - Sat: 9:00 AM - 8:00 PM',
  primaryColor: 'teal', // Options: 'teal', 'indigo', 'emerald', 'rose'
};

const DEFAULT_SERVICES = {
  checkup: { id: 'checkup', title: 'Routine Checkup & Cleaning', cost: '$120.00', duration: '45 mins', priceVal: 120 },
  whitening: { id: 'whitening', title: 'Teeth Whitening', cost: '$299.00', duration: '60 mins', priceVal: 299 },
  emergency: { id: 'emergency', title: 'Emergency Dental Care', cost: '$150.00', duration: 'Immediate', priceVal: 150 },
  orthodontics: { id: 'orthodontics', title: 'Orthodontic Consultation', cost: '$199.00', duration: '60 mins', priceVal: 199 },
  implants: { id: 'implants', title: 'Dental Implants', cost: '$1,500.00', duration: '90 mins', priceVal: 1500 },
};

const DEFAULT_APPOINTMENTS = [
  { id: 'apt-1', name: 'Robert Miller', phone: '+91 (555) 019-2834', email: 'robert.m@example.com', service: 'whitening', date: 'Oct 9', time: '10:30 AM', status: 'Confirmed', notes: 'Prefers warm water rinse.' },
  { id: 'apt-2', name: 'Alice Sterling', phone: '+91 (555) 014-9821', email: 'alice.s@example.com', service: 'checkup', date: 'Oct 9', time: '01:15 PM', status: 'Pending', notes: 'First appointment at clinic.' },
  { id: 'apt-3', name: 'John Doe', phone: '+91 (555) 012-3456', email: 'john@example.com', service: 'checkup', date: 'Oct 8', time: '09:00 AM', status: 'Completed', notes: 'Routine checkup completed successfully.' },
  { id: 'apt-4', name: 'Linda Wright', phone: '+91 (555) 015-7729', email: 'linda.w@example.com', service: 'implants', date: 'Oct 10', time: '04:45 PM', status: 'Confirmed', notes: 'Follow-up for implant integration check.' },
];

const DEFAULT_PATIENTS = [
  { id: 'pat-1', name: 'Robert Miller', phone: '+91 (555) 019-2834', email: 'robert.m@example.com', lastVisit: 'May 24, 2024', totalVisits: 3, notes: 'Prefers warm water rinse. History of slight tooth sensitivity.' },
  { id: 'pat-2', name: 'Alice Sterling', phone: '+91 (555) 014-9821', email: 'alice.s@example.com', lastVisit: 'May 24, 2024', totalVisits: 1, notes: 'First appointment at clinic. Interested in teeth whitening options later.' },
  { id: 'pat-3', name: 'John Doe', phone: '+91 (555) 012-3456', email: 'john@example.com', lastVisit: 'May 23, 2024', totalVisits: 5, notes: 'Routine hygiene checkup completed. Plaque index low.' },
  { id: 'pat-4', name: 'Linda Wright', phone: '+91 (555) 015-7729', email: 'linda.w@example.com', lastVisit: 'May 25, 2024', totalVisits: 2, notes: 'Implant surgery follow-up. Healing beautifully. No complications.' },
];

// Helper to safely access localStorage
const isStorageAvailable = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage;
  } catch (e) {
    return false;
  }
};

export const initializeStorage = () => {
  if (!isStorageAvailable()) return;

  if (!localStorage.getItem('smilecare_settings')) {
    localStorage.setItem('smilecare_settings', JSON.stringify(DEFAULT_SETTINGS));
  }
  if (!localStorage.getItem('smilecare_services')) {
    localStorage.setItem('smilecare_services', JSON.stringify(DEFAULT_SERVICES));
  }
  if (!localStorage.getItem('smilecare_appointments')) {
    localStorage.setItem('smilecare_appointments', JSON.stringify(DEFAULT_APPOINTMENTS));
  }
  if (!localStorage.getItem('smilecare_patients')) {
    localStorage.setItem('smilecare_patients', JSON.stringify(DEFAULT_PATIENTS));
  }
};

// Settings
export const getSettings = () => {
  initializeStorage();
  if (!isStorageAvailable()) return DEFAULT_SETTINGS;
  return JSON.parse(localStorage.getItem('smilecare_settings')) || DEFAULT_SETTINGS;
};

export const saveSettings = (settings) => {
  if (!isStorageAvailable()) return;
  localStorage.setItem('smilecare_settings', JSON.stringify(settings));
  // Apply theme color
  applyThemeColor(settings.primaryColor);
};

// Services
export const getServices = () => {
  initializeStorage();
  if (!isStorageAvailable()) return DEFAULT_SERVICES;
  return JSON.parse(localStorage.getItem('smilecare_services')) || DEFAULT_SERVICES;
};

export const saveServices = (services) => {
  if (!isStorageAvailable()) return;
  localStorage.setItem('smilecare_services', JSON.stringify(services));
};

// Appointments
export const getAppointments = () => {
  initializeStorage();
  if (!isStorageAvailable()) return DEFAULT_APPOINTMENTS;
  return JSON.parse(localStorage.getItem('smilecare_appointments')) || DEFAULT_APPOINTMENTS;
};

export const saveAppointments = (appointments) => {
  if (!isStorageAvailable()) return;
  localStorage.setItem('smilecare_appointments', JSON.stringify(appointments));
};

export const addAppointment = (appointment) => {
  const appointments = getAppointments();
  const id = 'apt-' + Date.now();
  const newApt = { ...appointment, id, status: appointment.status || 'Pending' };
  appointments.push(newApt);
  saveAppointments(appointments);

  // Auto-sync patient record as well
  syncPatientFromAppointment(newApt);

  return newApt;
};

// Patients
export const getPatients = () => {
  initializeStorage();
  if (!isStorageAvailable()) return DEFAULT_PATIENTS;
  return JSON.parse(localStorage.getItem('smilecare_patients')) || DEFAULT_PATIENTS;
};

export const savePatients = (patients) => {
  if (!isStorageAvailable()) return;
  localStorage.setItem('smilecare_patients', JSON.stringify(patients));
};

export const addPatient = (patient) => {
  const patients = getPatients();
  const id = 'pat-' + Date.now();
  const newPat = {
    ...patient,
    id,
    lastVisit: patient.lastVisit || 'N/A',
    totalVisits: patient.totalVisits || 1,
    notes: patient.notes || '',
  };
  patients.push(newPat);
  savePatients(patients);
  return newPat;
};

// Auto sync or helper to link appointments and patients
const syncPatientFromAppointment = (apt) => {
  const patients = getPatients();
  const existingPatient = patients.find(
    (p) => p.email.toLowerCase() === apt.email.toLowerCase() || p.phone === apt.phone
  );

  if (existingPatient) {
    existingPatient.totalVisits += 1;
    existingPatient.lastVisit = apt.date + ', 2024';
    if (apt.notes) {
      existingPatient.notes = `${existingPatient.notes}\n[Oct 2024]: ${apt.notes}`;
    }
  } else {
    patients.push({
      id: 'pat-' + Date.now(),
      name: apt.name,
      phone: apt.phone,
      email: apt.email,
      lastVisit: apt.date + ', 2024',
      totalVisits: 1,
      notes: apt.notes || 'Created via online booking.',
    });
  }
  savePatients(patients);
};

// Apply brand primary color to document root styling dynamically
export const applyThemeColor = (color) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  
  let primaryColorHex = '#0d9488'; // teal default
  let primaryContainerHex = '#008378';
  let primaryFixedHex = '#89f5e7';
  
  switch (color) {
    case 'indigo':
      primaryColorHex = '#4f46e5';
      primaryContainerHex = '#3730a3';
      primaryFixedHex = '#c7d2fe';
      break;
    case 'emerald':
      primaryColorHex = '#059669';
      primaryContainerHex = '#065f46';
      primaryFixedHex = '#a7f3d0';
      break;
    case 'rose':
      primaryColorHex = '#e11d48';
      primaryContainerHex = '#9f1239';
      primaryFixedHex = '#fecdd3';
      break;
    case 'teal':
    default:
      primaryColorHex = '#0d9488';
      primaryContainerHex = '#008378';
      primaryFixedHex = '#89f5e7';
      break;
  }
  
  root.style.setProperty('--color-primary', primaryColorHex);
  root.style.setProperty('--color-primary-container', primaryContainerHex);
  root.style.setProperty('--color-primary-fixed', primaryFixedHex);
};
