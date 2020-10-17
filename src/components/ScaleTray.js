import React from "react";
import { connect } from "react-redux";

function ScaleTray(props) {
  const { options, selectedScaleIndex } = props;

  const [open, setOpen] = React.useState(false);
  const [keepOpen, toggleKeep] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    if (keepOpen === false) {
      setOpen(false);
    } else {
      return null;
    }
  };

  const toggleKeepOpen = () => {
    toggleKeep(!keepOpen);
  };

  const renderOptions = () => {
    return (
      <div className="scale-button-grid">
        {options.map((item, idx) => {
          return (
            <button
              key={[item, idx]}
              className="scale-button"
              id={idx === selectedScaleIndex ? "selected" : null}
              onClick={() => {
                props.setScaleIndex(idx);
                handleClose();
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="scale-tray">
      <button
        className="open-scale-tray-button"
        id={open ? "open" : null}
        onClick={handleOpen}
      >
        {options[selectedScaleIndex].name}
      </button>
      {open ? (
        <div className="scale-tray-open" onClose={handleClose}>
          {renderOptions()}
          <div className="scale-tray-footer">
            <button
              className={keepOpen ? "toggle-switch-on" : "toggle-switch-off"}
              id="toggle-switch"
              onClick={toggleKeepOpen}
            ></button>{" "}
            <span type="text">Keep scale tray open</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    selectedScaleIndex: state.selectedScaleIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setScaleIndex: (value) =>
      dispatch({ type: "SET_SCALE_INDEX", payload: value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaleTray);
