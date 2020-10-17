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
  loginModalOpen: false,
  userID: "5f837761c897960230d020c1",
};

const store = createStore(reducer, initialState);
export default store;
