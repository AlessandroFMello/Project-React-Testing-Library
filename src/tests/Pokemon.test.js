import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <Pokémon />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const nextPoke = 'Próximo pokémon';
  it('Testa se o nome correto do pokemon é exibido', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const nxtBtn = screen.getByRole('button', { name: nextPoke });
    userEvent.click(nxtBtn);
    const nxtName = screen.getByTestId('pokemon-name');
    expect(nxtName).toHaveTextContent('Charmander');
  });

  it('Testa se o tipo correto do pokemon é exibido', () => {
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const dragonFilter = screen.getByRole('button', { name: 'Dragon' });
    userEvent.click(dragonFilter);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Dragon');
  });

  it('Testa se o peso médio do pokemon é exibido', () => {
    const peso = screen.getByTestId('pokemon-weight');
    expect(peso).toHaveTextContent('Average weight: 6.0 kg');
    const nxtBtn = screen.getByRole('button', { name: nextPoke });
    userEvent.click(nxtBtn);
    const nxtPeso = screen.getByTestId('pokemon-weight');
    expect(nxtPeso).toHaveTextContent('Average weight: 8.5 kg');
  });

  it('Testa se a imagem do pokemon é exibida', () => {
    const pokeImg = screen.getByAltText(/Pikachu sprite/i);
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg).toHaveAttribute('alt', 'Pikachu sprite');
    const nxtBtn = screen.getByRole('button', { name: nextPoke });
    userEvent.click(nxtBtn);
    const nxtPoke = screen.getByRole('img');
    expect(nxtPoke).toBeInTheDocument();
    expect(nxtPoke).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(nxtPoke).toHaveAttribute('alt', 'Charmander sprite');
  });

  it('Testa se o card tem um link de navegação para mais detalhes', () => {
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toHaveAttribute('href', '/pokemons/25');
    const nxtBtn = screen.getByRole('button', { name: nextPoke });
    userEvent.click(nxtBtn);
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
