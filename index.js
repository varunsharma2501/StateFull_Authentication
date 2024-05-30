const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser=require("cookie-parser");
const userRoute=require('./routes/user');
const restrictToLoggedIn=require("./middlewares/auth");
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like styles.css)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Define a route for the home page
app.get('/', restrictToLoggedIn,(req, res) => {
    res.render('home', { name: 'Guest' }); // Pass variables to EJS template
});

app.use('/user',userRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
