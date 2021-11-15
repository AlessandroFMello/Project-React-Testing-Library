import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Testa se página contém um h2 com o texto "Encountered pokémons".', () => {
    const pokedexH2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(pokedexH2).toBeInTheDocument();
  });

  it('Testa se o próximo pokémon é mostrado após o click no botão.', () => {
    const nextButton = screen.getByText(/próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);

    const imgPokemon = screen.getByRole('img', {
      name: /charmander sprite/i,
    });

    expect(imgPokemon).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    const pokemonClicado = screen.getByText(/pikachu/i);

    expect(pokemonClicado).toBeInTheDocument();

    const pokemons = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];

    pokemons.forEach((pokemon) => {
      const poke = screen.queryByText(pokemon);

      expect(poke).not.toBeInTheDocument();
    });
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    expect(filterButton.length).toBe(types.length);

    filterButton.forEach((buttonEl, i) => expect(buttonEl).toHaveTextContent(types[i]));
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const buttonReset = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(buttonReset);

    expect(buttonReset).toBeInTheDocument();
  });
});
