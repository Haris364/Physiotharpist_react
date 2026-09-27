import {
  Activity,
  Bone,
  Dumbbell,
  Footprints,
  HeartPulse,
  PersonStanding,
  Scan,
  Stethoscope,
} from 'lucide-react';
import image from './images';

export const treatments = [
  {
    slug: 'sports-injury-rehabilitation',
    number: '01',
    title: 'Sports Injury Rehabilitation',
    short: 'Return stronger, faster.',
    icon: Activity,
    image: image.guidedExercise,
    summary:
      'Structured return-to-sport programming for sprains, strains, ligament tears and overuse injuries — with objective strength and movement testing before you return.',
    detail: [
      'Objective baseline strength and range-of-motion testing',
      'Progressive loading matched to your sport and position',
      'Return-to-play criteria you can actually measure',
    ],
    duration: '6–16 weeks typical',
    session: '50 minutes',
    audience: 'Athletes, weekend players, return-to-sport',
  },
  {
    slug: 'back-and-neck-pain',
    number: '02',
    title: 'Back & Neck Pain',
    short: 'Move without fear again.',
    icon: Bone,
    image: image.backPain,
    summary:
      'A modern, active approach to spinal pain. No long bed rest, no vague stretching handouts — just diagnosis, graded loading and confidence in your own body.',
    detail: [
      'Movement-based spinal screening and differential diagnosis',
      'Graded exposure and reassurance built into every session',
      'Desk, sleep and lifting strategies that fit your actual life',
    ],
    duration: '4–10 weeks typical',
    session: '45 minutes',
    audience: 'Desk workers, tradespeople, drivers',
  },
  {
    slug: 'knee-and-joint-rehabilitation',
    number: '03',
    title: 'Knee & Joint Rehabilitation',
    short: 'Stability, strength, range.',
    icon: Footprints,
    image: image.legTherapy,
    summary:
      'Conservative and post-operative knee care covering meniscal, ligament, patellofemoral and arthritic presentations, from early protection to sport.',
    detail: [
      'Swelling and range-of-motion management',
      'Progressive strength and gait retraining',
      'Return-to-running and return-to-sport testing',
    ],
    duration: '8–20 weeks typical',
    session: '50 minutes',
    audience: 'Runners, skiers, knee replacements',
  },
  {
    slug: 'post-surgery-recovery',
    number: '04',
    title: 'Post-Surgery Recovery',
    short: 'Protocol, minus the guesswork.',
    icon: Scan,
    image: image.clinicSession,
    summary:
      'Physiotherapy that works alongside your surgeon from day one to discharge — protecting the repair while restoring range, control and confidence.',
    detail: [
      'Protocol-specific phase tracking with your surgical plan',
      'Wound, swelling and mobility monitoring',
      'Strength and function testing before surgeon sign-off',
    ],
    duration: '6–24 weeks typical',
    session: '45–60 minutes',
    audience: 'ACL, rotator cuff, hip & knee replacement',
  },
  {
    slug: 'stroke-rehabilitation',
    number: '05',
    title: 'Stroke Rehabilitation',
    short: 'Everyday independence, rebuilt.',
    icon: HeartPulse,
    image: image.mobility,
    summary:
      'Task-specific, goal-led therapy for stroke survivors and their families, combining gait retraining, upper-limb work and carer training.',
    detail: [
      'Task-specific practice: dressing, transfers, walking, stairs',
      'Balance and confidence retraining with safety planning',
      'Carer and family training so progress continues at home',
    ],
    duration: 'Ongoing, reviewed every 6 weeks',
    session: '60 minutes',
    audience: 'Stroke survivors, families, carers',
  },
  {
    slug: 'posture-and-movement-correction',
    number: '06',
    title: 'Posture & Movement Correction',
    short: 'Fix the source, not the symptom.',
    icon: PersonStanding,
    image: image.mobility,
    summary:
      'Movement analysis for people who sit, stand or train all day. We find the pattern keeping the pain alive and rebuild the way you move.',
    detail: [
      'Video-based movement and gait analysis',
      'Endurance and capacity training, not just “good form”',
      'Workstation, driving and training-load modifications',
    ],
    duration: '5–12 weeks typical',
    session: '45 minutes',
    audience: 'Desk workers, riders, long-haul drivers',
  },
  {
    slug: 'muscle-rehabilitation',
    number: '07',
    title: 'Muscle Rehabilitation',
    short: 'Strength you can measure.',
    icon: Dumbbell,
    image: image.ultrasound,
    summary:
      'Objective strength testing and progressive loading for muscle strain, deconditioning and strength loss following illness or surgery.',
    detail: [
      'Baseline dynamometry and symmetry testing',
      'Progressive isometric to heavy slow resistance loading',
      'Sport-specific and occupational re-entry testing',
    ],
    duration: '6–14 weeks typical',
    session: '50 minutes',
    audience: 'Post-illness, muscle strain, strength loss',
  },
  {
    slug: 'elderly-rehabilitation',
    number: '08',
    title: 'Elderly Rehabilitation',
    short: 'Balance, strength, confidence.',
    icon: Stethoscope,
    image: image.seniorMobility,
    summary:
      'Falls prevention and independence-focused therapy with an unhurried pace. We work with you and your family on strength, balance and home safety.',
    detail: [
      'Balance, gait and dual-task testing',
      'Hip and lower-limb strength for stairs and kerbs',
      'Home safety review and practical equipment advice',
    ],
    duration: '8–16 weeks typical',
    session: '45–60 minutes',
    audience: 'Adults 65+, falls risk, post-hospital',
  },
];

export const treatmentBySlug = Object.fromEntries(treatments.map((t) => [t.slug, t]));

export default treatments;
