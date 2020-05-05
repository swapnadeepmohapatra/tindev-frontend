import { db } from '../helper/firebase';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import api from '../helper/api';
import { useHistory } from 'react-router-dom';

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
			<div>
				<Navbar />
				<div className="chatbox-top">
					<button
						className="back-btn"
						onClick={() => {
							history.push(`/user/${match.params.senderId}`);
						}}
					>
						<i class="medium material-icons" style={{ color: 'red' }}>
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
						<img src={user.photo} className="circle" style={{ height: 64, width: 64 }} />
						<p style={{ margin: 0, color: '#616C6F' }}>{user.name}</p>
					</div>
					<div></div>
				</div>
				<div className="chat-container" style={{ minHeight: '70vh' }}>
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
				<Footer />
			</div>
		);
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
