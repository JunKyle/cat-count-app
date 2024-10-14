import axios from "axios";

export async function updateCatCountByUserId(data) {
	return await axios
		.post("/api/updateCatCountByUserId?" + JSON.stringify(data))
		.then((response) => {
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}

export async function updateCatCountDescriptionByUserId(data) {
	return await axios
		.post("/api/updateCatCountDescriptionByUserId?" + JSON.stringify(data))
		.then((response) => {
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}

export async function cancelCatCountByUserId(data) {
	return await axios
		.post("/api/cancelCatCountByUserId?" + JSON.stringify(data))
		.then((response) => {
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}
