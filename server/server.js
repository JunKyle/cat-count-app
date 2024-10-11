const express = require ("express");
const mongoose = require ("mongoose");

const app = express();

const uri = "mongodb+srv://claudinemanrique:claudinemanriquecatcount@catcountcluster.34hiw.mongodb.net/?retryWrites=true&w=majority&appName=CatCountCluster";


async function connect () {
	try {
		await mongoose.connect(uri);
		console.log("Connected to MongoDb");
	} catch(error) {
		console.error(error);
	}
}

connect ();

app.get("/api", (req, res) => {
	res.json({"users": ["user1", "user2", "user3"]});
})

app.listen(5000, () => {console.log("Server started on port 5000");})