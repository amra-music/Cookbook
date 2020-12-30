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

const port = process.env.PORT || 8080;

fs.readFile('meals.json', (err) => {
    if (err) {
        fs.writeFile('meals.json', '[]', () => {
            console.log('New file created');
        })
    }
})

function verify(req, res) {
    const token = req.headers['x-access-token'];
    if (!token)
        return false;
    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
        if (err)
            return false;
    });
    return true;
}

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/get_my_meals', (req, res) => {
    if (!verify(req, res))
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    fs.readFile('meals.json', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Error while reading meals.json' });
        }
        const meals = JSON.parse(data);
        res.send(meals);
    })
});

app.post('/post_meal', (req, res) => {
    if (!verify(req, res))
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    let meals;
    fs.readFile('meals.json', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Error while reading meals.json' });
        }
        let existingMeals = JSON.parse(data)
        const found = existingMeals.some(meal => (meal.idMeal === req.body.idMeal && meal.strMeal === req.body.strMeal));
        if (!found) {
            meals = [req.body, ...existingMeals]
            fs.writeFile('meals.json', JSON.stringify(meals, null, 2), (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Error while writting to meals.json' });
                }
                return res.send('Meal successfully saved.');
            })
        } else {
            res.send('This meal was added before.');
        }
    });
});

app.delete('/delete_meal', function (req, res) {
    if (!verify(req, res))
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    fs.readFile('meals.json', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Error while reading meals.json' });
        }
        let existingMeals = JSON.parse(data);
        const found = existingMeals.some(meal => (meal.strMeal === req.body.strMeal));
        if (found) {
            const newMeals = existingMeals.filter(meal => (meal.strMeal !== req.body.strMeal));
            fs.writeFile('meals.json', JSON.stringify(newMeals, null, 2), (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Error while writting to meals.json' });
                }
                return res.send('Meal successfully deleted.');
            })
        } else {
            res.send('This meal does not exist.');
        }
    });
})

app.post('/auth/login', (req, res) => {

    if (req.body.username !== 'cookbook' || req.body.password !== '#softhouseApp')
        return res.status(401).send({ auth: false, token: null, message: 'The username or password is incorrect.' });

    const token = jwt.sign({ username: req.body.username }, process.env.TOKEN_SECRET, {
        expiresIn: '365d'
    })

    res.status(200).send({ auth: true, token: token, message: 'send', username: req.body.username });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
