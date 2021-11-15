import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes para o componente <NotFound.js />', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  it('Testa se a página tem um componente h2 com o texto "pageRequested not found"',
    () => {
      const notFoundH2 = screen.getByRole('heading',
        {
          name: /Page requested not found/i,
          level: 2,
        });
      expect(notFoundH2).toBeInTheDocument();
    });

  it('Testa se a página renderiza o gif selecionado', () => {
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const gif = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(gif.src).toContain(url);
  });
});
