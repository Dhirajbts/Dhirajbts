import React, { useState } from "react";
import axios from "axios";

function App() {
  // const [validationError, setValidationError] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const saveFormData = async (values) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http", JSON.stringify(values))
        .then((result) => resolve(result))
        .catch((e) => {
          reject(e);
        });
    });
  };

  const emailValid = () => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const result = regex.test(values.email);
    console.log(result);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    emailValid();
    localStorage.setItem("user", JSON.stringify(values));
    try {
      await saveFormData(values);
      alert("Your registration was successfully submitted!");
      setValues({
        email: "",
        password: "",
      }); // for erasing data
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  };

  console.log("values::::", values);

  return (
    <>
      <div className="login-container">
        <div className="login-inputs">
          <form onSubmit={handleSubmit}>
            <div className="email-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={values.email}
                placeholder="Enter your email id.."
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
              />
            </div>
            <div className="password-input">
              <label htmlFor="pasword">Password</label>
              <input
                type="password"
                value={values.password}
                placeholder="*******"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
              />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
