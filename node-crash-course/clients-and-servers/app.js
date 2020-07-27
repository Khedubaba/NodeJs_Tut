const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs'); 

//listen for request
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p>Home Page</p>');
    // res.sendFile('./views/index.html', {root: __dirname});

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'},

    ];
    
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>');
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: 'About'});
});

//handler for create view
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'});
})

//redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

//404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', {title: '404'});

}); 