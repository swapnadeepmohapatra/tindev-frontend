import React from 'react';

import MaterialCard from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import '../App.css';

export default function Card({ item: { name, bio, photo } }) {
	return (
		<MaterialCard
			elevation={5}
			style={{
				maxWidth: 345,
				':foucs': { backgroundColor: '#000000' },
				borderRadius: 20,
			}}
		>
			<CardActionArea>
				<CardMedia
					style={{ objectFit: 'cover', objectPosition: 'top', userSelect: 'none', pointerEvents: 'none' }}
					component="img"
					height="300"
					image={photo}
				/>
				<CardContent style={{ color: '#000000' }}>
					<Typography gutterBottom variant="h6" component="h3">
						{name}
					</Typography>
					<Typography
						gutterBottom
						variant="body1"
						component="h3"
						dangerouslySetInnerHTML={{ __html: bio }}
					></Typography>
				</CardContent>
			</CardActionArea>
		</MaterialCard>
	);
}
