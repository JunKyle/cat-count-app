function AddCat() {
  return (
    <>
      <div className="AddCat">
        <header>
          <img
            class="Home__image"
            src="static/images/cat-count-header.jpg"
            alt="cat-count-header"
          />
        </header>
        <section class="Home__section">
          <h1 class="Home__h1">Votre chat a bien été ajouté !</h1>
          <p>Vous avez cat-count : 0 chat</p>
          <p>
            Vous pouvez ajouter des détails en plus à votre cat-count
            (description, ...)
          </p>
          <form class="AddCat__form">
            <label>Description</label>
            <input type="text" name="description" />
            <button class="confirm">
              <a href="./index.html">Valider</a>
            </button>
          </form>
          <button class="cancel">
            <a href="./index.html">Annuler mon cat-count</a>
          </button>
        </section>
      </div>
    </>
  );
}

export default AddCat;
