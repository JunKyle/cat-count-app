import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";
function Home() {
  const [totalCatCount, setTotalCatCount] = useState(0);

  useEffect(() => {
    axios
      .get("api/getTotalCatCount")
      .then((response) => {
        setTotalCatCount(0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleClick() {
    setTotalCatCount(totalCatCount + 1);
  }

  return (
    <>
      <div className="Home">
        <Header />
        <section className="Home__section">
          <h1 className="Home__h1">
            Hello and welcome to the Cat Count Game App
          </h1>
          <p>Your cat-count counter is : {totalCatCount} cat</p>
          <h2>Your last cat-counted cats are :</h2>
          <ul className="Home__list">
            <li className="Home__item">Cat-count the</li>
          </ul>
          <button onClick={handleClick}>
            <Link data-testid="home-validate-link" to="/addCat">
              Valider
            </Link>
          </button>
        </section>
      </div>
    </>
  );
}

export default Home;
