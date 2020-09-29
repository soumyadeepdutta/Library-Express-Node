const Author = require('../models/author');
const async = require('async');
const Book = require('../models/book');

exports.author_list = function(req, res){
    Author.find()
    .populate('author')
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });
};

exports.author_detail = function(req, res, next){
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
              .exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    });

};

exports.author_create_get = function(req, res){
    res.send("author_create_get not implemented");
};

exports.author_create_post = function(req, res){
    res.send("author_create_post not implemented");
};

exports.author_delete_get = function(req, res){
    res.send("author_delete_get not implemented");
};

exports.author_delete_post = function(req, res){
    res.send("author_delete_post not implemented");
};

exports.author_update_get = function(req, res){
    res.send("author_update_get not implemented");
};
exports.author_update_post = function(req, res){
    res.send("author_update_post not implemented");
};