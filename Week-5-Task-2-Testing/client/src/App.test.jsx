import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import App from './App';

describe('Frontend React Component Tests', () => {
  test('renders heading and form elements correctly', () => {
    render(<App />);
    expect(screen.getByText(/Task Manager App/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter item name/i)).toBeInTheDocument();
  });

  test('displays empty state message when no items exist', () => {
    render(<App />);
    expect(screen.getByText(/No items added yet/i)).toBeInTheDocument();
  });

  test('shows validation error when submitting empty form', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Add Item/i });
    await userEvent.click(button);
    expect(screen.getByText(/Item name is required/i)).toBeInTheDocument();
  });

  test('allows user to type and add an item to list', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter item name/i);
    const button = screen.getByRole('button', { name: /Add Item/i });

    await userEvent.type(input, 'Learn Software Testing');
    await userEvent.click(button);

    expect(screen.getByText('Learn Software Testing')).toBeInTheDocument();
  });

  test('clears input field after adding item', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter item name/i);
    const button = screen.getByRole('button', { name: /Add Item/i });

    await userEvent.type(input, 'Clean Code');
    await userEvent.click(button);

    expect(input.value).toBe('');
  });
});