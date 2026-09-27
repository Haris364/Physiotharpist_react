import { motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Phone } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import SmartImage from './ui/SmartImage';
import { StaggerText } from './ui/Reveal';
import { EASE } from '../lib/motion';
import { contact } from '../data/site';
import { image } from '../data/images';

export default function AppointmentCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={reduce ? {} : { scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2.2, ease: EASE }}
        className="absolute inset-0 -z-10"
      >
        <SmartImage
          photo={image.clinicWide}
          aspect={16 / 9}
          sizes="100vw"
          className="h-full w-full"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink/82"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/90"
      />

      <Container size="wide" className="relative py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-mint"
          >
            Ready when you are
          </motion.p>

          <h2 className="mt-7 text-display-lg text-white">
            <StaggerText
              text="Take the First Step Toward Better Movement."
              className="block"
            />
          </h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mx-auto mt-7 max-w-xl text-[1.05rem] leading-[1.75] text-white/70"
          >
            Whether you&rsquo;re recovering from an injury, managing pain, or working toward better
            mobility, personalized physiotherapy can help you move forward.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button to="/contact#appointment" variant="mint" size="lg" icon={CalendarCheck}>
              Book an Appointment
            </Button>
            <Button href={contact.phoneHref} variant="outlineLight" size="lg" icon={Phone}>
              Call the Clinic
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
