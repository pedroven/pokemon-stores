import styled from 'styled-components';

interface Map {
	[key: string]: any;
}

const headerTheme: Map = {
	fire: 'var(--d-orange)',
	water: 'var(--header-blue)',
	grass: 'var(--header-green)'
};

interface IContainer {
	type: string;
}

export const Container = styled.header`
	width: 100%;
	height: 80px;
	background-color: ${(props: IContainer) => headerTheme[props.type]};
`;
