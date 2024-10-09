import { Link } from "react-router-dom";
import Header from "./Header";
function Home() {
  return (
    <>
      <div className="Home">
        <Header />
        <section className="Home__section">
          <h1 className="Home__h1">
            Hello and welcome to the Cat Count Game App
          </h1>
          <p>Your cat-count counter is : 0 cat</p>
          <h2>Your last cat-counted cats are :</h2>
          <ul className="Home__list">
            <li className="Home__item">Cat-count the</li>
          </ul>
          <button>
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
