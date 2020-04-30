import React from 'react';

const Main = ({ match }) => {
	return <div>{match.params.id}</div>;
};

export default Main;
