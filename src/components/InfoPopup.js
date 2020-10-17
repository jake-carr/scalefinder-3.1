import React from "react";
import scales from "../constants/scales";
import { connect } from "react-redux";

function InfoPopup(props) {
  const { closePopup, selectedScaleIndex } = props;
  const info = scales[selectedScaleIndex].info;
  const triads = info.includes("Triad qualities:") ? true : false;

  return (
    <div className="info-popup" onClick={closePopup}>
      <h4>{info}</h4>
      <p className={triads ? "key" : "hidden"}>
        I: major / i: minor / +: augmented / °: diminished
      </p>
      <footer>Click inside to close.</footer>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    selectedScaleIndex: state.selectedScaleIndex,
  };
}

export default connect(mapStateToProps)(InfoPopup);
