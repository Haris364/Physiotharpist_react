const rules = {
  fullName: (v) => {
    const value = v.trim();
    if (!value) return 'Please tell us your name.';
    if (value.length < 2) return 'Please enter at least two characters.';
    return '';
  },
  phone: (v) => {
    const digits = v.replace(/\D/g, '');
    if (!digits) return 'Please add a phone number so we can confirm.';
    if (digits.length < 7) return 'That phone number looks too short.';
    if (digits.length > 15) return 'That phone number looks too long.';
    return '';
  },
  email: (v) => {
    const value = v.trim();
    if (!value) return 'Please add an email address.';
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) return 'Please check the email address format.';
    return '';
  },
  treatment: (v) => (v ? '' : 'Please choose the treatment you are interested in.'),
  preferredDate: (v) => {
    if (!v) return 'Please choose a preferred date.';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(v) < today ? 'Please choose today or a future date.' : '';
  },
  preferredTime: (v) => (v ? '' : 'Please choose a preferred time.'),
  message: (v) => (v.trim().length > 600 ? 'Please keep this under 600 characters.' : ''),
  consent: (v) => (v ? '' : 'Please confirm we can contact you about this request.'),
};

export const validateField = (name, value) => (rules[name] ? rules[name](value) : '');

export function validateForm(values) {
  return Object.keys(rules).reduce((acc, key) => {
    acc[key] = validateField(key, values[key]);
    return acc;
  }, {});
}

export const isValid = (errors) => Object.values(errors).every((v) => !v);
