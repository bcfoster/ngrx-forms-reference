const HEAD = {
  OTHER: 0,
  RIGHT_EYE: 1,
  LEFT_EYE: 2,
  RIGHT_EAR: 3,
  LEFT_EAR: 4,
  FOREHEAD: 5,
  SKULL: 6,
  NOSE: 7,
  MOUTH: 8,
  TEETH: 9,
  NECK: 10,
};

const TORSO = {
  OTHER: 0,
  CHEST: 1,
  ORGANS: 2,
  UPPER_BACK: 3,
  LOWER_BACK: 4,
  ABDOMEN: 5,
  WAIST: 6,
  BUTTOCKS: 7,
  GROIN: 8,
};

const ARM = {
  OTHER: 0,
  SHOULDER: 1,
  UPPER_ARM: 2,
  ELBOW: 3,
  LOWER_ARM: 4,
  WRIST: 5,
  HAND: 6,
  FINGERS: 7,
  THUMB: 8,
};

const LEG = {
  OTHER: 0,
  UPPER_LEG: 1,
  KNEE: 2,
  SHIN: 3,
  ANKLE: 4,
  FOOT: 5,
  TOES: 6,
};

const BODY_PARTS = {
  HEAD,
  TORSO,
  ARM,
  LEG,
};

export { BODY_PARTS };
