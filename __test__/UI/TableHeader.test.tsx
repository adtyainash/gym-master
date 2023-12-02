// __tests__/TableHeader.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TableHeader from '@/app/components/tableHeader';
import '@testing-library/jest-dom';

describe('TableHeader', () => {
  test('renders TableHeader component with the right text', () => {
    render(<TableHeader />);
    expect(screen.getByText('Picture')).toBeInTheDocument();
    expect(screen.getByText('Class Name')).toBeInTheDocument();
    expect(screen.getByText('Instructor')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Quota')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });
});
