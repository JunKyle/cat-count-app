const express = require ("express");
const mongoose = require ("mongoose");

const app = express();

const uri = "mongodb+srv://claudinemanrique:claudinemanriquecatcount@catcountcluster.34hiw.mongodb.net/?retryWrites=true&w=majority&appName=CatCountCluster";


async function connect () {
	try {
		await mongoose.connect(uri);
		console.log("Connected to MongoDb mongoose");

    	
    	// Get all users
		app.get("/users", async (req, res) => {
			const database = await mongoose.connection.useDb("sample_mflix",
				{
				 	useCache: true
				});
			if (!database.models['users']) {
			    database.model('users', mongoose.Schema({ 
			    	_id: Object, 
			    	name: String,
			    	email: String,
			    	password: String }));
			}
			database.model('users').find().
			    then(users => res.json({ users })).
			    catch(err => res.status(500).json({ message: err.message }));
		})

		// Get all comments
		app.get("/comments", async (req, res) => {
			const database = await mongoose.connection.useDb("sample_mflix",
				{
				 	useCache: true
				});
			if (!database.models['comments']) {
			    database.model('comments', mongoose.Schema({ 
			    	_id: Object, 
			    	name: String,
			    	email: Array,
			    	movie_id: Object,
			    	cast: Array,
			    	date: Date }));
			}
			database.model('comments').find().
			    then(comments => res.json({ comments })).
			    catch(err => res.status(500).json({ message: err.message }));
		})

		// Get all movies
		app.get("/movies", async (req, res) => {
			const database = await mongoose.connection.useDb("sample_mflix",
				{
				 	useCache: true
				});
			if (!database.models['movies']) {
			    database.model('movies', mongoose.Schema({ 
			    	_id: Object, 
			    	plot: String,
			    	genres: Array,
			    	runtime: Number,
			    	cast: Array,
			    	poster: String,
			    	title: String,
			    	fullplot: String,
			    	languages: Array,
			    	released: Date,
			    	directors: Array,
			    	rated: String,
			    	awards: Object,
			    	lastupdated: String,
			    	year: Number,
			    	imdb: Object,
			    	countries: Array,
			    	type: String,
			    	tomatoes: Object,
			    	num_mflix_comments: Number }));
			}
			database.model('movies').find().
			    then(movies => res.json({ movies })).
			    catch(err => res.status(500).json({ message: err.message }));
		})

	} catch(error) {
		console.error(error);
	}
}

connect ();



app.listen(5000, () => {console.log("Server started on port 5000");})