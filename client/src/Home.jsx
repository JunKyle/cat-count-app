import { Link, useNavigate  } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { updateCatCountByUserId } from "./api/catCountByUserId";
function Home() {
  const [catCountByUserId, setCatCountByUserId] = useState(0);  
  const navigate = useNavigate();

  useEffect(() => {
    if (true) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    axios
      .get("/api/getCatCountByUserId")
      .then((response) => {
        setCatCountByUserId(0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleClick() {
    updateCatCountByUserId({
      catCount: catCountByUserId + 1,
      date: new Date(),
      userId: "0",
    });
  }

  return (
    <>
      <div className="Home">
        <Header />
        <section className="section">
          <h1 className="h1">
            Welcome to the Cat Count App
          </h1>
          <p>Your cat-count counter is : {catCountByUserId}</p>
          <button className="button Home__add">
            <Link
              data-testid="home-validate-link"
              to="/addCat"
              onClick={handleClick}
            >
              Add a cat
            </Link>
          </button>
          <h2 className="h2">Your last cat-counted cats are :</h2>
          <ul className="Home__list">
            <li className="Home__item">Cat-count the</li>
          </ul>
        </section>
      </div>
    </>
  );
}

export default Home;
