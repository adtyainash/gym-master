import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import SearchBar from '@/app/components/SearchBar';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchBar', () => {
  test('redirects to /classes/search?q=query when query exists', () => {
    const routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });

    render(<SearchBar />);

    fireEvent.change(screen.getByPlaceholderText('Type here'), {
      target: { value: 'human tree' },
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(routerPushMock).toHaveBeenCalledWith('/classes/search?q=human%20tree');
  });
});
