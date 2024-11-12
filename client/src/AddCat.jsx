import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  addEncounterDescriptionByEncounterId,
  cancelEncounterByEncounterId,
} from "./api/encounter";
function AddCat() {
  const [catCountByUserId, setCatCountByUserId] = useState(0);
  const [description, setDescription] = useState("");

  async function submitCatCountDescription() {
    console.log("description", description);
    try {
      await addEncounterDescriptionByEncounterId({
        description: description,
        userId: "0",
      });
    } catch (err) {
      return err.toString();
    }
  }
  async function cancelCatCount() {
    try {
      await cancelEncounterByEncounterId({
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
        <section className="section">
          <h1 className="h1">Your cat has been succesfully added !</h1>
          <p>Your cat-count total is: {catCountByUserId}</p>
          <p>
            You can add details with your cat-count
          </p>
          <form className="AddCat__form">
            <label>Description : </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="button AddCat__button" onClick={submitCatCountDescription}>
              <Link to="/">Confirm</Link>
            </button>
            <button className="button button--red AddCat__button" onClick={cancelCatCount}>
              <Link to="/">Cancel my cat-count</Link>
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default AddCat;
