import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && confirmPassword) {
      fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          cpassword: confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      console.log("Fill all fields");
    }
  };

  return (
    <section className="w-full flex justify-center mt-14">
      <div className="w-3/4 flex flex-col">
        <h1 className="authLetter">Sign up</h1>
        <form className="mt-14 justify-center">
          <div className="authContainer">
            <div className="authLabelContainer">
              <label htmlFor="email" className="authLabel">
                Email *
              </label>
            </div>
            <input
              id="email"
              autoComplete="false"
              tabIndex="0"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="authInput"
            />
          </div>

          <div className="authContainer">
            <div className="authLabelContainer">
              <label htmlFor="password" className="authLabel">
                Password *
              </label>
            </div>
            <input
              id="password"
              autoComplete="false"
              tabIndex="0"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="authInput"
            />
          </div>

          <div className="authContainer">
            <div className="authLabelContainer">
              <label htmlFor="cpassword" className="authLabel">
                Confirm Password *
              </label>
            </div>
            <input
              id="cpassword"
              autoComplete="false"
              tabIndex="0"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="authInput"
            />
          </div>
          <div className="w-full flex justify-center">
            <button className="authButton" onClick={handleSubmit}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
