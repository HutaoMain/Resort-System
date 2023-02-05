import React from "react";
import ProgressBarStep from "./ProgressBarStep";
import "./ProgressBar.css";

const ProgressBarStepNavigation = (props) => {
  return (
    <div className="stepWrapper">
      {props.labelArray.map((item, index) => (
        <ProgressBarStep
          key={index}
          index={index}
          label={item}
          updateStep={props.updateStep}
          selected={props.currentStep === index + 1}
        ></ProgressBarStep>
      ))}
    </div>
  );
};

export default ProgressBarStepNavigation;
