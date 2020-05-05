import React from 'react';

function MatchCard({ matches }) {
	return (
		<div className="match-card">
			<img alt="" src={matches.photo} className="circle" style={{ height: 64, width: 64 }} />
			<p style={{ paddingLeft: 10 }}>{matches.name}</p>
		</div>
	);
}

export default MatchCard;
