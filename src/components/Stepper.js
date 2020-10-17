import React from "react";
import { connect } from "react-redux";

const fretValues = {
  min: 12,
  max: 24,
};

const stringValues = {
  min: 4,
  max: 12,
};

function Stepper(props) {
  const {
    numberOfFrets,
    numberOfStrings,
    setFretCount,
    setStringCount,
    type,
  } = props;

  const getLabel = () => {
    return type + "s";
  };

  const stepUp = () => {
    if (type === "Fret") {
      if (numberOfFrets !== fretValues.max) {
        setFretCount(numberOfFrets + 1);
      }
    }
    if (type === "String") {
      if (numberOfStrings !== stringValues.max) {
        setStringCount(numberOfStrings + 1);
      }
    }
  };

  const stepDown = () => {
    if (type === "Fret") {
      if (numberOfFrets !== fretValues.min) {
        setFretCount(numberOfFrets - 1);
      }
    }
    if (type === "String") {
      if (numberOfStrings !== stringValues.min) {
        setStringCount(numberOfStrings - 1);
      }
    }
  };

  const min = () => {
    if (type === "Fret") {
      if (numberOfFrets === fretValues.min) {
        return "limit";
      }
    }
    if (type === "String") {
      if (numberOfStrings === stringValues.min) {
        return "limit";
      }
    }
  };

  const max = () => {
    if (type === "Fret") {
      if (numberOfFrets === fretValues.max) {
        return "limit";
      }
    }
    if (type === "String") {
      if (numberOfStrings === stringValues.max) {
        return "limit";
      }
    }
  };

  return (
    <div className="stepper">
      <div className="stepper-btn-container">
        {" "}
        <button
          id={min(numberOfFrets)}
          onClick={stepDown}
          className="plus-or-minus-btn"
        >
          -
        </button>
        <span type="text" id="counter">
          {type === "Fret"
            ? numberOfFrets.toString()
            : numberOfStrings.toString()}
        </span>
        <button
          id={max(numberOfFrets)}
          onClick={stepUp}
          className="plus-or-minus-btn"
        >
          +
        </button>
      </div>
      <span className="stepper-label" type="text">
        {getLabel()}
      </span>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    numberOfFrets: state.numberOfFrets,
    numberOfStrings: state.numberOfStrings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFretCount: (value) =>
      dispatch({ type: "SET_FRET_COUNT", payload: value }),
    setStringCount: (value) =>
      dispatch({ type: "SET_STRING_COUNT", payload: value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stepper);
