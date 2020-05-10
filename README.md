

# Tindev
  [![Netlify Status](https://api.netlify.com/api/v1/badges/36e12b81-4bce-49a8-a279-ee2739b21afe/deploy-status)](https://app.netlify.com/sites/tindev-app/deploys)
  
It is an online code dating app that allows Devs to anonymously swipe to like or dislike other profiles based on their GitHub profile. Once two Devs have “matched, ” they can exchange messages.  

___description___ Researching co-worker is something difficult. Tindev offers you the opportunity to simply accelerate the process by finding out which is the best match. With this you can login with your github ID and you can swipe through differnt devs and if two devs like each other then they match and they can chat over this app. Through this they can get the best co-worker for them and may be the co-founder for a big firm.

___stack___ `MongoDB` is used for the database, `Node.js` and `Express.js` for the Backend, `React.js` for the frontend and `Socket.io` is used for Real-Time Communication.

This Repo is the frontend part of Tindev Web App .
Here is the [**Backend**](https://github.com/swapnadeepmohapatra/tindev-backend) Repo.
## HOSTED LINKS

[Backend](https://tindev-swapnadeep.herokuapp.com/)
[Frontend](https://tindev.swapnadeep.com/)

## PROJECT STRUCTURE
	
	├── public      # Static files
	|
	├── src         # Main Source Code
	| ├── Components     # Reusable components
	| ├── Helper         # API Calls
	| ├── Assests        # SVG assests
	| └── Pages          # Pages in Routing
	|
	├── index.js      # Main Entry Point  
	└── Routes.js     # Routing files 

	

## Available Scripts

In the project directory, you can run:

### `yarn install`

This will install all the dependencies mentioned in the package.json

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
