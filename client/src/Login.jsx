import "./App.scss";
import { useState, useEffect } from "react";
import { login } from "./api/login";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Cookies from 'universal-cookie';

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get("user")) {
      navigate('/');
    }
  }, []);

  async function submitLogin() {
    try {
      const response = await login({
        pseudo: user,
        password: password
      });
      if (response) {
        navigate('/');
      }
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
            <Link className="link" to="/signup">create an account</Link>
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
