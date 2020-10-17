import React from "react";
import Fret from "./Fret";
import { convertIndexToString, parse, sargams } from "../constants/utils";
import { connect } from "react-redux";

function String(props) {
  const {
    numberOfFrets,
    numberOfStrings,
    rootIndex,
    stringIndex,
    scale,
    sharps,
    highlightRoots,
    degrees,
    sargamNotation,
  } = props;
  const [tuning, changeTuning] = React.useState(rootIndex);

  const tuneUp = () => {
    changeTuning(parse(tuning + 1));
  };

  const tuneDown = () => {
    tuning === 0 ? changeTuning(11) : changeTuning(parse(tuning - 1));
  };

  const renderFrets = () => {
    const frets = [...Array(numberOfFrets).keys()];
    const fretLabels = [1, 3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    return frets.map((value, idx) => {
      const fretNumber = idx + 1;
      const fretNote = parse(tuning + fretNumber);
      let label;
      if (fretLabels.includes(fretNumber)) {
        label = fretNumber;
      }
      return (
        <React.Fragment key={[value, idx]}>
          <Fret
            note={fretNote}
            scale={scale}
            label={
              stringIndex === numberOfStrings - 1 &&
              fretLabels.includes(fretNumber)
                ? label
                : null
            }
          ></Fret>
        </React.Fragment>
      );
    });
  };

  const getDegree = (note, scale) => {
    if (scale.includes(note)) {
      for (let i = 0; i < scale.length; i++) {
        if (scale[i] === note) {
          if (sargamNotation) {
            return sargams[i];
          } else {
            let degree = i + 1;
            return degree.toString();
          }
        }
      }
    } else return " ";
  };

  return (
    <div className="guitar-string">
      <div className="guitar-string-head">
        <button className="button-round-small-pink" onClick={tuneUp}>
          &#8593;
        </button>
        <button className="button-round-small-pink" onClick={tuneDown}>
          &#8595;
        </button>
        <span
          className={
            degrees
              ? sargamNotation
                ? "string-sargam"
                : "string-degree"
              : "hidden-degree"
          }
        >
          {getDegree(tuning, scale)}
        </span>
        <div
          className="string-tuning"
          id={
            scale[0] === tuning && highlightRoots === true
              ? "highlighted"
              : scale.includes(tuning)
              ? "scale-note"
              : "unused-note"
          }
        >
          {convertIndexToString(tuning, sharps)}
        </div>
      </div>

      <div className="fret-row-wrapper">{renderFrets()}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    sharps: state.sharps,
    numberOfStrings: state.numberOfStrings,
    highlightRoots: state.highlightRoots,
    degrees: state.degrees,
    sargamNotation: state.sargamNotation,
  };
}

export default connect(mapStateToProps)(String);
