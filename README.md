# maths300-app

## Project Background
The Australian Association of Mathematics Teachers (AAMT) maintain a resource for Australian schools known as Maths300, containing a collection of 194 lessons, 81 of which have accompanying software activities. With the proliferation of Chromebooks amongst students, along with BYOD (bring your own device) schools, the AAMT is developing a web application to provide convenient software support to the existing lessons. As the new software targets a range of devices (computer, laptop, tablet and mobile), it should be responsive to different sizes of screens.

## Current Progress
* All 81 lessons have been completed
* test env: https://test.lessons.maths300.com
* production env: https://lessons.maths300.com

## Goal
* Fix issues posted on GitHub
* Polish existing lessons as required (including improving responsive design)
* Integrate all lessons into the project

## Intro to project
This project is created by Vue CLI and uses the following technologies.
* Javascript(ES6)
* Vue
* Vue Router
* Bootstrap

Vue.js is one of the most popular JavaScript frameworks for building highly responsive single page applications. Its 'components' system makes team work smooth and organized. Vue CLI helps us build up a skeleton from which we can effortlessly create a complete web app while organising our code efficiently. It also has friendly learning curve compared to other JavaScript frameworks or libraries, but developers from other tech stacks are expected to spend some time learning its syntax.

## Development Guidelines
These guidelines help new developers better understand the project structure and work together under same standards and specifications.

### Project Structure
* `/dist` - Include files created by running `npm run build` for production deployment
* `/node_modules` - Include all libraries or dependencies used in the project.
* `/public` - The public folder that can be access by URL
* `/src` - IMPORTANT! - All source code which makes application work. Development work will be done under this folder.
* `.gitignore` - List the files or folders that should be ignored by git.
* `babel.config.js` - Babel config files. It is automatically created by Vue CLI.
* `package.json` - Specifies the app info, dependencies, scripts and other configs used in the project.
* `package-lock.json` - Specifies the operations that node_modules or package.json is changed.
* `README.md` - This file, used as document and reference.

### /src
* `/assets` - The images used in the app should be put here.
* `App.vue` - It is the root component or entry of the app.
* `main.js` - The bootstrap script. Do NOT edit it if you are not sure.
* `router.js` - Defines app router.
* `/components` - All components/pages/lessons are put here.

### Guidelines
* Each lesson has its own folder, it is under `/src/components/lessons/<lesson name>`. Each lesson is independent so each developer can work under their own lesson's folder. Use App.vue as the home page for the lesson.
* Under a lesson, there are a couple of sub-lessons. Each sub-lesson has its own component.
* Make sure to use `<style scoped> ... </style>` to write CSS code for a particular component.
* If you want to write global CSS, go to `/src/App.vue`.
* Each lesson has its own route. Add a new route in `/src/router.js` for your new lesson.
* In order to navigate to lessons on homepage, edit `src/components/Home.vue` and add a record into `lessons` array.
* All images are put under `/assets` folder. If the image is used across the whole web app, it should be put under its root directory. If the image is only used in a particular lesson, you should create a sub-directory with lesson's name and put it under this directory.
* Under lesson folder: you can write `utils.js` to put functions which are repeatedly used in the lesson.
* Under lesson folder: Write `readme.md` to put your development ideas, notes, functions for future reference.
* This project uses [Bootstrap4](https://getbootstrap.com/docs/4.3/getting-started/introduction/) as UI framework, so feel free to use Bootstrap class but be sure to make your style identical with the rest part of app.
* This project uses [fontawesome](https://fontawesome.com/icons?d=gallery), so feel free to use the icon from fontawesome if necessary.
* Be sure to make new lesson's menu style identical to the existing lessons. You can copy `/src/components/lessons/<lesson name>/App.vue` and paste to your file. Only make necessary changes to options, titles and some wording.
* Write comments whenever possible; write comments for each function in `utils.js`
* Use self-explanatory name and camel case to name variables and arguments.

### Responsive Design
For responsive design, please follow the guidelines below:
* Use Desktop First principle.
* It is better to use Bootstrap grid system to make layout. How - https://getbootstrap.com/docs/4.1/layout/grid/
* If you write your own media query, be sure to follow the Bootstrap responsive breakpoints. That is: 1200px - extra large, 992px - large, 768px - medium, 576px - small. You are allowed to add one more tier for extra small, which is 425px.
* Make plans about how to make layout in different screen sizes.  
* Normally, if there are two horizontal columns, they should be put vertically under medium or smaller(<=576px) screen size.
* Use Chrome's inspect tool to check the layout under different screen sizes.

## Project setup
Make sure Node and NPM are installed on computer. If not, go to [Node](https://nodejs.org/en/) to install. NPM is installed with Node.

## Install Packages
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Deployment
```
# create a branch from master branch
# note the naming convention(timestamp ddMMYYYY) below
git branch release_18102019
git checkout release_18102019

# make changes to /src/components/Home.vue
add lessons to lessons array, see example below:
{ name: "Counter Escape", link: "/counter-escape" },
{ name: "Crazy Animals", link: "/crazy-animals" },
{ name: "Problem Dice", link: "/problem-dice" },
{ name: "Cat and mouse", link: "/cat-and-mouse" }

# test after changes in your local env
# expected results: only lessons listed in Home.vue will be displayed on the homepage.
npm install && npm run serve

# commit && push changes to repo
git add .
git commit -m "add lessons to release"
git push -u origin release_18102019

# now you will be able to see a new branch on Github repo https://github.com/maths300/lessons/branches
# if all good, you will be moving forward to server side to deploy it.

# on server side
cd /var/www/lessons.maths300.com
# update source code
git pull
# swith to the branch you created before
git checkout release_18102019
npm install && npm run build

# visit https://lessons.maths300.com/
# verify the changes are reflected on the home page.
```
