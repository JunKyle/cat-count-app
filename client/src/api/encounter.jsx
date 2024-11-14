import axios from "axios";

export async function addEncounterByUserId(data) {
	return await axios
		.post("/api/addencounter", data)
		.then((response) => {
			if (response.status === 201 && response.data?.encounter) {
				return response.data.encounter;
			}
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}

export async function getEncountersByUserId(data) {
	return await axios
		.get("/api/getencounterbyuserid?userId=" + data.id)
		.then((response) => {
			if (response.status === 200 && response.data) {
				return response.data;
			}
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}

export async function getEncounterByEncounterId(data) {
	return await axios
		.get("/api/getencounter?id=" + data.id)
		.then((response) => {
			if (response.status === 200 && response.data && response.data[0]) {
				return response.data[0];
			}
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}

export async function addEncounterDescriptionByEncounterId(data) {
	return await axios
		.post("/api/updatedescription", data)
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
		.post("/api/deleteencounter", data)
		.then((response) => {
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}
