import React from 'react';
import { useQuery } from 'react-query';
import {
	getFirePokemon,
	getGrassPokemon,
	getWaterPokemon
} from '../../services/api';

import { Container, Content } from './styles';

import Header from '../../components/Header';
import PokemonList from '../../components/PokemonList';
interface IProps {
	type: string;
}

interface Pokemon {
	name: string;
	url: string;
}
interface PokemonObj {
	pokemon: Pokemon;
}

interface Data {
	pokemon: PokemonObj[];
}

interface Map {
	[key: string]: () => Promise<void> | undefined;
}

const selectPokemonMap: Map = {
	fire: getFirePokemon,
	water: getWaterPokemon,
	grass: getGrassPokemon
};

const Store: React.FC<IProps> = ({ type }) => {
	const { data, isLoading, isSuccess } = useQuery<unknown, unknown, Data>(
		'pokemonList',
		selectPokemonMap[type]
	);
	return (
		<Container>
			<Header />
			<Content>
				{isLoading && <div style={{ color: 'white' }}>Loading...</div>}
				{isSuccess &&
				data && <PokemonList pokemonList={data.pokemon.slice(0, 59)} />}
			</Content>
		</Container>
	);
};

export default Store;
