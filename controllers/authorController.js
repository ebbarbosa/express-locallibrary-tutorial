var Author = require('../models/author');
var Book = require('../models/book');
var async = require('async');

exports.author_list = function (req, res) {
    Author.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, results) {
            if (err) { next(err); }
            res.render('author_list', { title: 'Authors List', author_list: results });
        });
};

// Display detail page for a specific Author
exports.author_detail = function (req, res) {

    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id)
                .exec(callback)
        },
        author_books: function (callback) {
            Book.find({ 'author': req.params.id })
                .exec(callback);
        }
    }, function (err, results) {
        if (err) { next(err); }
        if (results.author == null){
            err = new Error('Author not found');
            res.status(404);
            next(err);
        }
        res.render('author_detail', { title: 'Author', author: results.author, author_books: results.author_books });
    });


};

// Display Author create form on GET
exports.author_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST
exports.author_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET
exports.author_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST
exports.author_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET
exports.author_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST
exports.author_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};