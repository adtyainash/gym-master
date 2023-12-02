import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClassCard from '@/app/components/classCard';
import '@testing-library/jest-dom';


describe('ClassCard', () => {
  const sampleClass = {
    classID: 1,
    className: 'Test Class',
    instructorName: 'Agus Perkasa',
    price: '$20',
    status: 'Active',
    quota: 245,
    image: '/sample-image.jpg',
    equipments: ['Dumbbells', 'Yoga Mat'],
    description: 'Sample description.',
  };

  test('renders ClassCard component', () => {
    render(<ClassCard {...sampleClass} />);

    expect(screen.getByText(sampleClass.instructorName)).toBeInTheDocument();
    expect(screen.getByText(sampleClass.price)).toBeInTheDocument();
    expect(screen.getByText(sampleClass.status)).toBeInTheDocument();
    expect(screen.getByText(`${sampleClass.quota} members`)).toBeInTheDocument();
    expect(screen.getByAltText(`Image for ${sampleClass.className}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /VIEW/i })).toBeInTheDocument();
  });

  test('open and close modal', () => {
    render(<ClassCard {...sampleClass} />);

    fireEvent.click(screen.getByRole('button', { name: /VIEW/i }));

    fireEvent.click(screen.getByRole('button', { name: /VIEW/i }));
  });
});
