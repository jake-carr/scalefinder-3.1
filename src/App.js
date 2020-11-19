import React, { useEffect } from "react";
import "./App.scss";
import { connect } from "react-redux";
import Fretboard from "./components/Fretboard";
import ScaleTray from "./components/ScaleTray";
import InfoPopup from "./components/InfoPopup";
import scales from "./constants/scales";
import { getAlteration, createScale } from "./constants/utils";

const iSymbol = <span type="text"> &#8505;</span>;

function App(props) {
  const {
    selectedNoteIndex,
    selectedScaleIndex,
    highlightRoots,
    sargamNotation,
    sharps,
    degrees,
    infoModalOpen,
    showUnusedNotes,
    setNoteIndex,
    setScaleIndex,
    toggle,
  } = props;

  const toggleSharps = () => {
    toggle("sharps");
  };

  const toggleHighlightRoots = () => {
    toggle("highlightRoots");
  };

  const toggleShowUnusedNotes = () => {
    toggle("showUnusedNotes");
  };

  const toggleShowDegrees = () => {
    toggle("degrees");
  };

  const toggleIndianNotation = () => {
    toggle("sargamNotation");
  };

  const toggleInfoModal = () => {
    toggle("infoModalOpen");
  };

  const toggleOptions = [
    {
      toggle: toggleSharps,
      btnText: sharps ? "♭" : "♯",
      round: true,
    },
    {
      toggle: toggleHighlightRoots,
      btnText: "Highlight roots",
      round: false,
    },
    {
      toggle: toggleShowUnusedNotes,
      btnText: showUnusedNotes ? "Label scale only" : "Label all frets",
      round: false,
    },
    {
      toggle: toggleShowDegrees,
      btnText: degrees ? "Hide degrees" : "Show degrees",
      round: false,
    },
    {
      toggle: toggleInfoModal,
      btnText: iSymbol,
      round: true,
    },
  ];

  const randomize = () => {
    setNoteIndex(Math.floor(Math.random() * 12));
    setScaleIndex(Math.floor(Math.random() * scales.length));
  };

  const renderNoteButtons = (notation) => {
    return notation.map((note, idx) => {
      return (
        <button
          key={[note, idx]}
          className="note-button"
          id={idx === selectedNoteIndex ? "selected" : "unselected"}
          onClick={() => {
            setNoteIndex(idx);
          }}
        >
          {note}
        </button>
      );
    });
  };

  const renderToggleButtons = () => {
    return toggleOptions.map((btn, idx) => {
      return (
        <button
          key={idx}
          className={
            btn.round ? "round-button-gray" : "rectangular-button-gray"
          }
          id={
            btn.btnText === "Highlight roots" && highlightRoots
              ? "selected-green"
              : !btn.round && btn.btnText.includes("degrees") && degrees
              ? "selected-blue"
              : null
          }
          onClick={btn.toggle}
        >
          {btn.btnText}
        </button>
      );
    });
  };

  const currentScale = createScale(
    selectedNoteIndex,
    scales[selectedScaleIndex].pattern
  );

  const alteration = getAlteration(sharps);

  useEffect(() => {
    randomize();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div className="main-selector-container">
        <button id="randomize-button" onClick={randomize}>
          <span role="img" aria-label="game-die">
            🎲
          </span>
        </button>
        <div className="note-button-container">
          {renderNoteButtons(alteration)}
        </div>
        <ScaleTray options={scales} />
      </div>
      <div className="toggle-button-container">
        {infoModalOpen ? (
          <InfoPopup closePopup={toggleInfoModal.bind(this)} />
        ) : null}
        {renderToggleButtons()}
        {degrees ? (
          <div className="degree-notation-options">
            <button
              className={!sargamNotation ? "on" : "sargams-on"}
              onClick={toggleIndianNotation}
            >
              numbered degrees
            </button>
            <button
              className={sargamNotation ? "on" : "sargams-on"}
              onClick={toggleIndianNotation}
            >
              indian sargams
            </button>
          </div>
        ) : null}
      </div>
      <Fretboard currentScale={currentScale}></Fretboard>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    sharps: state.sharps,
    highlightRoots: state.highlightRoots,
    showUnusedNotes: state.showUnusedNotes,
    degrees: state.degrees,
    sargamNotation: state.sargamNotation,
    infoModalOpen: state.infoModalOpen,
    selectedNoteIndex: state.selectedNoteIndex,
    selectedScaleIndex: state.selectedScaleIndex,
    numberOfFrets: state.numberOfFrets,
    numberOfStrings: state.numberOfStrings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (name) => dispatch({ type: "TOGGLE", payload: name }),
    setNoteIndex: (index) =>
      dispatch({ type: "SET_NOTE_INDEX", payload: index }),
    setScaleIndex: (index) =>
      dispatch({ type: "SET_SCALE_INDEX", payload: index }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
