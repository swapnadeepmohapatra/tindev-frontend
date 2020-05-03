import React, { useState } from 'react';
import MatchCard from './matchCard';
import { Link } from 'react-router-dom';

function Sidebar({ user }) {
	const [mymatches, setMymatches] = useState([]);

	user
		? (user = user)
		: (user = {
				_id: '',
				likes: [],
				dislikes: [],
				matches: [],
				name: 'HItesh Choudhary',
				bio: null,
				photo: 'https://avatars0.githubusercontent.com/u/11613311?v=4',
				user: 'hiteshchoudhary',
				createdAt: '2020-05-03T04:44:56.769Z',
				updatedAt: '2020-05-03T04:45:05.643Z',
				__v: 2,
		  });

	if (user) {
		return (
			<ul id="slide-out" className="sidenav" style={{ backgroundColor: '#eef2f5' }}>
				<li>
					<div className="user-view">
						<div className="background"></div>
						<a href="#user">
							<img className="circle" src={user.photo} />
						</a>
						<a href="#name">
							<span className="white-text name" style={{ fontWeight: 'bold', fontSize: 20 }}>
								{user.name}
							</span>
						</a>
						<a href="#email" style={{ marginTop: 50 }}>
							<span className="white-text email">{user.bio}</span>
						</a>
					</div>
				</li>
				<li>
					<a className="subheader">All Matches</a>
				</li>
				{user.matches.length > 0 &&
					user.matches.map((usr) => {
						return (
							<Link>
								<MatchCard matches={usr} key={usr._id} />
							</Link>
						);
					})}
				{user.matches.length === 0 ? (
					<div style={{ textAlign: 'center' }}>
						<h4>Get Swiping</h4>
						<p style={{ paddingLeft: 10, paddingRight: 10, color: '#545454' }}>
							You'll start seeing matches here once you get swiping! When you're ready to chat, you can
							message them directly from here.
						</p>
						<p style={{ color: '#545454' }}>Swipe on!</p>
					</div>
				) : (
					<></>
				)}
				<li></li>
			</ul>
		);
	}
	return (
		<div></div>
		// <ul id="slide-out" className="sidenav">
		// 	<li>
		// 		<div className="user-view">
		// 			<div className="background">
		// 				<img src="images/office.jpg" />
		// 			</div>
		// 			<a href="#user">
		// 				<img className="circle" src="images/yuna.jpg" />
		// 			</a>
		// 			<a href="#name">
		// 				<span className="white-text name">{user.name}</span>
		// 			</a>
		// 			<a href="#email">
		// 				<span className="white-text email">jdandturk@gmail.com</span>
		// 			</a>
		// 		</div>
		// 	</li>
		// 	<li>
		// 		<a href="#!">
		// 			<i className="material-icons">cloud</i>
		// 		</a>
		// 	</li>
		// 	<li>
		// 		<a href="#!"> Deep</a>
		// 	</li>
		// 	<li>
		// 		<div className="divider"></div>
		// 	</li>
		// 	<li>
		// 		<a className="subheader">Subheader</a>
		// 	</li>
		// 	<li>
		// 		<a className="waves-effect" href="#!">
		// 			Third Link With Waves
		// 		</a>
		// 	</li>
		// </ul>
	);
}
export default Sidebar;
