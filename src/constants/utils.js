export const sharps = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

export const flats = [
  "A",
  "Bb",
  "B",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
];

export const sargams = ["Sa", "Re", "Ga", "Ma", "Pa", "Da", "Ni"];

export const indices = [7, 2, 10, 5, 0, 7, 7, 7, 7, 7, 7, 7];

export const getAlteration = (isSharps) => {
  return isSharps ? sharps : flats;
};

export const convertIndexToString = (index, isSharps) => {
  if (isSharps) {
    return sharps[index];
  } else {
    return flats[index];
  }
};

export const parse = (index) => {
  if (index > 23) {
    return index - 24;
  } else if (index > 11) {
    return index - 12;
  } else return index;
};

export const createScale = (rootIndex, pattern) => {
  let scale = [];
  scale.push(rootIndex);
  let recent = scale[0];
  for (let i = 0; i < pattern.length; i++) {
    let note = recent + pattern[i];
    scale.push(parse(note));
    recent = scale[i + 1];
  }
  return scale;
};
