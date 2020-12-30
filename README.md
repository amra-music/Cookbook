How to cook when you don't know what to cook?
============
<img align="right" width="100" height="100" src="https://i.imgur.com/N53CTgV.png">

This repository was used to develop a web app as a project assignment for Softhouse. The technologies, features and development steps of the mentioned web app will be listed below.

As for the question of how to cook when you don't know what to cook, the Cookbook has plenty of answers. If you are tired of old recipe meals, want something new, or have no idea what to cook, visit [this link](https://cookbook-softhouse.netlify.app).

## Technologies

<img width="40%" src="https://i.imgur.com/ori0ahD.png">

# Getting Started

- Open terminal

- Change the current working directory to the location where you want the cloned directory
- Type `git clone https://github.com/amra-music/Cookbook.git`
- Change the current working directory to the Cookbook folder
- Add a `.env.local` file, and put the following environment variable: REACT_APP_BACKEND_URL=http://localhost:8080
- Type `npm install` for installing all dependencies 
- Type `npm start` for starting frontend
- For starting backend open a new terminal window, change the current working directory to the Cookbook/backend folder
- Add a `.env` file, and put the following environment variable: SECRET_KEY=yourSecretKey
- Type `npm install` for installing all backend dependencies 
- Type `node index.js` or `nodemon index.js` ([nodemon](https://www.npmjs.com/package/nodemon)) for starting backend
- Open your Browser and into your address bar type `localhost:3000`

### Deployment

<img align="right" width="160" src="https://i.imgur.com/aBqgzsm.png">

Frontend link: https://cookbook-softhouse.netlify.app

Backend link: https://cookbook-softhouse-app.herokuapp.com

The reason I decided to deploy frontend on Netlify and backend on Heroku is because with the free Heroku account, deployed apps [sleep](https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping) after 30 minutes of inactivity. If I deployed frontend on Heroku as well, it would take quite some time before the app is visible and nothing would be loaded for a while.

## Development steps and features
###### Day 1
- API research
   - Used API : https://www.themealdb.com/api.php
- App structure planning
- Designing functionalities
- React app created
###### Day 2
- App structure created
- Created components: Header, Footer, Meal
###### Day 3
- Random meal and watch on Youtube features implemented
- Meal page added
- Frontend deployed
###### Day 4
- Save meal feature implemented
- Get saved meals feature implemented
- Exporting file as .json
- Created components: BasicMeal, Categories
- My meals and Category pages added
- Go back feature implemented
###### Day 5
- Search feature implemented
- Page not found added
###### Day 6
- Edit meal feature implemented
- Login routes implemented on backend
   - JWT used for authentication
###### Day 7
- Login feature implemented
- Delete saved meal feature implemented
- Work on responsiveness
- Backend deployed

## Login information 
**username** : cookbook

**password** : #softhouseApp


