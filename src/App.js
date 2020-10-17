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
    setStringCount,
    setFretCount,
    userID,
  } = props;

  const [username, updateUsername] = React.useState(null);

  // Todos via Brandon
  // Express Encryption Library (Crypto) : Encrypt plaintext pw so can store in mongo.
  // Dotenv : Put mongo connection in .env not commited to github
  // Session tokens : Send to front-end once logged in.
  //      ^ The front-end attaches it to requests, so you know it's valid and who it's for, don't need to send username every time.

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

  const getUserData = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then((response) => response.json())
      .then((result) =>
        mapUserPrefsToState(result.data.username, result.data.preferences)
      )
      .catch((error) => console.log("error", error));
  };

  const mapUserPrefsToState = (name, savedPrefs) => {
    updateUsername(name);
    let newState = {};
    // Copy saved preferences from api
    // Doesn't handle tuning, just defaults it.
    Object.keys(savedPrefs).forEach(function (key) {
      let value = savedPrefs[key];
      newState[key] = value;
    });
    Object.keys(newState).forEach(function (key) {
      let value = newState[key];
      let name = key.toString();
      switch (name) {
        case "selectedNoteIndex":
          setNoteIndex(value);
          break;
        case "selectedScaleIndex":
          setScaleIndex(value);
          break;
        case "numberOfStrings":
          setStringCount(value);
          break;
        case "numberOfFrets":
          setFretCount(value);
          break;
        case "showUnusedNotes":
          if (value !== showUnusedNotes) {
            toggleShowUnusedNotes();
          }
          break;
        case "degrees":
          if (value !== degrees) {
            toggleShowDegrees();
          }
          break;
        case "sargamNotation":
          if (value !== sargamNotation) {
            toggleIndianNotation();
          }
          break;
        case "highlightRoots":
          if (value !== highlightRoots) {
            toggleHighlightRoots();
          }
          break;
        case "sharps":
          if (value !== sharps) {
            toggleSharps();
          }
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    if (userID !== null) {
      getUserData(userID);
    } else if (userID === null || undefined) {
      randomize();
    }
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
    userID: state.userID,
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
