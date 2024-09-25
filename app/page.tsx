'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err:any) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Date Parser</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Inserisci la tua richiesta"
        />
        <button type="submit">Invia</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div>
          <p>Check-in: {result.checkin}</p>
          <p>Check-out: {result.checkout}</p>
        </div>
      )}
    </div>
  );
}

