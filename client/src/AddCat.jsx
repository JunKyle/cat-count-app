import { Link } from "react-router-dom";
function AddCat() {
  return (
    <>
      <div className="AddCat">
        <section class="Home__section">
          <h1 className="Home__h1">Votre chat a bien été ajouté !</h1>
          <p>Vous avez cat-count : 0 chat</p>
          <p>
            Vous pouvez ajouter des détails en plus à votre cat-count
            (description, ...)
          </p>
          <form className="AddCat__form">
            <label>Description</label>
            <input type="text" name="description" />
            <button>
              <Link to="/">Valider</Link>
            </button>
            <button>
              <Link to="/">Annuler mon cat-count</Link>
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default AddCat;
