import axios from "axios";
import Cookies from 'universal-cookie';

export async function getuser(data) {
	return await axios
		.get("/api/getuser?id=" + data)
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

export async function login(data) {
	return await axios
		.get("/api/login?pseudo=" + data.pseudo + "&password=" + data.password)
		.then((response) => {
			if (response.status === 200 && response.data.length) {
				const cookies = new Cookies();
				if (!cookies.get('user')) {					
					cookies.set('user', response.data[0]._id, { path: '/' });
				}
			}
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}

export async function signup(data) {
	return await axios
		.post("/api/signup", data)
		.then((response) => {
			console.log(response);
			if (response.status === 201 && response.data.user) {
				const cookies = new Cookies();
				if (!cookies.get('user')) {					
					cookies.set('user', response.data.user._id, { path: '/' });
				}
			}
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
}