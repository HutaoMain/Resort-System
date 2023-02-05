// import React from "react";
// import useFormContext from "../../hooks/useFormContext";
// import "./ProgressBar.css";

// const ProgressBar = () => {
//   const { page, title } = useFormContext();

//   const interval = 100 / Object.keys(title).length;

//   const progress = ((page + 1) * interval).toFixed(2);

//   const steps = Object.keys(title).map((i) => {
//     return (
//       <div key={i} className="barmarker">
//         Steps {i + 1}
//       </div>
//     );
//   });

//   return (
//     <div>
//       <section className="progress-container">
//         <div className="barmarker-container">{steps}</div>
//         <progress className="progress" max="100" value={progress}></progress>
//       </section>
//     </div>
//   );
// };

// export default ProgressBar;

//

// import React from 'react'
// import { useState } from 'react'

// const App = () => {

//   const labelArray = ["Step 1", "Step 2", "Step 3"]
//   const [currentStep, updateCurrentStep] = useState(1)

// const updateStep = (step) => {
//   updateCurrentStep(step);
// };

//   return (
//     <div>
//       <StepNavigation labelArray={labelArray}></StepNavigation>
//       <p>{currentStep}</p>

/* <button className="primaryButton" onClick={() => updateStep(currentStep - 1)}> Previous Step</button>
<button className="primaryButton" onClick={() => updateStep(currentStep + 1)}> Next Step</button> */

//     </div>
//   )
// }

// export default App

//

// import React from "react";
// import Step from "step"

// const stepNavigation = (props) => {
//   return <div className="stepWrapper">
//     {props.labelArray.map((item, index) => {
//       <Step label={item} index={index} updateStep={props.updateStep} selected = {props.currentStep === index + 1}></Step>
//     })}

//   </div>;
// };

// export default stepNavigation;

import React from "react";
import "./ProgressBar.css";

const ProgressBarStep = (props) => {
  return (
    <div className={"stepBlock" + (props.selected ? " selected" : "")}>
      <div
        className="circleWrapper"
        onClick={() => props.updateStep(props.index + 1)}
      >
        <div className="circle-progress">{props.index + 1}</div>
      </div>
      <span>{props.label}</span>
    </div>
  );
};

export default ProgressBarStep;
