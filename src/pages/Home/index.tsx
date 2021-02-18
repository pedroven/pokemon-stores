import React from 'react';
import { Link } from 'react-router-dom';
// import { Container } from './styles';

const Home: React.FC = () => {
	return (
		<div>
			<Link to="/store/fogo">Loja fogo</Link>
			<Link to="/store/agua">Loja agua</Link>
			<Link to="/store/grama">Loja grama</Link>
		</div>
	);
};

export default Home;
