// import React from "react";
// import "./MailList.css";
// // import { Facebook } from "@mui/icons-material";

// const emailState = {
//   email: "",
//   error: "",
// };
// class MailList extends React.Component {
//   constructor() {
//     super();
//     this.state = emailState;
//     this.onChange = this.onChange.bind(this);
//   }
//   onChange(e) {
//     this.setState({
//       email: e.target.value,
//     });
//   }
//   emailValidation() {
//     const regex = /stamaria.sti.edu.ph$/i;
//     if (!this.state.email || regex.test(this.state.email) === false) {
//       this.setState({
//         error: "Email is not valid",
//       });
//       return false;
//     }
//     return true;
//   }
//   onSubmit() {
//     if (this.emailValidation()) {
//       console.log(this.state);
//       this.setState(emailState);
//     }
//   }
//   render() {
//     return (
//       <div className="mail">
//         <h1 className="mailTitle">
//           For Inquiries and Reservation Please contact us!
//         </h1>
//         <span className="mailDesc">
//           Sign up and we'll send the best deals to you!
//         </span>
//         <div className="mailInputContainer">
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={this.state.email}
//             onChange={this.onChange}
//           />
//           <button onClick={() => this.onSubmit()}>Subscribe</button>
//           <div>
//             <span className="text-danger">{this.state.error}</span>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default MailList;

import "./MailList.css";
import { useState } from "react";

const MailList = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  const handleEmailValidation = () => {
    // const regex = /@stamaria.sti.edu.ph$/i;
    if (regex.test(email)) {
      setError("Submitted");
      console.log("Submitted");
    } else {
      setError("Email is not valid");
      console.log("Email is not valid");
    }
  };

  // const onSubmit = () => {
  //   handleEmailValidation();
  // };

  return (
    <div className="mail">
      <h1 className="mailTitle">
        For Inquiries and Reservation Please contact us!
      </h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you!
      </span>
      <div className="mailInputContainer">
        <input
          type="email"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleEmailValidation}>Subscribe</button>
        <div>
          <span className="text-danger">{error}</span>
        </div>
      </div>
    </div>
  );
};

export default MailList;
