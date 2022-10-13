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

![image](https://user-images.githubusercontent.com/86467852/195618318-ff32f0a0-07a9-449e-974e-5a3b830be036.png)

## Home Page and New Hike Notification
Once logged in, thee home page will be displayed with quick access to the latest hike that you've taken and a notification for any new hikes that you've been on. The notification will prompt you to name the hike trail so it can be used in statistics calculations. 

![image](https://user-images.githubusercontent.com/86467852/195618628-b4ec02a9-ddd3-409f-b010-f9dd8df211a3.png)

## Photo Collection
From the home page, you'll be able to navigate to a collection of all of the photos that you've taken on your hikes, nicely grouped based on the hike they were taken on. These photos will be attached to the voice memos that you've been recorded and will need to be uploaded once the hike has been uploaded to the app.

![image](https://user-images.githubusercontent.com/86467852/195618932-52123e06-24b3-412d-bff4-e83d2e1f405a.png)

## Notifications
The notifications page will store all notifications about hikes that haven't been named. You will be able to name the hike directly from here or if needed, have a look at the path by clicking on it. Once it has been viewed, the orange circle will disappear.

## All Hikes Page
Once your hike has been named in the home or notifications page, it will be viewable on the All Hikes page which is a collection of all of the hikes that has been taken. The hikes can be searched or sorted in a variety of different ways such as looking through all of the favourited hikes.

![image](https://user-images.githubusercontent.com/86467852/195619096-f708fc4f-df14-49b6-ad31-a33d7533d3f3.png)

## Single Hike Page
The Single Hike page will show all information about one of the hikes and can be navigated to by the home, notification or all hikes page. This page will provide a GPS path of the hike, including any audio memos that you've taken throughout the journey. A pop up tab will appear once an audio bubble is tapped on, providing options to add an image to the memo, store some additional notes, play back the audio and view an auto-generated transcription.

## Account
The account page will provide some basic statistics about the account such as the total number of hikes made, images stored and audio messages recorded. Although not functional, we would add security information and options for changing account details. This page also allows users to log out of their account and return to the login page.

## Running Locally


### Requirements

- npm v8.19.2
- NodeJS v16.13.0

### Notes
The data will obtain information from AWS services such as S3 for Audio, Image and CSV store and RDS for data. It is not possible to manually upload information through the web application as it requires the device for upload but there is mocked data that already exists in a testing account. 

### `Username: test1@gmail.com`

### `Password: test`

### `npm i`

Installs all dependencies that the application requires 

### `npm start`

Runs the app in the development mode. This page will make the necessary calls to the backend and Google Maps API

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. To test whether changes will run correctly when deployed, this should be run before pushing to main

