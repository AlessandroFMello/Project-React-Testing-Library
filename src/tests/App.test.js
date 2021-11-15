import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes para o componente <App.js />', () => {
  it('Testa se o primeiro link tem o texto Home', () => {
    renderWithRouter(<App />);

    const testLinkToHome = screen.getByRole('link', { name: 'Home' });

    expect(testLinkToHome).toBeInTheDocument();
  });

  it('Testa se o segundo link tem o texto Home', () => {
    renderWithRouter(<App />);

    const testLinkToAbout = screen.getByRole('link', { name: 'About' });

    expect(testLinkToAbout).toBeInTheDocument();
  });

  it('Testa se o terceiro link tem o texto Home', () => {
    renderWithRouter(<App />);

    const testLinkToFavoritePokemons = screen
      .getByRole('link', { name: 'Favorite Pokémons' });

    expect(testLinkToFavoritePokemons).toBeInTheDocument();
  });
});
