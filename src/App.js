import React, { useEffect } from "react";
import "./App.scss";
import { connect } from "react-redux";
import Fretboard from "./components/Fretboard";
import ScaleTray from "./components/ScaleTray";
import InfoPopup from "./components/InfoPopup";
import MobilePage from "./components/MobilePage";
import scales from "./constants/scales";
import { getAlteration, createScale, retrieveLocalStorage } from "./constants/utils";

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
    setFretCount,
    setStringCount,
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

  let isMobile = false;

  if (/Mobi/.test(navigator.userAgent)) {
    isMobile = true;
  }

  useEffect(() => {
    let storage = retrieveLocalStorage();

    // Randomize note & scale if none are in local storage
    if (!storage.noteIndex) {
      setNoteIndex(Math.floor(Math.random() * 12));
    } else {
      setNoteIndex(storage.noteIndex)
    }

    if (!storage.scaleIndex) {
      setScaleIndex(Math.floor(Math.random() * scales.length));
    } else {
      setScaleIndex(storage.scaleIndex)
    }

    // Check if there is a saved # of frets & strings in local storage
    if (storage.numberOfFrets) {
      setFretCount(storage.numberOfFrets)
    }
    if (storage.numberOfStrings) {
      setStringCount(storage.numberOfStrings)
    }

    // eslint-disable-next-line
  }, []);

  if (isMobile) {
    return <MobilePage></MobilePage>
  }

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
      <a className="app-store-link" rel="noopener noreferrer" href="https://apps.apple.com/us/app/guitar-scale-finder/id1487884068" target="_blank">Download guitar scale finder for iOS (free, no ads)</a>
      <a className="email-link" rel="noopener noreferrer" href="mailto: guitarscalefinder@gmail.com" target="_blank">Request a feature or report a bug</a>
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
    setFretCount: (value) =>
      dispatch({ type: "SET_FRET_COUNT", payload: value }),
    setStringCount: (value) =>
      dispatch({ type: "SET_STRING_COUNT", payload: value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
