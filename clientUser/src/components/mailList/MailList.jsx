// import "./MailList.css";

// const MailList = () => {
//   return (
//     <div className="mail">
//       <h1 className="mailTitle">Save time, save money!</h1>
//       <span className="mailDesc">
//         Sign up and we'll send the best deals to you!
//       </span>
//       <div className="mailInputContainer">
//         <input type="text" placeholder="Your Email" />
//         <button>Subscribe</button>
//       </div>
//     </div>
//   );
// };

// export default MailList;

import React from "react";
import "./MailList.css";

const emailState = {
  email: "",
  error: "",
};
class MailList extends React.Component {
  constructor() {
    super();
    this.state = emailState;
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  emailValidation() {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!this.state.email || regex.test(this.state.email) === false) {
      this.setState({
        error: "Email is not valid",
      });
      return false;
    }
    return true;
  }
  onSubmit() {
    if (this.emailValidation()) {
      console.log(this.state);
      this.setState(emailState);
    }
  }
  render() {
    return (
      <div className="mail">
        <h1 className="mailTitle">Save time, save money!</h1>
        <span className="mailDesc">
          Sign up and we'll send the best deals to you!
        </span>
        <div className="mailInputContainer">
          <input
            type="email"
            placeholder="Your Email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <button onClick={() => this.onSubmit()}>Subscribe</button>
          <div>
            <span className="text-danger">{this.state.error}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MailList;
