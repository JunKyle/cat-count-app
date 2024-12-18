import { Link, useNavigate  } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { addEncounterByUserId, getEncounter, getEncountersByUserId } from "./api/encounter";
import { getUser } from "./api/login";
import Cookies from 'universal-cookie';
import { format } from 'date-fns';

function Home() {
  const [catCountByUserId, setCatCountByUserId] = useState(0);
  const [user, setUser] = useState({});
  const [encounters, setEncounters] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const getData = useCallback(async () => {
    try {
      const result = await getUser(cookies.get("user"));
      if (result) {
        setUser(result);
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

  useEffect(() => {
      try {
        if (user?._id) {
          getEncounters();
        }
      } catch (err) {
        console(err.toString());
      }
  }, [user]);

  async function getEncounters() {
    try {
      const result = await getEncountersByUserId({id: user._id});
      setEncounters(result);
    } catch (err) {
      return err.toString();
    }
  }

  async function editEncounterClick() {
    try {
      const response = await addEncounterByUserId({
        description: "",
        date: new Date(),
        geolocalization: "",
        picture: "",
        userId: user._id
      });
      if (response && response._id) {
        navigate("/editEncounter?id=" + response._id + "&encounter=true");
      }

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
          <p className="paragraph">Your cat-count counter is : {encounters?.length > 0 ? encounters?.length : ""} </p>
          <button className="button Home__add"
                  onClick={editEncounterClick}>
              Add a cat
          </button>
          {encounters?.length > 0 && <h2 className="h2">Your last cat-counted cats are :</h2>}
          <ul className="Home__list">
            {encounters?.map((encounter, i) =>{
              return (<li key={i} className="Home__item"><a className="link" href={"/editEncounter?id=" + encounter._id}>Cat-count the {format(encounter.date, "MM/dd/yyyy") + " at " + format(encounter.date, "kk:mm")}{encounter.description ? " : " + encounter.description : ""}</a></li>);
            })}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Home;
