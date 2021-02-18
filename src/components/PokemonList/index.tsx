import React from 'react';

import { List, Card, ImageFrame, CardInfo, AddButton } from './styles';

interface Pokemon {
	name: string;
	url: string;
}

interface PokemonObj {
	pokemon: Pokemon;
}

interface IProps {
	pokemonList: PokemonObj[];
}

function getPokemonIdFromURL(url: string): string {
	let id = url.split('/')[6];
	return id;
}

const PokemonList: React.FC<IProps> = ({ pokemonList }) => {
	return (
		<List>
			{pokemonList.map((p) => (
				<Card key={p.pokemon.name}>
					<ImageFrame
						pokemonId={getPokemonIdFromURL(p.pokemon.url)}
					/>
					<CardInfo>
						<div>{p.pokemon.name}</div>
						<div>{p.pokemon.name}</div>
					</CardInfo>
					<AddButton />
				</Card>
			))}
		</List>
	);
};

export default PokemonList;
