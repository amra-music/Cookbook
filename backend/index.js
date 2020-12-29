const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const port = 8080;

function verify(req, res) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    });
}

app.get('/get_my_meals', (req, res) => {
    verify(req, res);
    fs.readFile('meals.json', (err, data) => {
        if (err) { throw err; }
        const meals = JSON.parse(data);
        res.send(meals);
    })
});

app.post('/post_meal', (req, res) => {
    verify(req, res);
    let meals;
    fs.readFile('meals.json', (err, data) => {
        if (err) { throw err; }
        let existingMeals = JSON.parse(data)
        const found = existingMeals.some(meal => (meal.idMeal === req.body.idMeal && meal.strMeal === req.body.strMeal));
        if (!found) {
            meals = [req.body, ...existingMeals]
            fs.writeFile('meals.json', JSON.stringify(meals, null, 2), (err) => {
                if (err) throw err;
                res.send('Meal successfully saved.');
            })
        } else {
            res.send('This meal was added before.');
        }
    });
});

app.delete('/delete_meal', function (req, res) {
    verify(req, res);
    fs.readFile('meals.json', (err, data) => {
        if (err) { throw err; }
        let existingMeals = JSON.parse(data);
        const found = existingMeals.find(meal => (meal.strMeal === req.body.strMeal));
        const newMeals = existingMeals.filter(meal => (meal.strMeal !== req.body.strMeal));
        if (found !== undefined) {
            fs.writeFile('meals.json', JSON.stringify(newMeals, null, 2), (err) => {
                if (err) throw err;
                res.send('Meal successfully deleted.');
            })
        } else {
            res.send('This meal does not exist.');
        }
    });
})

app.post('/auth/login', (req, res) => {

    if (req.body.username !== 'cookbook' || req.body.password !== '#softhouseApp')
        return res.status(401).send({ auth: false, token: null, message: 'The username or password is incorrect.' })

    var token = jwt.sign({ username: req.body.username }, process.env.TOKEN_SECRET, {
        expiresIn: '365d'
    })

    res.status(200).send({ auth: true, token: token, message: 'send', username: req.body.username });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
