import axios from "axios";

export async function addEncounterByUserId(data) {
	return await axios
		.post("/api/addencounter", data)
		.then((response) => {
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}

export async function addEncounterDescriptionByEncounterId(data) {
	return await axios
		.post("/api/adddescription", data)
		.then((response) => {
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}

export async function cancelEncounterByEncounterId(data) {
	return await axios
		.post("/api/cancelEncounter", data)
		.then((response) => {
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}
