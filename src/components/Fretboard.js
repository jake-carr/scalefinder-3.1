import React from "react";
import { connect } from "react-redux";
import String from "./String";
import { indices } from "../constants/utils";
import Stepper from "./Stepper";

function Fretboard(props) {
  const { numberOfStrings, numberOfFrets, currentScale } = props;

  const renderGuitarStrings = () => {
    const strings = [...indices];
    strings.length = numberOfStrings;
    return strings.map((noteIndex, stringIndex) => {
      return (
        <String
          key={stringIndex}
          rootIndex={noteIndex}
          stringIndex={stringIndex}
          numberOfFrets={numberOfFrets}
          scale={currentScale}
        ></String>
      );
    });
  };

  return (
    <div className="fretboard">
      <div className="fretboard-options-container">
        <Stepper type="String" />
        <Stepper type="Fret" />
      </div>
      <div className="guitar-string-container">{renderGuitarStrings()}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    numberOfStrings: state.numberOfStrings,
    numberOfFrets: state.numberOfFrets,
  };
}

export default connect(mapStateToProps)(Fretboard);
