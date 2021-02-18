import axios from 'axios';

require('dotenv').config();

const api = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}`
});

export const getFirePokemon = async () => {
	const { data } = await api.get('type/fire/');
	return data;
};

export const getWaterPokemon = async () => {
	const { data } = await api.get('type/water/');
	return data;
};

export const getGrassPokemon = async () => {
	const { data } = await api.get('type/grass/');
	return data;
};
