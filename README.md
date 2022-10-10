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

# Demonstration

You are free to create an account, however, we have also provided a test account that has already been filled with information for you to see. It is recommended that you use the test account as a new account will not have much data to see as data will be provided by the hardware device.

### `Username: test1@gmail.com`

### `Password: test`

## Sign Up and Login Pages
![image](https://user-images.githubusercontent.com/86467852/194754393-409101d0-c0c2-4605-84ec-e33e1516d6f6.png)


### Running Locally

### `npm start`

Runs the app in the development mode. This page will make the necessary calls to the backend and Google Maps API

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. To test whether changes will run correctly when deployed, this should be run before pushing to main

![image](https://user-images.githubusercontent.com/86467852/194072697-dbefc976-19df-4449-858a-f4254b5fdb78.png)

