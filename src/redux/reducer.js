import * as actions from "./actionTypes";
import {saveLocally} from "../constants/utils"

export const reducer = (state, action) => {
  if (action.type === actions.SET_FRET_COUNT) {
    saveLocally("numberOfFrets", action.payload)
    return {
      ...state,
      numberOfFrets: action.payload,
    };
  }
  if (action.type === actions.SET_STRING_COUNT) {
    saveLocally("numberOfStrings", action.payload)
    return {
      ...state,
      numberOfStrings: action.payload,
    };
  }
  if (action.type === actions.SET_NOTE_INDEX) {
    saveLocally("noteIndex", action.payload)
    return {
      ...state,
      selectedNoteIndex: action.payload,
    };
  }
  if (action.type === actions.SET_SCALE_INDEX) {
    saveLocally("scaleIndex", action.payload)
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

  return state;
};
