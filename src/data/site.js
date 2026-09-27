export const clinic = {
  name: 'Alto Physiotherapy',
  legalName: 'Alto Physiotherapy & Rehabilitation',
  shortName: 'Alto',
  tagline: 'Move Better. Live Stronger.',
  description:
    'A calm, evidence-led physiotherapy practice in Lakeside, dedicated to personalised rehabilitation, pain management and long-term movement health.',
  url: 'https://altophysio.com',
  founded: 2015,
};

export const practitioner = {
  name: 'Dr. Elena Marsh',
  credentials: 'DPT, OCS',
  role: 'Lead Physiotherapist & Founder',
  qualifications: 'Doctor of Physical Therapy (DPT), Orthopaedic Certified Specialist (OCS)',
  yearsExperience: 12,
  registrations: ['Board Certified in Orthopaedic Physical Therapy', 'Member, National Association of Orthopaedic Physiotherapists'],
};

export const contact = {
  phone: '+1 (555) 018-4420',
  phoneHref: 'tel:+15550184420',
  email: 'care@altophysio.com',
  emailHref: 'mailto:care@altophysio.com',
  bookingEmail: 'appointments@altophysio.com',
  address: {
    line1: '214 Willow Creek Drive, Suite 3',
    line2: 'Lakeside, Riverside County',
    postcode: 'LS4 9PD',
    full: '214 Willow Creek Drive, Suite 3, Lakeside, LS4 9PD',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=214+Willow+Creek+Drive+Lakeside',
  mapsEmbedUrl: null,
  emergencyNote: 'For medical emergencies, always call your local emergency number first.',
};

export const openingHours = [
  { day: 'Monday — Thursday', open: '08:00', close: '19:00', label: '8:00am — 7:00pm' },
  { day: 'Friday', open: '08:00', close: '16:00', label: '8:00am — 4:00pm' },
  { day: 'Saturday', open: '09:00', close: '13:00', label: '9:00am — 1:00pm' },
  { day: 'Sunday', open: null, close: null, label: 'Closed' },
];

export const social = [
  { name: 'Instagram', href: 'https://instagram.com', handle: '@altophysio' },
  { name: 'Facebook', href: 'https://facebook.com', handle: '/altophysio' },
  { name: 'LinkedIn', href: 'https://linkedin.com', handle: '/company/altophysio' },
  { name: 'YouTube', href: 'https://youtube.com', handle: '/@altophysio' },
];

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Conditions', to: '/conditions' },
  { label: 'Process', to: '/#process' },
  { label: 'Testimonials', to: '/#testimonials' },
  { label: 'Contact', to: '/contact' },
];

export const footerLinks = [
  { label: 'About the Practice', to: '/about' },
  { label: 'All Treatments', to: '/treatments' },
  { label: 'Conditions We Treat', to: '/conditions' },
  { label: 'Your Treatment Journey', to: '/#process' },
  { label: 'Patient Stories', to: '/#testimonials' },
  { label: 'Book an Appointment', to: '/contact#appointment' },
];

export const trustStats = [
  { value: 12, suffix: '+', label: 'Years of practice', note: 'Serving Lakeside since 2015' },
  { value: 500, suffix: '+', label: 'Patients supported', note: 'Across 4,000+ treatment sessions' },
  { value: 100, suffix: '%', label: 'One-on-one sessions', note: 'No conveyor-belt appointments' },
  { value: 45, suffix: ' min', label: 'First consultation', note: 'Unhurried, thorough assessment' },
];

export const trustStrip = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Patients' },
  { value: 'Personalized', label: 'Treatment' },
  { value: 'Modern', label: 'Rehabilitation' },
];
