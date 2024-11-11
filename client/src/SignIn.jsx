import "./App.scss";
import { useState, useEffect } from "react";
import { signin } from "./api/login";
import { Link } from "react-router-dom";
import Header from "./Header";

function SignIn() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

  async function submitSignIn() {
    console.log("pseudo", pseudo);
    console.log("password", password);
    console.log("mail", mail);
    try {
      await signin({
        pseudo: pseudo,
        password: password,
        mail: mail,
        createdAt: new Date(),
        nbCatCount: 0
      });
    } catch (err) {
      return err.toString();
    }
  }
  return (
    <>
      <div className="SignIn">
        <Header />
        <section className="section">
          <h1 className="h1">
            Create an account
          </h1>
          <form className="SignIn__form">
            <div className="formDiv">
              <label className="formLabel">Pseudo : </label>
              <input
               className="formInput"
                type="text"
                name="pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
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
            <div className="formDiv">
              <label className="formLabel">Mail : </label>
              <input
               className="formInput"
                type="text"
                name="mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <Link className="link" to="/login">login with an existing account</Link>
            <button className="button SignIn__button" onClick={submitSignIn}>
              <Link to="/">Confirm</Link>
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default SignIn;