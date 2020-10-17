import React from "react";
import { connect } from "react-redux";
import { convertIndexToString, sargams } from "../constants/utils";

function Fret(props) {
  const {
    note,
    showUnusedNotes,
    highlightRoots,
    degrees,
    sargamNotation,
    sharps,
    scale,
    label,
  } = props;

  const assignID = () => {
    if (scale[0] === note && highlightRoots) {
      return "highlighted";
    } else if (scale.includes(note)) {
      return "scale-note";
    } else if (showUnusedNotes) {
      return "unused-note";
    } else return "blank-fret";
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
    }
  };

  const renderLabel = () => {
    if (label !== null) {
      return <span className="fret-label">{label.toString()}</span>;
    }
  };

  return (
    <div className="fret" id={assignID()}>
      <p className="fret-text">{convertIndexToString(note, sharps)}</p>
      <span
        className={
          degrees
            ? sargamNotation
              ? "sargam-container"
              : "degree-container"
            : "degree-hidden"
        }
      >
        {getDegree(note, scale)}
      </span>
      {renderLabel()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    sharps: state.sharps,
    showUnusedNotes: state.showUnusedNotes,
    highlightRoots: state.highlightRoots,
    degrees: state.degrees,
    sargamNotation: state.sargamNotation,
  };
}

export default connect(mapStateToProps)(Fret);
