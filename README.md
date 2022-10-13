<p style="width:100%">
<img style="width:100%" src="https://user-images.githubusercontent.com/86467852/194753998-14fef663-958b-4c30-9c6d-92ceac7e1b76.png" />
</p>

# Contents

- [About](https://github.com/Turing-DECO3801/hiking-memory-frontend/edit/main/README.md#about)
- [Demonstration](https://github.com/Turing-DECO3801/hiking-memory-frontend#demonstration)
- [Running Locally](https://github.com/Turing-DECO3801/hiking-memory-frontend#running-locally)

# About

Memory Trail is a Mobile Web Application that has been paired with a Hardware Device for which documentation can be found at [Hardware Device](https://github.com/Turing-DECO3801/m5stack) which will be used to populate voice and hike path data. The application is currently deployed with AWS Amplify for testing [Memory Trail](https://main.d1pm2nrvdi0cv8.amplifyapp.com/) and should be viewed in mobile resolution. 

Memory Trail is used to store and visualise all hiking data and memories that hiking enthusiasts make throughout their journeys. The hardware device mentioned earlier will upload data directly to the databases and file storarges that the web application will query to provide data to fill the application. The types of data that is provided by the device will be GPS logs and voice memos that will be displayed on an interactive map.

![image](https://user-images.githubusercontent.com/86467852/194072697-dbefc976-19df-4449-858a-f4254b5fdb78.png)



# Demonstration

## Sign Up and Login Pages
You are free to create an account, however, we have also provided a test account that has already been filled with information for you to see. It is recommended that you use the test account as a new account will not have much data to see as data will be provided by the hardware device.

### `Username: test1@gmail.com`

### `Password: test`

![image](https://user-images.githubusercontent.com/86467852/194754393-409101d0-c0c2-4605-84ec-e33e1516d6f6.png)

## Home Page and New Hike Notification
Once logged in, thee home page will be displayed with quick access to the latest hike that you've taken and a notification for any new hikes that you've been on. The notification will prompt you to name the hike trail so it can be used in statistics calculations. 

![image](https://user-images.githubusercontent.com/86467852/195609562-f2eac0d2-998f-48d6-81db-6e946f89ef14.png)

## Photo Collection
From the home page, you'll be able to navigate to a collection of all of the photos that you've taken on your hikes, nicely grouped based on the hike they were taken on. These photos will be attached to the voice memos that you've been recorded and will need to be uploaded once the hike has been uploaded to the app.

![image](https://user-images.githubusercontent.com/86467852/195617761-ce229519-ba7e-4f75-b1f3-f3ca0515e28a.png)


## All Hikes Page

## Single Hike Page

### Notifications


### Account

### Running Locally

### `npm start`

Runs the app in the development mode. This page will make the necessary calls to the backend and Google Maps API

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. To test whether changes will run correctly when deployed, this should be run before pushing to main

