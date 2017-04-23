# symmetrical-broccoli

## Installation'
- required on your machine: mongoDB, webpack, node.js
- clone repo
- at the root of the directory (where `yarn.lock` file is located), run `yarn install` [more info on yarn\(https://yarnpkg.com/en/docs/getting-started)
- need webpack installed: to install globally: `npm install -g webpack` 
- run `mongod`
- run webpack `webpack` - to run once `webpack -w` to run and watch for changes in the files
- run `server.js` - use `node server.js` or `nodemon` if you have `nodemon` installed
 - researching to see if I can get webpack to also watch the server/other files - there is a default webpack server but it wasn't quite what I was looking for
 - eventually, I would like to add some seed data and a seed route, for now the functionality to create a new cohort and add new members works (though very poor ui - working on it :-D )
 

##Trying out a few new things

- Yarn instead of NPM
- ES6 (when I remember!) - will keep going back and editing
- MongoDB, Mongoose (first project using it)
- Ajax (framework-free Single Page Application)
- Webpack - starting to love webpack. Will use bundle front end js.
 [Great tutorial to get started with webpack](https://scotch.io/tutorials/getting-started-with-webpack-module-bundling-magic)
  - In building this app I have found that the ajax calls can become very long and hard to organize. Webpack will allow me to make separate js files and then do the work to bundle all the code into one file called `bundle.js` - From my research, this seems to be the prefferred way to deal with front-end js files: In reading about using commmonJS, module.exports/require is for back-end stuff. 
  [about commonJS](http://know.cujojs.com/tutorials/modules/authoring-cjs-modules)


##
Would be handy to have an app that can
- put students in a random order
- click when students have 'gone'
- put students in random groups (2, 3, 4, 5 - and have options of how to split the groups when there is an uneven number)
- be able to temporarily remove students (because absent that day)
- be able to reorganize random groups (set someone in a larger group because they have to leave early

### Student Randomizer User Stories

- A user will be able to create a cohort
- A user will be able to add students to a cohort
- A user will be able to make a list the students in random order
- A user will be able to see an alphabetical list of students 
- A user will be able to edit a cohort
- A user will be able to delete a cohort
- A user will be able to see a list of cohorts
- A user will be able to edit students
- A user will be able to delete students




