import "./Register.css";
import { UrlPath } from "../../../UrlPath";

import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Tooltip } from "antd";

const Register = ({ close }) => {
  //setup birthdate
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const currentYear = new Date().getFullYear();
  const days = [...Array(31).keys()].map((i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [...Array(100).keys()].map((i) => currentYear - i - 18);

  // const [completeDate, setCompleteDate] = useState({
  //   year: year,
  //   day: day,
  //   month: month,
  // });

  // function handleChangeDate(e) {
  //   setCompleteDate({
  //     ...completeDate,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  const date = new Date(month + " " + day + ", " + year);
  const formattedDate = date.toLocaleDateString();
  //end birthdate

  // validation
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  function validateForm() {
    const newErrors = {};

    if (credentials.firstName === "") {
      newErrors.firstName = "First name is required";
    }

    if (credentials.lastName === "") {
      newErrors.lastName = "Last name is required";
    }

    if (credentials.phoneNumber === "") {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (credentials.email === "") {
      newErrors.email = "Email is required";
    } else if (!/^[^@]+@[^@.]+\.[^@]+$/.test(credentials.email)) {
      newErrors.email = "Invalid email address";
    }

    if (credentials.password === "") {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (credentials.confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password";
    }

    if (credentials.password !== credentials.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }
  // end validation

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        await axios
          .post(`${UrlPath}/auth/register`, {
            ...credentials,
            birthday: formattedDate,
          })
          .then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
          });

        toast.success(" You have successfully signed up!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          closeOnClick: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(credentials);

  return (
    <div>
      <h1>Sign Up</h1>
      <span style={{ marginBottom: "10px" }}>It's quick and easy.</span>
      <hr style={{ marginTop: "10px" }} />
      <div className="register-container">
        <div className="register-input-name-container">
          <Tooltip title={errors.firstName} open={errors.firstName} color="red">
            <input
              type="text"
              placeholder="&nbsp;&nbsp;First name"
              id="firstName"
              name="firstName"
              value={credentials.firstName}
              className="register-input-name"
              // onChange={(e) => {
              //   setCredentials((data) => ({
              //     ...data,
              //     firstName: e.target.value,
              //   }));
              // }}
              onChange={handleChange}
            />
          </Tooltip>
          <Tooltip title={errors.lastName} open={errors.lastName} color="red">
            <input
              type="text"
              placeholder="&nbsp;&nbsp;Last name"
              id="lastName"
              name="lastName"
              value={credentials.lastName}
              className="register-input-name"
              onChange={handleChange}
            />
          </Tooltip>
        </div>
        <Tooltip title={errors.email} open={errors.email} color="red">
          <input
            type="email"
            placeholder="&nbsp;&nbsp;Email Address"
            id="email"
            name="email"
            value={credentials.email}
            className="register-input"
            // onChange={(e) => {
            //   setCredentials((data) => ({
            //     ...data,
            //     email: e.target.value,
            //   }));
            // }}
            onChange={handleChange}
          />
        </Tooltip>
        <Tooltip title={errors.password} open={errors.password} color="red">
          <input
            type="password"
            placeholder="&nbsp;&nbsp;Password"
            id="password"
            name="password"
            value={credentials.password}
            className="register-input"
            // onChange={(e) => {
            //   setCredentials((data) => ({
            //     ...data,
            //     password: e.target.value,
            //   }));
            // }}
            onChange={handleChange}
          />
        </Tooltip>
        <Tooltip
          title={errors.confirmPassword}
          open={errors.confirmPassword}
          color="red"
        >
          <input
            type="password"
            placeholder="&nbsp;&nbsp;Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            className="register-input"
            // onChange={(e) => {
            //   setCredentials((data) => ({
            //     ...data,
            //     password: e.target.value,
            //   }));
            // }}
            onChange={handleChange}
          />
        </Tooltip>
        <Tooltip
          title={errors.phoneNumber}
          open={errors.phoneNumber}
          color="red"
        >
          <input
            type="number"
            placeholder="&nbsp;&nbsp;Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            value={credentials.phoneNumber}
            className="register-input-number"
            // onChange={(e) => {
            //   setCredentials((data) => ({
            //     ...data,
            //     phoneNumber: e.target.value,
            //   }));
            // }}
            onChange={handleChange}
          />
        </Tooltip>
        {/* birthday */}

        <div className="register-birthday-container">
          <span className="register-birthday-label">Birthday:</span>
          <div className="register-birthday-input-container">
            <select
              className="register-birthday-input"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">--</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              className="register-birthday-input"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">--</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="register-birthday-input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">--</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* birthday */}
        <p className="register-terms">
          By clicking Sign Up, you agree to our Terms, Privacy Policy and
          Cookies Policy. You will receive an Email Notifications from us to
          validate your account.
        </p>
        <button className="register-btn" onClick={handleRegister}>
          Sign Up
        </button>
        <button className="register-close-btn" onClick={close}>
          x
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;