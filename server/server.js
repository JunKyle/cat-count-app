const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const uri = "mongodb+srv://claudinemanrique:claudinemanriquecatcount@catcountcluster.34hiw.mongodb.net/cat_count_database?retryWrites=true&w=majority&appName=CatCountCluster";

const userSchema = new mongoose.Schema({
  	pseudo: String,
  	name: String,
  	firstName: String,
  	email: String,
  	createdAt: Date,
	password: String 
});

const User = mongoose.model('User', userSchema);

async function connect () {
	try {
		await mongoose.connect(uri);
		console.log("Connected to MongoDb mongoose");

		app.post('/users', (req, res) => {
			  const newUser = new User(req.body);
			  console.log(req.body);

			  newUser.save().then(() => {
			    res.status(201).json({ message: 'User created successfully' });
			  }).catch((error) => {
			    res.status(400).json({ error: 'Error creating user' });
			  });
		});

		app.get('/users', (req, res) => {
		  User.find().then((users) => {
		    res.json(users);
		  }).catch((error) => {
		    res.status(500).json({ error: 'Error retrieving users' });
		  });
		});

    	// post user
		app.post("/users1", async (req, res) => {
  			const { pseudo, name, firstName, email, createdAt, password } = req.query;
			console.log(req.query);
			const database = await mongoose.connection.useDb("cat_count_database",
				{
				 	useCache: true
				});
			
			await database.model('users',userSchema).insertOne({ pseudo, name, firstName, email, createdAt, password }).
			    then(users => res.json({ users })).
			    catch(err => res.status(500).json({ message: err.message }));
		})

    	// Get all users
		app.get("/users2", async (req, res) => {
			const database = await mongoose.connection.useDb("cat_count_database",
				{
				 	useCache: true
				});
			if (!database.models['users']) {
			    database.model('users', userSchema);
			}
			await database.model('users').find().
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