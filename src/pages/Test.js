import React, { useState } from 'react';

function Test() {
	const [toggle, setToggle] = useState(false);
	const [rotate, setRotate] = useState(false);

	return (
		<div>
			<img
				src={
					toggle
						? 'https://video-react.js.org/assets/logo.png'
						: 'https://www.shareicon.net/data/128x128/2016/08/01/640324_logo_512x512.png'
				}
				onClick={() => setRotate(true)}
				className={rotate ? 'rotate' : ''}
			/>
		</div>
	);
}

export default Test;
