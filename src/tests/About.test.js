import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testes para o componente <About.js />', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  it('Testa se a página contem um h2 com o texto About Pokédex', () => {

    const testH2 = screen.getByRole(
      'heading',
      {
        name: /About Pokédex/i,
        level: 2,
      },
    );

    expect(testH2).toBeInTheDocument();
  });

  it('Testa se a página contem a imagem de uma Pokédex', () => {
    const imageURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = screen.getByRole('img');

    expect(pokedexImage).toHaveAttribute('src', imageURL);
  });
});
