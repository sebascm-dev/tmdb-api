import { useState, useEffect } from 'react'

import axios from 'axios'

import './App.css'


interface Movies {
  id: number
  title: string
  poster_path: string
  release_date: string
}

function App() {

  const [movies, setMovies] = useState<Movies[]>([])

  const apiKey = '1618f6fc341d1b7c2989a74ccc449a2a'
  const popular = 'https://api.themoviedb.org/3/movie/popular'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
      axios.get(`${popular}?api_key=${apiKey}&language=es`).then((response) => {
        const results = response.data.results
        setMovies(results)
      })
  }

  return (
    <>
      <h1>TMDB - API</h1>

      <section>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <p>{movie.release_date}</p>
          </div>
        ))}
      </section>
    </>
  )
}

export default App
