import axios from "axios";
import React, { useState } from "react";

const SendEmail = () => {
  // const [send, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    try {
      await axios.post("/email/send", {
        email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("text: ", text, "email: ", email);

  return (
    <div>
      {/* {!send ? ( */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "20%",
        }}
      >
        {/* <input
            type="text"
            placeholder="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          /> */}
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSend}>Send Email</button>
      </div>
      {/* ) : (
        <h1>Email Sent</h1>
      )} */}
    </div>
  );
};

export default SendEmail;
