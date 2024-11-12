import { Link, useNavigate  } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { addEncounterByUserId, getencounter } from "./api/encounter";
import { getuser } from "./api/login";
import Cookies from 'universal-cookie';

function Home() {
  const [catCountByUserId, setCatCountByUserId] = useState(0);
  const [user, setUser] = useState({});
  const [encounters, setEncounters] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const getData = useCallback(async () => {
    try {
      const result = await getuser(cookies.get("user"));
      setUser(result);
      console.log("getdata", user)
      if (user._id) {
        getEncounters();
      }
    } catch (err) {
      return err.toString();
    }
  });

  useEffect(() => {
    if (!cookies.get("user")) {
      navigate('/login');
    } else {
      try {
        getData();
      } catch (err) {
        console(err.toString());
      }

    }
  }, []);

  async function getEncounters() {
    try {
      const result = await getencounter({id: user._id});
      setEncounters(result);
    } catch (err) {
      return err.toString();
    }
  }

  useEffect(() => {
      try {
        if (user._id) {
          getEncounters();
        }
      } catch (err) {
        console(err.toString());
      }
  }, [user]);

  async function handleClick() {
    try {
      await addEncounterByUserId({
        description: "",
        date: new Date(),
        geolocalization: "",
        picture: "",
        userId: user._id
      });
    } catch (err) {
      return err.toString();
    }
  }

  return (
    <>
      <div className="Home">
        <Header />
        <section className="section">
          <h1 className="h1">
            Welcome {user?.pseudo} to the Cat Count App
          </h1>
          <p>Your cat-count counter is : {encounters?.length ? encounters?.length : 0} </p>
          <button className="button Home__add">
            <Link
              data-testid="home-validate-link"
              to="/addCat"
              onClick={handleClick}
            >
              Add a cat
            </Link>
          </button>
          {encounters?.length && <h2 className="h2">Your last cat-counted cats are :</h2>}
          <ul className="Home__list">
            {encounters.map((encounter, i) =>{
              return (<li key={i} className="Home__item">Cat-count the {encounter.date} {encounter.description}</li>);
            })}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Home;
