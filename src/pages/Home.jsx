import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import About from '../components/About';
import Treatments from '../components/Treatments';
import Conditions from '../components/Conditions';
import WhyChooseUs from '../components/WhyChooseUs';
import TreatmentProcess from '../components/TreatmentProcess';
import Testimonials from '../components/Testimonials';
import AppointmentCTA from '../components/AppointmentCTA';
import AppointmentForm from '../components/AppointmentForm';
import Contact from '../components/Contact';
import { useSeo } from '../lib/seo';

export default function Home() {
  useSeo({
    title: 'Alto Physiotherapy & Rehabilitation | Move Better. Live Stronger.',
    description:
      'Personalised physiotherapy, rehabilitation and movement care in Lakeside. One-on-one evidence-based treatment for sports injuries, back and neck pain, post-surgery recovery and long-term mobility.',
    path: '/',
  });

  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <Treatments />
      <Conditions />
      <WhyChooseUs />
      <TreatmentProcess />
      <Testimonials />
      <AppointmentCTA />
      <AppointmentForm />
      <Contact />
    </>
  );
}
