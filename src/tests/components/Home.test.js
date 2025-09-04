import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from '../../pages/home';

afterEach(cleanup);

it('should take a snapshot', () => {
  const { asFragment } = render(<Home />);

  expect(asFragment()).toMatchSnapshot();
});
