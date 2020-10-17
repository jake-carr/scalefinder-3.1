const scales = [
  {
    name: "Ionian (Major)",
    pattern: [2, 2, 1, 2, 2, 2],
    info:
      "First mode of major scale. Triad qualities: I, ii, iii, IV, V, vi, vii°",
  },
  {
    name: "Dorian",
    pattern: [2, 1, 2, 2, 2, 1],
    info:
      "Second mode of major scale. Triad qualities: i, ii, III, IV, v, vi°, VII",
  },
  {
    name: "Phrygian",
    pattern: [1, 2, 2, 2, 1, 2],
    info:
      "Third mode of major scale. Triad qualities: i, II, III, iv, v°, VI, vii",
  },
  {
    name: "Lydian",
    pattern: [2, 2, 2, 1, 2, 2],
    info:
      "Fourth mode of major scale. Triad qualities: I, II, iii, iv°, V, vi, vii",
  },
  {
    name: "Mixolydian",
    pattern: [2, 2, 1, 2, 2, 1],
    info:
      "Fifth mode of major scale. Triad qualities: I, ii, iii°, IV, v, vi, VII",
  },
  {
    name: "Aeolian (Natural Minor)",
    pattern: [2, 1, 2, 2, 1, 2],
    info:
      "Sixth mode of major scale. Triad qualities: i, ii°, III, iv, v, VI, VII",
  },
  {
    name: "Locrian",
    pattern: [1, 2, 2, 1, 2, 2],
    info:
      "Seventh mode of major scale. Triad qualities: i°, II, iii, iv, V, VI, vii",
  },
  {
    name: "Harmonic Minor",
    pattern: [2, 1, 2, 2, 1, 3],
    info: "Triad qualities: i, ii°, III+, iv, V, VI, vii°",
  },
  {
    name: "Melodic Minor",
    pattern: [2, 1, 2, 2, 2, 2],
    info: "Triad qualities: i, ii, III+, IV, V, vi°, vii°",
  },
  {
    name: "Bebop Major",
    pattern: [2, 2, 1, 2, 1, 1, 2],
    info:
      "Major scale with a chromatic passing tone between the 5th and 6th notes. Sometimes used over major 6th and 7th chords.",
  },
  {
    name: "Bebop Minor (Dorian)",
    pattern: [2, 1, 1, 1, 2, 2, 1],
    info:
      "Dorian scale with a chromatic passing tone between the minor 3rd and the perfect 4th.",
  },
  {
    name: "Bebop Dominant",
    pattern: [2, 2, 1, 2, 2, 1, 1],
    info:
      "Mixolydian scale with a chromatic passing tone between the 7th and the root.",
  },
  {
    name: "Blues",
    pattern: [3, 2, 1, 1, 3],
    info:
      "Minor pentatonic scale with a blues note added between the 3rd and 4th.",
  },
  {
    name: "Major Hexatonic",
    pattern: [2, 2, 1, 2, 2],
    info: "Major (Ionian) scale with the 7th removed.",
  },
  {
    name: "Minor Hexatonic",
    pattern: [2, 1, 2, 2, 3],
    info: "Minor (Aeolian) scale with the 6th removed.",
  },
  {
    name: "Major Pentatonic",
    pattern: [2, 2, 3, 2],
    info: "Gapped Ionian scale, omitting the 4th and 7th.",
  },
  {
    name: "Minor Pentatonic",
    pattern: [3, 2, 2, 3],
    info: "Gapped Aeolian scale, omitting the 2nd and 6th.",
  },
  {
    name: "Egyptian Pentatonic",
    pattern: [2, 3, 2, 3],
    info: "Gapped Dorian scale, omitting the 3rd and 6th.",
  },
  {
    name: "Arabic",
    pattern: [1, 3, 1, 2, 1, 2],
    info:
      "AKA Phrygian dominant. Sometimes used in Arabic, Egyptian, Spanish & Indian raga music.",
  },
  {
    name: "Byzantine",
    pattern: [1, 3, 1, 2, 1, 3],
    info: "AKA double harmonic scale; not commonly used in Western music.",
  },
  {
    name: "Japanese (Yo)",
    pattern: [2, 3, 2, 2],
    info: "Gapped Mixolydian scale, omitting the 3rd and 7th.",
  },
  {
    name: "Japanese (Hirajōshi)",
    pattern: [1, 4, 1, 4],
    info:
      "A scale adapted from shamishen music. Sometimes used by rock & jazz guitarists in search of 'new' sounds.",
  },
  {
    name: "Indian Pentantonic",
    pattern: [4, 1, 2, 3],
    info:
      "Gapped Arabic or Phrygian Dominant scale, omitting the 2nd and 6th. Play with slides and bends for Indian feel.",
  },
  {
    name: "Persian",
    pattern: [1, 3, 1, 1, 2, 3],
    info:
      "Characterized by the liberal use of half steps and augmented seconds, and frequent use of chromaticism.",
  },
];

export default scales;
