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
        <section className="AddCat__section">
          <h1 className="AddCat__h1">Your cat has been succesfully added !</h1>
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
