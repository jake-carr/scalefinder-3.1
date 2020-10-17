import * as actions from "./actionTypes";

export const reducer = (state, action) => {
  if (action.type === actions.SET_FRET_COUNT) {
    return {
      ...state,
      numberOfFrets: action.payload,
    };
  }
  if (action.type === actions.SET_STRING_COUNT) {
    return {
      ...state,
      numberOfStrings: action.payload,
    };
  }
  if (action.type === actions.SET_NOTE_INDEX) {
    return {
      ...state,
      selectedNoteIndex: action.payload,
    };
  }
  if (action.type === actions.SET_SCALE_INDEX) {
    return {
      ...state,
      selectedScaleIndex: action.payload,
    };
  }
  if (action.type === actions.SET_TUNING_INDEX) {
    return {
      ...state,
      selectedTuningIndex: action.payload,
      changeTuningRequest: state.changeTuningRequest + 1,
    };
  }
  if (action.type === actions.TOGGLE) {
    return {
      ...state,
      [action.payload]: !state[action.payload],
    };
  }
  if (action.type === actions.TOGGLE_ON) {
    return {
      ...state,
      [action.payload]: true,
    };
  }
  if (action.type === actions.TOGGLE_OFF) {
    return {
      ...state,
      [action.payload]: false,
    };
  }
  if (action.type === actions.LOG_OUT) {
    return {
      ...state,
      userID: null,
    };
  }

  return state;
};
