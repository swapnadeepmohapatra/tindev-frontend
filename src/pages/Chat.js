import { db } from '../helper/firebase';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function Chat({ match }) {
	const [messages, setMessages] = useState([]);
	const [messageText, setMessageText] = useState('');

	useEffect(() => {
		db.ref('chats')
			.child(match.params.receiverId)
			.child(match.params.senderId)
			.orderByChild('time')
			.on('child_added', (datasnapshot) => {
				setMessages((messages) => [...messages, datasnapshot.val()]);
			});
	}, []);

	const handleChange = (e) => {
		setMessageText(e.target.value);
	};

	const sendMessage = () => {
		alert(messageText);
	};

	return (
		<div>
			<Navbar />
			<div className="chat-container" style={{ minHeight: '80vh' }}>
				{messages.length > 0 &&
					messages.map((msg) => {
						if (msg.sender !== match.params.senderId) {
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
				<div className="input-field chat-box">
					<input
						className="textarea input"
						value={messageText}
						id="msg-input"
						type="text"
						onChange={handleChange}
						placeholder="Enter your message..."
					/>
					<button className="send-btn" onClick={sendMessage} disabled={messageText.trim() === ''}>
						<i class="small material-icons">send</i>
					</button>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Chat;
