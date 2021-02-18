import styled from 'styled-components';

interface ImageProps {
	pokemonId: string;
}

export const List = styled.ul`
	list-style: none;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 40px;
`;

export const Card = styled.li`
	width: 100%;
	height: 300px;
	background-color: var(--d-gray);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-radius: 4px;
	:hover {
		background-color: var(--l-gray);
	}
`;

export const ImageFrame = styled.div`
	width: 90%;
	height: 65%;
	padding: 50px;
	border-radius: 4px;
	background-image: ${(props: ImageProps) =>
		pokemonImageURL(props.pokemonId)};
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	background-color: orange;
`;

const pokemonImageURL = (id: string) => {
	return `url(https://pokeres.bastionbot.org/images/pokemon/${id}.png)`;
};

export const CardInfo = styled.div`
	width: 90%;
	color: white;
	margin-top: 15px;
	div {
		margin-bottom: 8px;
		font-size: 18px;
	}
`;

export const AddButton = styled.button`
	width: 90%;
	height: 50px;
	border: none;
	border-radius: 4px;
	background-color: var(--o-red);
	cursor: pointer;
`;
