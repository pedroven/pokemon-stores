import React from 'react';

import { Container } from './styles';

interface IProps {
	type: string;
}

const Header: React.FC<IProps> = ({ type }) => {
	return <Container type={type} />;
};

export default Header;
