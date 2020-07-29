const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blog');

//express app
const app = express();

//Connect to MongoDB
// const dbURI = 'mongodb+srv://khedu:hellokhedu123@nodejstut.r3c79.mongodb.net/node-tuts?retryWrites=true&w=majority';
const dbURI = 'mongodb://khedu:hellokhedu123@nodejstut-shard-00-00.r3c79.mongodb.net:27017,nodejstut-shard-00-01.r3c79.mongodb.net:27017,nodejstut-shard-00-02.r3c79.mongodb.net:27017/node-tuts?ssl=true&replicaSet=atlas-kgdhdv-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs'); 

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog 2',
        body: 'more about my new blog 2'
    });

    blog.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('5f20fb5991141a34c3ff3e4a')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.use((req, res, next) => {
    console.log('\nnew request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'},

    ];
    
    res.render('index', {title: 'Home', blogs});
});

// app.use((req, res, next) => {
//     console.log('In the next Middleware:');
//     next();
// });

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//handler for creat blog page view
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'});
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
}); 