# Front End App

[![CircleCI](https://circleci.com/gh/Ajay233/react_redux_front_end.svg?style=svg)](https://circleci.com/gh/Ajay233/react_redux_front_end)

## Background

This app has been created as a practice project to trial the use of React and Redux to build a front end app.  The front end app links to a back end API app that serves the front end.  The back end repo is at: https://github.com/Ajay233/stand_alone_api

## The live app

The app is now live and has been deployed on Heroku.  You can try it out using the following link: https://quiz-hosting-and-management.herokuapp.com/viewPdf.

I am using the free tier which means that when there has been no activity for a short period of time, the app dyno that serves the app goes to sleep.  Due to this, please bear this in mind when using the app.  If there are any Heroku errors where the app was unable to load, I have found this to be the issue and a refresh will have the app back up and running as the dyno will have started up by then.

### Demo credentials

User the credentials below to try out the app if you do not want to sign up for an account.  Please note that passwords are encrypted using Bcrypt so they are securely encrypted before they are saved in the database.  You also have the option to delete your account which will permanently delete it from the database.  No information will be held in relation to the account after it's deletion.

| Username | Password | Permission level |
|----------|----------|------------------|
| test1@test.com | demoUser123 | USER |
| test3@test.com | readOnly123 | READ-ONLY |
| test5@test.com | admin123 | ADMIN |

## Running the app locally
1. You will need to first clone the repository and then download all of the required dependencies.  To download the dependencies run the following command:
### `npm install`

2. In the project directory, simply run:

### `npm start`

This will run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technology used

- React
- Redux
- Redux-thunk
- Redux-forms
- Axios (for making network requests)
- Jest
- Enzyme
- @react-pdf/renderer (for building and rendering PDFs)

I have also made use of CircleCI for continuous integration.  The build badge can be seen above at the top of this README indicating the current build status.
