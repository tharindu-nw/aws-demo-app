const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

import config from './config';

//connect the database
mongoose.set("useUnifiedTopology", true);
mongoose.connect(, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));

//check for db errors
db.on("error", (err) => console.log(err));

//Init app
const app = express();
const port = 3000;

let Book = require("./models/book");

//Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// set the static folder
app.use(express.static(path.join(__dirname, "public")));

//express-session middleware
app.set("trust proxy", 1); // trust first proxy
app.use(
	session({
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: true,
	})
);

//express messages middleware
app.use(require("connect-flash")());
app.use(function (req, res, next) {
	res.locals.messages = require("express-messages")(req, res);
	next();
});

//Home route
app.get("/", (req, res) => {
	Book.find({}, (err, books) => {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {
				page_title: "Books",
				books: books,
			});
		}
	});
});

let books = require('./routes/books')
app.use('/books', books)

//Start server
app.listen(port, () =>
	console.log(`Server started on http://localhost:${port}`)
);
