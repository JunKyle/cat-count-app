import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import {
  addEncounterDescriptionByEncounterId,
  cancelEncounterByEncounterId,
  getEncounterByEncounterId
} from "./api/encounter";
function EditEncounter() {
  const [catCountByUserId, setCatCountByUserId] = useState(0);
  const [description, setDescription] = useState("");
  const [encounter, setEncounter] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idParam = queryParams.get('id');
  const firstTimeEncounter = queryParams.get("encounter");

  useEffect(() => {
    if (!idParam || idParam === "" || idParam === null) {
      navigate("/");
    }
  }, []);

  const getEncounter = useCallback(async () => {
    try {
      if (idParam) {
        const result = await getEncounterByEncounterId({id: idParam});
        if (result) {
          setEncounter(result);
          setDescription(result.description);
        }
      }
    } catch (err) {
      return err.toString();
    }
  });

  useEffect(() => {    
    try {
      getEncounter();
    } catch (err) {
      return err.toString();
    }
  }, []);

  async function submitCatCountDescription() {
    console.log("description", description);
    try {
      const result = await addEncounterDescriptionByEncounterId({
        description: description,
        id: idParam,
      });
    } catch (err) {
      return err.toString();
    }
  }

  async function cancelCatCount() {
    try {
      await cancelEncounterByEncounterId({
        id: idParam
      });
    } catch (err) {
      return err.toString();
    }
  }
  return (
    <>
      <div className="EditEncounter">
        <section className="section">
          <h1 className="h1">{firstTimeEncounter ? "Your cat has been succesfully added !" : "Edit your encounter with this cat"}</h1>
          <p>
            You can add details with your cat-count
          </p>
          {encounter && encounter.date && <p>Cat encountered the {encounter.date}</p>}
          <form className="EditEncounter__form">
            <label>Description : </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="button EditEncounter__button" onClick={submitCatCountDescription}>
              Confirm
            </button>
            <button className="button button--red EditEncounter__button" onClick={cancelCatCount}>
              Cancel my cat-count
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default EditEncounter;
