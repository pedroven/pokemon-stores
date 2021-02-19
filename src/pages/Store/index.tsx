import React from 'react';
import { useQuery } from 'react-query';
import {
	getFirePokemon,
	getGrassPokemon,
	getWaterPokemon
} from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../actions';

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
	const products = useSelector((store: any) => store.productsState.products);
	const dispatch = useDispatch();

	return (
		<Container>
			<Header type={type} />
			<Content>
				{isLoading && <div style={{ color: 'white' }}>Loading...</div>}
				{isSuccess &&
				data && (
					<PokemonList
						type={type}
						pokemonList={data.pokemon.slice(0, 59)}
					/>
				)}
				<div
					style={{ width: 500, background: 'orange', marginLeft: 40 }}
				>
					<span>carrinho</span>
					{products &&
						products.map((product: any) => (
							<div>
								{product.name} {product.amount}
							</div>
						))}
					<button
						onClick={() =>
							dispatch(
								addProduct({
									name: 'bulba2',
									id: '1',
									price: 100,
									amount: 1
								})
							)}
					>
						add
					</button>
				</div>
			</Content>
		</Container>
	);
};

export default Store;
