import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

/* Exercício resolvido através da ajuda dos PR de alguns colegas. Não sei dizer quais são, pois escolhi aleatóriamente */

describe('Testa o componente <Pokémon />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const nextPokemon = 'Próximo pokémon';
  it('Testa se o nome correto do pokemon é exibido', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const nextButton = screen.getByRole('button', { name: nextPokemon });
    userEvent.click(nextButton);

    const nextPokemonName = screen.getByTestId('pokemon-name');
    expect(nextPokemonName).toHaveTextContent('Charmander');
  });

  it('Testa se o tipo correto do pokemon é exibido', () => {
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const dragonTypeFilter = screen.getByRole('button', { name: 'Dragon' });
    userEvent.click(dragonTypeFilter);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Dragon');
  });

  it('Testa se o peso médio do pokemon é exibido', () => {
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const nextButton = screen.getByRole('button', { name: nextPokemon });
    userEvent.click(nextButton);

    const nextWeight = screen.getByTestId('pokemon-weight');
    expect(nextWeight).toHaveTextContent('Average weight: 8.5 kg');
  });

  it('Testa se a imagem do pokemon é exibida', () => {
    const pokemonImage = screen.getByAltText(/Pikachu sprite/i);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');

    const nextButton = screen.getByRole('button', { name: nextPokemon });
    userEvent.click(nextButton);

    const nxtPokemon = screen.getByRole('img');
    expect(nxtPokemon).toBeInTheDocument();
    expect(nxtPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(nxtPokemon).toHaveAttribute('alt', 'Charmander sprite');
  });

  it('Testa se o card tem um link de navegação para mais detalhes', () => {
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toHaveAttribute('href', '/pokemons/25');

    const nextButton = screen.getByRole('button', { name: nextPokemon });
    userEvent.click(nextButton);

    const nxtLink = screen.getByRole('link', { name: /more details/i });
    expect(nxtLink).toHaveAttribute('href', '/pokemons/4');
  });

  it('Testa se o pokémon favorito é mostrado corretamente', () => {
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const checkstar = screen.getByAltText('Pikachu is marked as favorite');
    expect(checkstar).toHaveAttribute('src', '/star-icon.svg');
  });
});
