import React, { useState } from "react";
import ProgressBarStepNavigation from "./ProgressBarStepNavigation";
import "./ProgressBar.css";

const ProgressBarMain = () => {
  const labelArray = ["Step 1", "Step 2", "Step 3"];
  const [currentStep, updateCurrentStep] = useState(1);

  const updateStep = (step) => {
    updateCurrentStep(step);
  };

  return (
    <div className="progressbar-container">
      <ProgressBarStepNavigation
        labelArray={labelArray}
        currentStep={currentStep}
        updateStep={updateStep}
      ></ProgressBarStepNavigation>
      {/* <p>Selected Step: {currentStep}</p> */}

      {/* <button
        className="primaryButton"
        disabled={currentStep === 1}
        onClick={() => updateStep(currentStep - 1)}
      >
        Previous Step
      </button>
      <button
        className="primaryButton"
        disabled={currentStep === labelArray.length}
        onClick={() => updateStep(currentStep + 1)}
      >
        Next Step
      </button> */}
    </div>
  );
};

export default ProgressBarMain;
