// __tests__/SignUpForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from '@/app/components/SignUpForm';
import { useRouter } from "next/navigation";
import '@testing-library/jest-dom';


jest.mock("next/navigation");

describe('SignUpForm', () => {
  test('renders SignUpForm component with form elements', () => {
    render(<SignUpForm />);
    const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Telephone')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Re-Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  test('fill form with data', async () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'jazmy' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jazmystroberi@example.com' } });
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ja. Zmy' } });
    fireEvent.change(screen.getByLabelText('Telephone'), { target: { value: '88888888' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: 'Oregon St' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '18384983483' } });
    fireEvent.change(screen.getByLabelText('Re-Enter your password'), { target: { value: '18384983483' } });

  });
});
