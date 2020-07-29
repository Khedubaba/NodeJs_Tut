const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blog');

//express app
const app = express();

//Connect to MongoDB
const dbURI = '<add your mongo db url here>';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs'); 

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded( {extended: true}));
app.use(morgan('dev'));

//status consoles
// app.use((req, res, next) => {
//     console.log('\nnew request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });


//Below are all Routes and there handlers

//basic routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post('/blogs', (req, res) => {
    console.log(req.body);
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'});
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
}); 