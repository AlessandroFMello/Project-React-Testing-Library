import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes para o componente <FavoritePokemons.js />', () => {
  it('Exibe mensagem de erro quando não há pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText(/No favorite pokemon found/i);

    expect(notFound).toBeInTheDocument();
  });
});
