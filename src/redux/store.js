import { createStore } from "redux";
import { reducer } from "./reducer";

const initialState = {
  selectedNoteIndex: 0,
  selectedScaleIndex: 0,
  numberOfStrings: 6,
  numberOfFrets: 12,
  highlightRoots: false,
  showUnusedNotes: false,
  degrees: false,
  sargamNotation: false,
  sharps: true,
  infoModalOpen: false,
};

const store = createStore(reducer, initialState);
export default store;
