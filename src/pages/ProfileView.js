import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function ProfileView({ match, history }) {
	const [userRepo, setUserRepo] = useState([]);
	const [userLangs, setUserLangs] = useState([]);

	const navBar = () => {
		return (
			<nav className="navMain">
				<div className="nav-wrapper">
					<button
						className="sidenav-trigger show-on-large menu-btn"
						onClick={() => {
							history.push(`/user/${match.params.meId}`);
						}}
					>
						{/*  show-on-large to show on big screens */}
						<i className="medium material-icons" style={{ color: 'white' }}>
							chevron_left
						</i>
					</button>
					{match.params.meId && (
						<Link to={`/user/${match.params.meId}`} className="brand-logo center">
							<img style={{ height: 50, marginTop: 10 }} src={require('../tinderLogo.png')} alt="Logo" />
						</Link>
					)}
				</div>
			</nav>
		);
	};

	useEffect(() => {
		axios
			.get(`https://api.github.com/users/${match.params.userName}/repos?sort=created`)
			.then((resp) => {
				setUserRepo(resp.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [match.params.userName]);

	useEffect(() => {
		let lan = [];
		userRepo.map((item) => {
			if (item.language) {
				lan.push(item.language);
			}
		});

		function getArr(arr) {
			var a = [],
				b = [],
				prev;

			arr.sort();
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] !== prev) {
					a.push(arr[i]);
					b.push(1);
				} else {
					b[b.length - 1]++;
				}
				prev = arr[i];
			}

			return [a, b];
		}

		let arr = getArr(lan);

		let sum = 0;
		arr[1].map((item) => {
			sum += item;
		});

		let a = [];

		for (let i = 0; i < arr[0].length; i++) {
			let b = {};
			let pc = Math.round((arr[1][i] / sum) * 100);
			b.language = arr[0][i];
			b.percentage = pc;
			a.push(b);
		}

		var sortedArr = a.slice(0);
		sortedArr.sort(function (a, b) {
			return a.percentage - b.percentage;
		});

		setUserLangs(sortedArr.reverse());
	}, [userRepo]);

	return (
		<>
			{navBar()}
			<div style={{ padding: 50 }}>
				{userLangs &&
					userLangs.map((item, index) => {
						return (
							<div key={index}>
								<span>{item.language}</span>
								<div className="progress blue lighten-4 ">
									<div className="determinate blue" style={{ width: `${item.percentage}%` }}></div>
									{item.percentage}%
								</div>
							</div>
						);
					})}
				<p style={{ paddingTop: 20, color: '#616C6F' }}>
					Disclaimer: Data is based on the 30 recent public repos
				</p>
			</div>
		</>
	);
}

export default ProfileView;

// {/* <div className="chatbox-top">
// 				<button
// 					className="back-btn"
// 					onClick={() => {
// 						history.push(`/user/${match.params.meId}`);
// 					}}
// 				>
// 					<i className="medium material-icons" style={{ color: 'red' }}>
// 						chevron_left
// 					</i>
// 				</button>
// 				<div
// 					style={{
// 						display: 'flex',
// 						justifyContent: 'center',
// 						flexDirection: 'column',
// 						alignItems: 'center',
// 					}}
// 				>
// 					{/* <img alt="" src={user.photo} className="circle" style={{ height: 64, width: 64 }} /> */}
// 			{/* <p style={{ margin: 0, color: '#616C6F' }}>{user.name}</p>
// 				</div>
// 				<div style={{ width: 64, height: 1 }}></div>
// 			</div> */}
// 		// 	<h1>{match.params.userName}</h1>
// 		// 	<h1>{match.params.userId}</h1>
// 		// </div>
