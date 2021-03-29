import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/"
});

export const getFirePokemon = async () => {
  const { data } = await api.get("type/fire/");
  return data.pokemon;
};

export const getWaterPokemon = async () => {
  const { data } = await api.get("type/water/");
  return data.pokemon;
};

export const getGrassPokemon = async () => {
  const { data } = await api.get("type/grass/");
  return data.pokemon;
};

export const getPokemonInfo = async (id: string) => {
  const { data } = await api.get(`pokemon/${id}`);
  return data;
};
