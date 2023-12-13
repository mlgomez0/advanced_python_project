"use client";

import MovieRatingModal from '@/components/MovieRatingModal';
import { useState } from 'react';

export default function Home() {

  const [ movieDescription, setMovieDescription ] = useState('');
  const [ subreddit, setSubreddit ] = useState("climatechange");
  const [ postDate, setPostDate ] = useState('')
  const [ rating, setRating ] = useState<number>(0);

  const handleDescriptionChange = (e: any) => {
    setMovieDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {

      // Check required fields
      if (movieDescription?.trim().length > 0 && subreddit?.trim().length > 0 && postDate?.trim().length > 0) {
        const response = await fetch(`http://127.0.0.1:8000/api/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "text": movieDescription,
            "subreddit": subreddit,
            "date": postDate
          })
        });
        const data = await response.json();
        setRating(data.rating);
      } else {
        alert("Please complete all fields")
      }


    } catch (error) {
      alert(error);
    }
  };

  return (<>
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-gradient-to-r from-blue-600 to-violet-600">
      <h1 className='text-6xl font-bold text-center text-white mb-10'>
        Predict climate change post score
      </h1>
      <input type='text'
        className="mb-6 w-full p-4 text-xl font-light text-gray-700 bg-white border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        placeholder='Subreddit'
        onChange={x => setSubreddit(x.target.value)}
        value={subreddit}
      />
      <textarea
        className="mb-6 w-full p-4 text-xl font-light text-gray-700 bg-white border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        placeholder='Describe the post here...'
        onChange={handleDescriptionChange}
        value={movieDescription}
        style={{ minHeight: '200px' }}>
      </textarea>
      <input type='datetime-local'
        className="mb-6 w-full p-4 text-xl font-light text-gray-700 bg-white border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        placeholder='Post date'
        onChange={x => setPostDate(x.target.value)}
        value={postDate as any}
      />
      <button type='button'
        className='px-6 py-3 text-xl font-bold text-white bg-blue-950 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg'
        onClick={handleSubmit}>
        Predict score
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
