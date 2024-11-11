import axios from "axios";

export async function login(data) {
	return await axios
		.post("/api/login")
		.then((response) => {
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}
export async function signin(data) {
	return await axios
		.post("/api/signin")
		.then((response) => {
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}