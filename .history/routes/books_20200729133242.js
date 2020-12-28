const express = require('express')
const router = express.Router()
const { body, validationResult } = require("express-validator");

//book model
let Book = require("../models/book");

//get single book route
router.get("/:id", (req, res) => {
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
router.get("/edit/:id", (req, res) => {
	Book.findById(req.params.id, (err, book) => {
		res.render("edit_book", {
			page_title: "Edit Book",
			book: book,
		});
	});
});

//edit book post route
router.post("/edit/:id", (req, res) => {
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

//remove books route
router.delete("/:id", (req, res) => {
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

module.exports = router