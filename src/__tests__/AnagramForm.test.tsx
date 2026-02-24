import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnagramForm from '../components/AnagramForm';

describe('AnagramForm', () => {
  it('renders all form elements', () => {
    render(<AnagramForm />);
    expect(screen.getByLabelText('Word')).toBeInTheDocument();
    expect(screen.getByLabelText('Word List (comma-separated)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Find Anagrams' })).toBeInTheDocument();
  });

  it('updates the Word input value correctly as the user types', async () => {
    const user = userEvent.setup();
    render(<AnagramForm />);

    const wordInput = screen.getByLabelText('Word');
    await user.type(wordInput, 'listen');

    expect(wordInput).toHaveValue('listen');
  });

  it('updates the Word List input value correctly as the user types', async () => {
    const user = userEvent.setup();
    render(<AnagramForm />);

    const wordListInput = screen.getByLabelText('Word List (comma-separated)');
    await user.type(wordListInput, 'silent, hello');

    expect(wordListInput).toHaveValue('silent, hello');
  });

  it('shows anagram results after submitting the form', async () => {
    const user = userEvent.setup();
    render(<AnagramForm />);

    await user.type(screen.getByLabelText('Word'), 'listen');
    await user.type(screen.getByLabelText('Word List (comma-separated)'), 'silent, hello, enlist');
    await user.click(screen.getByRole('button', { name: 'Find Anagrams' }));

    expect(screen.getByText('Anagrams found:')).toBeInTheDocument();
    expect(screen.getByText('silent')).toBeInTheDocument();
    expect(screen.getByText('enlist')).toBeInTheDocument();
    expect(screen.queryByText('hello')).not.toBeInTheDocument();
  });

  it('shows a message when no anagrams are found', async () => {
    const user = userEvent.setup();
    render(<AnagramForm />);

    await user.type(screen.getByLabelText('Word'), 'xyz');
    await user.type(screen.getByLabelText('Word List (comma-separated)'), 'hello, world');
    await user.click(screen.getByRole('button', { name: 'Find Anagrams' }));

    expect(screen.getByText('No anagrams found.')).toBeInTheDocument();
  });

  it('keeps results visible after the word input is edited', async () => {
    const user = userEvent.setup();
    render(<AnagramForm />);

    await user.type(screen.getByLabelText('Word'), 'listen');
    await user.type(screen.getByLabelText('Word List (comma-separated)'), 'silent, enlist');
    await user.click(screen.getByRole('button', { name: 'Find Anagrams' }));

    await user.type(screen.getByLabelText('Word'), '!');

    expect(screen.getByText('Anagrams found:')).toBeInTheDocument();
  });
});
