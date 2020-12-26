const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8080;

app.get('/get_my_meals', (req, res) => {
    fs.readFile('meals.json', (err, data) => {
        if (err) { throw err; }
        const meals = JSON.parse(data);
        res.send(meals);
    })
});

app.post('/post_meal', (req, res) => {
    let meals;
    fs.readFile('meals.json', (err, data) => {
        if (err) { throw err; }
        let existingMeals = JSON.parse(data)
        const found = existingMeals.some(meal => meal.idMeal === req.body.idMeal);
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
