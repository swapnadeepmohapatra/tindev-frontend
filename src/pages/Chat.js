import { db } from '../helper/firebase';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import api from '../helper/api';

function Chat({ match, history }) {
	const [messages, setMessages] = useState([]);
	const [messageText, setMessageText] = useState('');
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});

	useEffect(() => {
		getUserData();

		getChats();
	}, []);

	const handleChange = (e) => {
		setMessageText(e.target.value);
	};

	const handleEnter = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			e.stopPropagation();
			sendMessage();
		}
	};

	const getChats = async () => {
		await db
			.ref('chats')
			.child(match.params.senderId)
			.child(match.params.receiverId)
			.orderByChild('time')
			.on('child_added', (datasnapshot) => {
				setMessages((messages) => [...messages, datasnapshot.val()]);
				setLoading(false);
			});

		setLoading(false);
	};
	const getUserData = async () => {
		const myResponse = await api.get('/userById', {
			headers: { userid: match.params.receiverId },
		});

		setUser(myResponse.data);
		// setLoading(false);
	};

	const sendMessage = () => {
		const msgData = {
			message: messageText,
			time: Date.now(),
			sender: match.params.senderId,
			receiver: match.params.receiverId,
		};

		setMessageText('');

		db.ref('chats')
			.child(match.params.senderId)
			.child(match.params.receiverId)
			.push(msgData)
			.then(() => {
				db.ref('chats')
					.child(match.params.receiverId)
					.child(match.params.senderId)
					.push(msgData)
					.then(() => {});
			});
	};
	if (!loading) {
		return (
			<aside>
				<div className="chatbox-top header">
					<button
						className="back-btn"
						onClick={() => {
							history.push(`/user/${match.params.senderId}`);
						}}
					>
						<i className="medium material-icons" style={{ color: 'red' }}>
							chevron_left
						</i>
					</button>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<img alt="" src={user.photo} className="circle" style={{ height: 64, width: 64 }} />
						<p style={{ margin: 0, color: '#616C6F' }}>{user.name}</p>
					</div>
					<div style={{ width: 64, height: 1 }}></div>
				</div>
				<div className="chat-container">
					<div className="scrollable-content">
						{messages.length > 0 &&
							messages.map((msg) => {
								if (msg.sender === match.params.senderId) {
									return (
										<li className="self">
											<div className="msg">
												<p>{msg.name}</p>
												<div className="message"> {msg.message}</div>
												<div className="message"></div>
											</div>
										</li>
									);
								} else {
									return (
										<li className="other">
											<div className="msg">
												<p>{msg.name}</p>
												<div className="message"> {msg.message}</div>
												<div className="message"></div>
											</div>
										</li>
									);
								}
							})}
					</div>
				</div>
				<div className="chat-input-container">
					<form className="input-field chat-box">
						<input
							className="textarea input"
							value={messageText}
							id="msg-input"
							type="text"
							onChange={handleChange}
							onKeyDown={handleEnter}
							placeholder="Enter your message..."
						/>
						<button
							className="send-btn"
							type="button"
							onClick={sendMessage}
							disabled={messageText.trim() === ''}
						>
							<span>SEND</span>
						</button>
					</form>
				</div>
			</aside>
		);
		// return (
		// 	<aside id="chatWindow">
		// 		<div class="header">
		// 			<h1>Live support</h1>
		// 			<button class="btn-close" id="closeChat">
		// 				<svg viewBox="0 0 47.971 47.971">
		// 					<path
		// 						fill="white"
		// 						d="M28.228 23.986L47.092 5.122a2.998 2.998 0 000-4.242 2.998 2.998 0 00-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 00-4.242 0 2.998 2.998 0 000 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 104.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 000-4.242L28.228 23.986z"
		// 					/>
		// 				</svg>
		// 			</button>
		// 		</div>

		// 		<div id="message-area" class="messages"></div>

		// 		<div class="controls">
		// 			<form id="textentry">
		// 				<input id="textbox" type="text" />
		// 				<input id="submit" type="submit" value="Send" />
		// 			</form>
		// 		</div>
		// 	</aside>
		// );
	} else {
		return (
			<div>
				<span className="pulse">
					<img src={user.photo} alt="You..." />
				</span>
			</div>
		);
	}
}
export default Chat;
