const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js');


// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://eltestador:3smuyr4pido@nodetutorial.nhazv.mongodb.net/node-tutorial?retryWrites=true&w=majority&appName=nodetutorial';
mongoose.connect(dbURI)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middlewares and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// blog routes
app.use('/blogs', blogRoutes); // now we set up the blogRoutes here, like we're saying "use all the routes defined in blogRoutes and apply them on app"


// 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Error!' });
})

