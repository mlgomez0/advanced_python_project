"use client";

import MovieRatingModal from '@/components/MovieRatingModal';
import { useState } from 'react';

export default function Home() {
  const [ movieDescription, setMovieDescription ] = useState('');
  const [ rating, setRating ] = useState<number>(0);

  const handleDescriptionChange = (e: any) => {
    setMovieDescription(e.target.value);
  };

  const handleSubmit = async () => {

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: movieDescription
        })
      });
      const data = await response.json();
      setRating(data.rating);
    } catch (error) {
      alert(error);
    }
  };

  return (<>
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-gradient-to-r from-blue-600 to-violet-600">
      <h1 className='text-6xl font-bold text-center text-white mb-10'>
        Predict Movie Rating
      </h1>
      <textarea
        className="mb-6 w-full p-4 text-xl font-light text-gray-700 bg-white border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        placeholder='Describe the movie here...'
        onChange={handleDescriptionChange}
        value={movieDescription}
        style={{ minHeight: '200px' }}>
      </textarea>
      <button
        className='px-6 py-3 text-xl font-bold text-white bg-blue-950 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg'
        onClick={handleSubmit}>
        Predict Rating
      </button>
    </main>
    <MovieRatingModal
      rating={rating}
      isOpen={rating > 0}
      onClose={() => setRating(0)}
    />
  </>
  );

}
