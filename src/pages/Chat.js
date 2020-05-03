import { db } from '../helper/firebase';
import React, { useEffect, useState } from 'react';

function Chat({ match }) {
	const [message, setMessage] = useState([]);

	useEffect(() => {
		db.ref('chats')
			.child(match.params.receiverId)
			.child(match.params.senderId)
			.orderByChild('time')
			.on('child_added', (datasnapshot) => {
				setMessage((message) => [...message, datasnapshot.val()]);
			});
	}, []);

	return (
		<div>
			{match.params.receiverId}
			{match.params.senderId}

			<div>
				{message.length > 0 &&
					message.map((msg) => {
						return (
							<>
								<p>{JSON.stringify(msg)}</p>
								<p>{msg.message}</p>
							</>
						);
					})}
			</div>
		</div>
	);
}

export default Chat;
