import React from "react";
import { Modal, Button } from "react-bootstrap";

const ToAnalysisButtons = ({
  show,
  handleClose,
  toEnsemble,
  toRandom,
  selectedState,
  toCompareCurrent,
}) => {
  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <div className="button-container">
        <Button
          variant="link"
          className="toAnalysisButtons"
          onClick={() => toEnsemble(selectedState, "Ensemble SMD & MMD")}
        >
          Ensemble SMD & MMD
        </Button>
        <Button
          variant="link"
          className="toAnalysisButtons"
          onClick={() => toRandom(selectedState, "5 Sample SMD Plans")}
        >
          5 Sample SMD Plans
        </Button>
        <Button
          variant="link"
          className="toAnalysisButtons"
          onClick={() => toRandom(selectedState, "5 Sample MMD Plans")}
        >
          5 Sample MMD Plans
        </Button>
        <Button
          variant="link"
          className="toAnalysisButtons"
          onClick={() => toCompareCurrent(selectedState, "Current SMD vs. Average MMD")}
        >
          Current SMD vs. Average MMD
        </Button>
      </div>
    </Modal>
  );
};

export default ToAnalysisButtons;
