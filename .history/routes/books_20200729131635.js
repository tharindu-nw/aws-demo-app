const express = require('express')
const router = express.router()

//get single book route
app.get("/book/:id", (req, res) => {
	Book.findById(req.params.id, (err, book) => {
		if (err) {
			console.log(err);
		} else {
			switch (book.status) {
				case "WR":
					book.status = "Want to Read";
					break;
				case "CR":
					book.status = "Currently Reading";
					break;
				case "HR":
					book.status = "Have Read";
					break;
				default:
					book.status = "Status not Recorded";
					break;
			}
			res.render("book", {
				book: book,
			});
		}
	});
});

//edit book route
app.get("/books/edit/:id", (req, res) => {
	Book.findById(req.params.id, (err, book) => {
		res.render("edit_book", {
			page_title: "Edit Book",
			book: book,
		});
	});
});

//edit book post route
app.post("/books/edit/:id", (req, res) => {
	let book = {};
	book.title = req.body.title;
	book.author = req.body.author;
	book.status = req.body.status;

	let query = { _id: req.params.id };
	Book.update(query, book, (err) => {
		if (err) {
			console.log(err);
			return;
		} else {
			req.flash("success", "Book Edited");
			res.redirect("/");
		}
	});
});

//Add books route
app.get("/books/add", (req, res) =>
	res.render("add", {
		page_title: "Add Books",
	})
);

//add books post route
app.post(
	"/books/add",
	[
		check('title').isLength({min:1}).trim().withMessage('Title required'),
  		check('author').isLength({min:1}).trim().withMessage('Author required'),
  		check('status').isLength({min:1}).trim().withMessage('Status required')
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.render("add", {
				page_title: "Add Books",
				errors: errors.mapped(),
			});
		} else {
			let book = new Book();
			book.title = req.body.title;
			book.author = req.body.author;
			book.status = req.body.status;

			book.save((err) => {
				if (err) {
					console.log(err);
					return;
				} else {
					req.flash("success", "Book Added");
					res.redirect("/");
				}
			});
		}
	}
);

//remove books route
app.delete("/books/:id", (req, res) => {
	let query = { _id: req.params.id };
	Book.deleteOne(query, (err) => {
		if (err) {
			console.log(err);
			return;
		} else {
			res.send("Success");
		}
	});
});
