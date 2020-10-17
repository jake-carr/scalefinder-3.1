import {
  SET_NOTE_INDEX,
  SET_SCALE_INDEX,
  SET_TUNING_INDEX,
  SET_STRING_COUNT,
  SET_FRET_COUNT,
  TOGGLE,
  TOGGLE_OFF,
  TOGGLE_ON,
  LOG_OUT,
} from "./actionTypes";

export const setNoteIndex = (index) => ({
  type: SET_NOTE_INDEX,
  payload: index,
});

export const setScaleIndex = (index) => ({
  type: SET_SCALE_INDEX,
  payload: index,
});

export const setTuningIndex = (index) => ({
  type: SET_TUNING_INDEX,
  payload: index,
});

export const setStringCount = (value) => ({
  type: SET_STRING_COUNT,
  payload: value,
});

export const setFretCount = (value) => ({
  type: SET_FRET_COUNT,
  payload: value,
});

export const toggle = (name) => ({
  type: TOGGLE,
  payload: name,
});

export const setToTrue = (name) => ({
  type: TOGGLE_ON,
  payload: name,
});

export const setToFalse = (name) => ({
  type: TOGGLE_OFF,
  payload: name,
});

export const logOutUser = () => ({
  type: LOG_OUT,
});
