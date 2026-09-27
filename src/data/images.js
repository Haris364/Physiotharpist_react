const CDN = 'https://images.pexels.com/photos';

const photo = (id, alt) => ({ id, alt });

export const url = ({ id }, width, height) =>
  `${CDN}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${height}`;

export const srcSet = (item, aspect, widths = [420, 640, 900, 1200, 1600]) =>
  widths
    .map((width) => `${url(item, width, Math.round(width / aspect))} ${width}w`)
    .join(', ');

export const image = {
  hero: photo(
    20860617,
    'Physiotherapist guiding a patient through a rehabilitation exercise in a bright modern clinic',
  ),
  heroSecondary: photo(
    20860580,
    'Experienced physiotherapist helping a patient stretch their leg in a modern clinic room',
  ),
  practitioner: photo(
    5215024,
    'Portrait of Dr. Elena Marsh, physiotherapist, smiling in a white clinical coat with a clipboard',
  ),
  practitionerAlt: photo(
    3714743,
    'Dr. Elena Marsh standing in her physiotherapy practice, smiling at the camera',
  ),
  clinicRoom: photo(
    16571735,
    'Bright, contemporary private treatment room with a therapy table and rehabilitation equipment',
  ),
  clinicWide: photo(
    20860624,
    'Patient working through guided rehabilitation exercises under the care of a therapist',
  ),
  clinicSession: photo(
    20860625,
    'Physiotherapist assisting a patient with leg stretching exercises on a treatment table',
  ),
  contactCard: photo(
    20860590,
    'Physiotherapist examining a patient’s neck to relieve pain in a clinic setting',
  ),
  backPain: photo(
    20860615,
    'Physiotherapist assisting a patient with back pain exercises in an indoor clinic',
  ),
  legTherapy: photo(
    20860582,
    'Physiotherapist assisting a patient with leg stretching exercises on a treatment table',
  ),
  massage: photo(
    20860606,
    'Female physiotherapist providing hands-on massage therapy to a patient in a clinic',
  ),
  gymSession: photo(20860608, 'Men exercising under supervision during a physiotherapy session'),
  neckTherapy: photo(
    20860602,
    'Physiotherapist treating neck pain in a clinic setting with a focus on hands-on healthcare',
  ),
  guidedExercise: photo(
    20860622,
    'Physiotherapist guiding a patient through a supervised exercise in a clinic gym',
  ),
  legStretch: photo(
    20860579,
    'Physiotherapist helping a patient stretch their leg during a therapy session',
  ),
  ultrasound: photo(
    13185367,
    'Close-up of a physiotherapist using a handheld ultrasound device for leg treatment',
  ),
  mobility: photo(
    20860586,
    'Physiotherapist instructing a patient on corrective back and posture exercises',
  ),
  seniorMobility: photo(
    6815695,
    'Older adults performing guided stretching exercises together in a bright rehabilitation gym',
  ),
  seniorWalking: photo(
    8498153,
    'An older adult walking arm in arm with a companion, smiling, on a mobility walk',
  ),
  strengthTraining: photo(
    4164756,
    'Adult patient performing guided strength training with light dumbbells during rehabilitation',
  ),
  kneePain: photo(7298410, 'Person sitting outdoors holding their sore knee, showing joint pain'),
  kneeInjury: photo(7298467, 'Close-up of a bruised and injured knee photographed in natural daylight'),
  kneeRecovery: photo(7298659, 'Athlete in activewear massaging a sore knee in a park during recovery'),
  avatarA: photo(5215024, ''),
  avatarB: photo(3714743, ''),
  avatarC: photo(4018481, ''),
  avatarD: photo(6815695, ''),
};

export const gallery = [image.clinicSession, image.gymSession, image.seniorMobility];

export default image;
