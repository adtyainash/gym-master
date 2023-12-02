import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterGym from '@/app/components/FooterGym';
import '@testing-library/jest-dom';

test('renders Footer component with correct content', () => {
    render(<FooterGym />);
    expect(screen.getByTestId('gymmaster')).toBeInTheDocument();
  });
  