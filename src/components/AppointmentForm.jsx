import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import Container from './ui/Container';
import { Eyebrow } from './ui';
import { cn } from '../lib/cn';
import { EASE } from '../lib/motion';
import { submitAppointmentRequest } from '../lib/api';
import { isValid, validateField, validateForm } from '../lib/validation';
import { treatments } from '../data/treatments';
import { contact, openingHours } from '../data/site';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
];

const initialValues = {
  fullName: '',
  phone: '',
  email: '',
  treatment: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
  consent: false,
};

const details = [
  { icon: Phone, label: 'Phone', value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: 'Email', value: contact.email, href: contact.emailHref },
  {
    icon: MapPin,
    label: 'Clinic address',
    value: `${contact.address.line1}, ${contact.address.line2} ${contact.address.postcode}`,
    href: contact.mapsUrl,
    external: true,
  },
];

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {hint && !error ? <p className="mt-2 text-[0.72rem] text-ink-400">{hint}</p> : null}
      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex items-center gap-1.5 overflow-hidden pt-2 text-[0.75rem] text-clay"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function AppointmentForm({ id = 'appointment' }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [reference, setReference] = useState('');
  const reduce = useReducedMotion();

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const setValue = (field) => (event) => {
    const raw = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const next = { ...values, [field]: raw };
    setValues(next);
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, raw) }));
  };

  const onBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!isValid(nextErrors)) {
      const firstField = document.getElementById(`${id}-${Object.keys(nextErrors).find((k) => nextErrors[k])}`);
      firstField?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const result = await submitAppointmentRequest({ ...values, submittedAt: new Date().toISOString() });
      setReference(result?.reference ?? '');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setReference('');
  };

  return (
    <section id={id} className="relative scroll-mt-24 overflow-hidden bg-paper py-16 sm:py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-mint/35 blur-3xl"
      />

      <Container className="relative">
        <div className="overflow-hidden rounded-4xl border border-ink/8 bg-white shadow-lift">
          <div className="grid lg:grid-cols-12">
            <div className="relative overflow-hidden bg-ink p-7 text-white sm:p-10 lg:col-span-5 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal/25 blur-3xl"
              />

              <div className="relative">
                <Eyebrow light>Appointments</Eyebrow>
                <h2 className="mt-6 text-display-sm text-white">
                  Let&rsquo;s Talk About Your Recovery
                </h2>
                <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/65">
                  Send a short note and we will come back to you within one working day. If your
                  problem is urgent, call the clinic directly and we will find you a slot.
                </p>

                <ul className="mt-10 space-y-6">
                  {details.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label} className="flex gap-4">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-mint">
                          <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[0.63rem] font-medium uppercase tracking-[0.18em] text-white/40">
                            {item.label}
                          </p>
                          <a
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noreferrer noopener' : undefined}
                            className="mt-1 block text-[0.92rem] leading-relaxed text-white/85 link-underline hover:text-mint"
                          >
                            {item.value}
                          </a>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-10 border-t border-white/12 pt-7">
                  <p className="flex items-center gap-2 text-[0.63rem] font-medium uppercase tracking-[0.18em] text-white/40">
                    <Clock className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden="true" />
                    Opening hours
                  </p>
                  <dl className="mt-4 space-y-2 text-[0.85rem]">
                    {openingHours.map((row) => (
                      <div key={row.day} className="flex justify-between gap-4">
                        <dt className="text-white/50">{row.day}</dt>
                        <dd className={row.open ? 'text-white/80' : 'text-white/35'}>{row.label}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:col-span-7 lg:p-12">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex min-h-[26rem] flex-col items-start justify-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint text-teal">
                      <CheckCircle2 className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h3 className="mt-7 text-display-sm text-ink">Request received</h3>
                    <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-ink-600">
                      Thank you, {values.fullName.split(' ')[0]}. We have your request for{' '}
                      <span className="font-medium text-ink">{values.treatment}</span> on{' '}
                      <span className="font-medium text-ink">{values.preferredDate}</span> at{' '}
                      <span className="font-medium text-ink">{values.preferredTime}</span>. Someone
                      from the clinic will confirm by phone or email within one working day.
                    </p>
                    {reference ? (
                      <p className="mt-5 text-[0.8rem] text-ink-400">
                        Reference <span className="font-medium text-ink-600">{reference}</span>
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 inline-flex h-11 items-center rounded-full border border-ink/15 px-5 text-[0.85rem] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field id={`${id}-fullName`} label="Full name" error={errors.fullName}>
                        <input
                          id={`${id}-fullName`}
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          value={values.fullName}
                          onChange={setValue('fullName')}
                          onBlur={onBlur('fullName')}
                          aria-invalid={Boolean(errors.fullName)}
                          aria-describedby={errors.fullName ? `${id}-fullName-error` : undefined}
                          className={cn('field', errors.fullName && 'border-clay')}
                        />
                      </Field>

                      <Field id={`${id}-phone`} label="Phone number" error={errors.phone}>
                        <input
                          id={`${id}-phone`}
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={values.phone}
                          onChange={setValue('phone')}
                          onBlur={onBlur('phone')}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
                          className={cn('field', errors.phone && 'border-clay')}
                        />
                      </Field>

                      <Field id={`${id}-email`} label="Email" error={errors.email}>
                        <input
                          id={`${id}-email`}
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={setValue('email')}
                          onBlur={onBlur('email')}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? `${id}-email-error` : undefined}
                          className={cn('field', errors.email && 'border-clay')}
                        />
                      </Field>

                      <Field id={`${id}-treatment`} label="Treatment / service" error={errors.treatment}>
                        <div className="relative">
                          <select
                            id={`${id}-treatment`}
                            name="treatment"
                            value={values.treatment}
                            onChange={setValue('treatment')}
                            onBlur={onBlur('treatment')}
                            aria-invalid={Boolean(errors.treatment)}
                            aria-describedby={errors.treatment ? `${id}-treatment-error` : undefined}
                            className={cn('field cursor-pointer pr-8', errors.treatment && 'border-clay')}
                          >
                            <option value="">Select a treatment</option>
                            {treatments.map((treatment) => (
                              <option key={treatment.slug} value={treatment.title}>
                                {treatment.title}
                              </option>
                            ))}
                            <option value="Not sure yet">Not sure yet</option>
                          </select>
                          <svg
                            viewBox="0 0 12 8"
                            aria-hidden="true"
                            className="pointer-events-none absolute right-1 top-1/2 h-2 w-3 -translate-y-1/2 fill-none stroke-ink-400 stroke-[1.5]"
                          >
                            <path d="M1 1.5 6 6.5 11 1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </Field>

                      <Field id={`${id}-preferredDate`} label="Preferred date" error={errors.preferredDate}>
                        <input
                          id={`${id}-preferredDate`}
                          name="preferredDate"
                          type="date"
                          min={minDate}
                          value={values.preferredDate}
                          onChange={setValue('preferredDate')}
                          onBlur={onBlur('preferredDate')}
                          aria-invalid={Boolean(errors.preferredDate)}
                          aria-describedby={errors.preferredDate ? `${id}-preferredDate-error` : undefined}
                          className={cn('field', errors.preferredDate && 'border-clay')}
                        />
                      </Field>

                      <Field id={`${id}-preferredTime`} label="Preferred time" error={errors.preferredTime}>
                        <div className="relative">
                          <select
                            id={`${id}-preferredTime`}
                            name="preferredTime"
                            value={values.preferredTime}
                            onChange={setValue('preferredTime')}
                            onBlur={onBlur('preferredTime')}
                            aria-invalid={Boolean(errors.preferredTime)}
                            aria-describedby={errors.preferredTime ? `${id}-preferredTime-error` : undefined}
                            className={cn('field cursor-pointer pr-8', errors.preferredTime && 'border-clay')}
                          >
                            <option value="">Select a time</option>
                            {timeSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                          <svg
                            viewBox="0 0 12 8"
                            aria-hidden="true"
                            className="pointer-events-none absolute right-1 top-1/2 h-2 w-3 -translate-y-1/2 fill-none stroke-ink-400 stroke-[1.5]"
                          >
                            <path d="M1 1.5 6 6.5 11 1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </Field>
                    </div>

                    <Field
                      id={`${id}-message`}
                      label="Message"
                      error={errors.message}
                      hint="Optional — tell us what has been going on and what you would like to achieve."
                    >
                      <textarea
                        id={`${id}-message`}
                        name="message"
                        rows={4}
                        value={values.message}
                        onChange={setValue('message')}
                        onBlur={onBlur('message')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? `${id}-message-error` : undefined}
                        className={cn('field resize-none', errors.message && 'border-clay')}
                      />
                    </Field>

                    <div>
                      <label htmlFor={`${id}-consent`} className="flex cursor-pointer items-start gap-3">
                        <input
                          id={`${id}-consent`}
                          name="consent"
                          type="checkbox"
                          checked={values.consent}
                          onChange={setValue('consent')}
                          onBlur={onBlur('consent')}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
                          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-ink/25 text-teal accent-[#0E7C74]"
                        />
                        <span className="text-[0.82rem] leading-relaxed text-ink-600">
                          I agree that Alto Physiotherapy may contact me about this appointment
                          request.
                        </span>
                      </label>
                      <AnimatePresence>
                        {errors.consent ? (
                          <motion.p
                            id={`${id}-consent-error`}
                            role="alert"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-1.5 overflow-hidden pt-2 text-[0.75rem] text-clay"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                            {errors.consent}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {status === 'error' ? (
                      <p role="alert" className="rounded-xl bg-clay/10 px-4 py-3 text-[0.85rem] text-clay">
                        Something went wrong sending your request. Please call us on{' '}
                        {contact.phone} and we will book you in directly.
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group relative inline-flex h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-ink text-[0.95rem] font-medium text-white transition-colors duration-400 ease-premium hover:bg-teal disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-8"
                    >
                      {status === 'submitting' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />
                          Sending request…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                          Request Appointment
                        </>
                      )}
                    </button>

                    <p className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-ink-400">
                      <CalendarCheck className="mt-px h-3.5 w-3.5 shrink-0 text-teal" strokeWidth={1.7} aria-hidden="true" />
                      This form is a request, not a confirmed booking. We will confirm your slot by
                      phone or email. For anything urgent, please call {contact.phone}.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
