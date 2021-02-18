import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
	getFirePokemon,
	getGrassPokemon,
	getWaterPokemon
} from '../../services/api';
// import { Container } from './styles';
interface IProps {
	type: string;
}

interface Pokemon {
	name: string;
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
	const { data } = useQuery('pokemonList', selectPokemonMap[type]);

	return <div>{type}</div>;
};

export default Store;
