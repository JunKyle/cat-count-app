import "./App.scss";
import { useState, useEffect } from "react";
import { login } from "./api/login";
import { Link } from "react-router-dom";
import Header from "./Header";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function submitLogin() {
    console.log("user", user);
    console.log("password", password);
    try {
      await login({
        user: user,
        password: password
      });
    } catch (err) {
      return err.toString();
    }
  }
  return (
    <>
      <div className="Login">
        <Header />
        <section className="section">
          <h1 className="h1">
            Login
          </h1>
          <form className="Login__form">
            <div className="formDiv">
              <label className="formLabel">User : </label>
              <input
               className="formInput"
                type="text"
                name="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="formDiv">
              <label className="formLabel">Password : </label>
              <input
               className="formInput"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link className="link" to="/signin">create an account</Link>
            <button className="button Login__button" onClick={submitLogin}>
              <Link to="/">Confirm</Link>
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;
