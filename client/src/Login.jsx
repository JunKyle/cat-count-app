import "./App.scss";
import { useState, useEffect } from "react";
import { login } from "./api/login";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Cookies from 'universal-cookie';

// Validation logic for user format
const isUserValid = (user) => {
  const userPattern = /^[a-zA-Z0-9]{3,16}$/;
  return userPattern.test(user);
};

// Validation logic for password format
const isPasswordValid = (password) => {
  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,10}$/;
  return passwordPattern.test(password);
};

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get("user")) {
      navigate('/');
    }
  }, []);

  const handleUserChange = (e) => {
    const value = e.target.value;
    setUser(value);

    if (!isUserValid(value)) {
      setError('Invalid user format.');
    } else {
      setError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    console.log("value password ", value)

    if (!isPasswordValid(value)) {
      setError('Invalid password format.');
    } else {
      setError('');
    }
  };

  async function submitLogin(e) {
    e.preventDefault();
    if (!error) {
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
            {error && <p className="paragraph paragraph--error">{error}</p>}
            <div className="formDiv">
              <label className="formLabel">User : </label>
              <input
               className="formInput"
                type="text"
                name="user"
                value={user}
                onChange={(e) => handleUserChange(e)}
                placeholder="type your username"
                autoComplete="off"
              />
            </div>
            <div className="formDiv">
              <label className="formLabel">Password : </label>
              <input
               className="formInput"
                type="password"
                name="password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                placeholder="type your password"
                autoComplete="off"
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
