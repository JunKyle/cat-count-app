import "./App.scss";
import { useState, useEffect } from "react";
import { signup } from "./api/login";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Cookies from 'universal-cookie';

function SignUp() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

 useEffect(() => {
    if (cookies.get("user")) {
      navigate('/');
    }
  }, []);

  async function submitSignUp() {
    try {
      await signup({
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
      <div className="SignUp">
        <Header />
        <section className="section">
          <h1 className="h1">
            Create an account
          </h1>
          <form className="SignUp__form">
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
            <button className="button SignUp__button" onClick={submitSignUp}>
              <Link to="/">Confirm</Link>
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default SignUp;