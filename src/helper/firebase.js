import firebase from 'firebase';

var config = {
	apiKey: 'AIzaSyDa_ER2uSp_-CqNiflnIcILUsiqHjlGnHU',
	authDomain: 'mynewproject-fb8ae.firebaseapp.com',
	databaseURL: 'https://mynewproject-fb8ae.firebaseio.com',
	projectId: 'mynewproject-fb8ae',
	storageBucket: 'mynewproject-fb8ae.appspot.com',
	messagingSenderId: '1074248171783',
	appId: '1:1074248171783:web:9cf44ab79244858873c5a2',
};

firebase.initializeApp(config);

export const db = firebase.database();
