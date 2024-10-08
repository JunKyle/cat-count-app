import "./App.scss";

function App() {
  return (
    <>
      <div className="App">
        <header>
          <img
            className="Home__image"
            src="/images/cat-count-header.jpg"
            alt="cat-count-header"
          />
        </header>
        <section className="Home__section">
          <h1 className="Home__h1">
            Hello and welcome to the Cat Count Game App
          </h1>
          <p>Your cat-count counter is : 0 cat</p>
          <h2>Your last cat-counted cats are :</h2>
          <ul className="Home__list">
            <li className="Home__item">Cat-count the</li>
          </ul>
          <button className="confirm">
            <a href="./addCat.html">Add a cat</a>
          </button>
        </section>
      </div>
    </>
  );
}

export default App;
