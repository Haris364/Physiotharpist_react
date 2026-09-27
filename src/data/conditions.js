import image from './images';

export const conditions = [
  {
    slug: 'back-pain',
    name: 'Back Pain',
    line: 'Low back',
    image: image.backPain,
    summary: 'Mechanical lower-back pain, disc irritation and muscular strain.',
    note: 'Most episodes settle with the right loading, not more rest.',
  },
  {
    slug: 'neck-pain',
    name: 'Neck Pain',
    line: 'Cervical',
    image: image.neckTherapy,
    summary: 'Neck stiffness, postural load and whiplash-related discomfort.',
    note: 'We treat the drivers — workstation, stress, strength and range.',
  },
  {
    slug: 'sciatica',
    name: 'Sciatica',
    line: 'Nerve',
    image: image.legStretch,
    summary: 'Nerve-related leg pain, tingling and sensitivity along the leg.',
    note: 'Most cases do not need surgery. We keep you moving confidently.',
  },
  {
    slug: 'knee-pain',
    name: 'Knee Pain',
    line: 'Joint',
    image: image.kneePain,
    summary: 'Patellofemoral pain, meniscal irritation, tendon and ligament sprains.',
    note: 'Early loading beats early rest for almost every knee complaint.',
  },
  {
    slug: 'shoulder-pain',
    name: 'Shoulder Pain',
    line: 'Upper limb',
    image: image.guidedExercise,
    summary: 'Rotator cuff irritation, frozen shoulder, instability and post-op stiffness.',
    note: 'Shoulder rehab is graded — we earn range before we load it.',
  },
  {
    slug: 'arthritis',
    name: 'Arthritis',
    line: 'Joint health',
    image: image.clinicSession,
    summary: 'Osteoarthritis of the knee, hip, shoulder and hand.',
    note: 'Strength training is the most supported intervention we offer.',
  },
  {
    slug: 'sports-injuries',
    name: 'Sports Injuries',
    line: 'Athletic',
    image: image.gymSession,
    summary: 'Ligament, tendon and muscle injuries across every level of sport.',
    note: 'Return to sport is criteria-based, never date-based.',
  },
  {
    slug: 'post-surgery-recovery',
    name: 'Post-Surgery Recovery',
    line: 'Surgical',
    image: image.clinicRoom,
    summary: 'ACL, rotator cuff, hip and knee replacement, spinal and tendon repair.',
    note: 'We coordinate directly with your surgeon to stay inside protocol.',
  },
];

export const redFlags = [
  'New numbness, tingling or weakness in an arm or leg',
  'Loss of bladder or bowel control',
  'A hot, swollen joint with fever',
  'Inability to bear weight after an acute injury',
  'Severe pain following a significant fall or impact',
  'Chest pain, breathlessness or swelling in one calf',
];

export const selfCare = [
  {
    title: 'Keep moving, gently',
    body: 'Complete rest rarely settles spinal or joint pain. Short, frequent walks and pain-free range are more useful than stillness.',
  },
  {
    title: 'Build capacity before intensity',
    body: 'Most recurring pain comes from tissues asked to do more than they currently can. Start where you are, not where you want to be.',
  },
  {
    title: 'Sleep is treatment',
    body: 'Poor sleep raises pain sensitivity. Consistent sleep and a supported sleeping position are part of the plan, not an afterthought.',
  },
  {
    title: 'Expect progress, not absence',
    body: 'A realistic goal is a better range, stronger control and less flare-ups. That is what we work towards, and we measure it.',
  },
];

export default conditions;
