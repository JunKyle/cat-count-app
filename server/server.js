const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const uri = "mongodb+srv://claudinemanrique:claudinemanriquecatcount@catcountcluster.34hiw.mongodb.net/cat_count_database?retryWrites=true&w=majority&appName=CatCountCluster";

const userSchema = new mongoose.Schema({
  	pseudo: String,
  	mail: String,
  	createdAt: Date,
	password: String,
	nbCatCount: Number
});

const User = mongoose.model('User', userSchema);

async function connect () {
	try {
		await mongoose.connect(uri);
		console.log("Connected to MongoDb mongoose");

		app.post('/api/signup', async (req, res) => {
			  const newUser = new User(req.body);

			  const user = await newUser.save();

			  if (user) {
			    res.status(201).json({ 
		    		message: 'User created successfully',
			   		user: user 
			   	});
			  } else {
			    res.status(400).json({ error: 'Error creating user' });
			  }
		});

		app.get('/api/login', async (req, res) => {
		  User.find({ "pseudo": req.query.pseudo, "password": req.query.password}).select({ "pseudo": req.query.pseudo, "password": req.query.password}).then((user) => {
		    res.json(user);
		  }).catch((error) => {
		    res.status(500).json({ error: 'Error retrieving user' });
		  });
		});

		app.get('/api/getuser', (req, res) => {
		  User.findById(req.query.id).then((user) => {
		    res.json(user);
		  }).catch((error) => {
		    res.status(500).json({ error: 'Error retrieving user' });
		  });
		});	

	} catch(error) {
		console.error(error);
	}
}

connect ();



app.listen(5000, () => {console.log("Server started on port 5000");})