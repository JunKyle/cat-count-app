import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  updateCatCountDescriptionByUserId,
  cancelCatCountByUserId,
} from "./catCountByUserId";
function AddCat() {
  const [catCountByUserId, setCatCountByUserId] = useState(0);
  const [description, setDescription] = useState("");

  async function submitCatCountDescription(formData) {
    console.log("description", description);
    try {
      await updateCatCountDescriptionByUserId({
        description: description,
        userId: "0",
      });
    } catch (err) {
      return err.toString();
    }
  }
  async function cancelCatCount(formData) {
    try {
      await cancelCatCountByUserId({
        userId: "0",
      });
    } catch (err) {
      return err.toString();
    }
  }

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
  return (
    <>
      <div className="AddCat">
        <section className="Home__section">
          <h1 className="Home__h1">Votre chat a bien été ajouté !</h1>
          <p>Vous avez cat-count : {catCountByUserId} chat</p>
          <p>
            Vous pouvez ajouter des détails en plus à votre cat-count
            (description, ...)
          </p>
          <form className="AddCat__form">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={submitCatCountDescription}>
              <Link to="/">Valider</Link>
            </button>
            <button onClick={cancelCatCount}>
              <Link to="/">Annuler mon cat-count</Link>
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default AddCat;
