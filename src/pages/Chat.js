import { db } from '../helper/firebase';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function Chat({ match }) {
	const [messages, setMessages] = useState([]);
	const [messageText, setMessageText] = useState('');

	useEffect(() => {
		db.ref('chats')
			.child(match.params.senderId)
			.child(match.params.receiverId)
			.orderByChild('time')
			.on('child_added', (datasnapshot) => {
				setMessages((messages) => [...messages, datasnapshot.val()]);
			});
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

	const sendMessage = () => {
		const msgData = {
			message: messageText,
			time: Date.now(),
			sender: match.params.senderId,
			receiver: match.params.receiverId,
		};
		db.ref('chats')
			.child(match.params.senderId)
			.child(match.params.receiverId)
			.push(msgData)
			.then(() => {
				db.ref('chats')
					.child(match.params.receiverId)
					.child(match.params.senderId)
					.push(msgData)
					.then(() => {
						setMessageText('');
					});
			});
	};

	return (
		<div>
			<Navbar />
			<div className="chat-container" style={{ minHeight: '70vh' }}>
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
			<div className="chat-container">
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
						<i class="small material-icons">send</i>
					</button>
				</form>
			</div>
			<Footer />
		</div>
	);
}

export default Chat;
