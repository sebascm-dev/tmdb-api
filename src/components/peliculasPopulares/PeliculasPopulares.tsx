import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

interface Movies {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

const PeliculasPopulares = () => {
    const [movies, setMovies] = useState<Movies[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const apiKey = '1618f6fc341d1b7c2989a74ccc449a2a';
    const popular = 'https://api.themoviedb.org/3/movie/popular';

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm]);

    const fetchData = () => {
        let url = searchTerm
            ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es&query=${searchTerm}&page=${currentPage}`
            : `${popular}?api_key=${apiKey}&language=es&page=${currentPage}`;

        axios.get(url).then((response) => {
            const results = response.data.results;
            const totalPages = response.data.total_pages;
            setMovies(results);
            setTotalPages(totalPages);
        });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (
        <div className="popular-films-container">
            <h2 className="popular-film-title">Popular Films</h2>
            <div className="search-bar">
                <input
                    className='search-bar-input'
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <section className="movies-container">
                {movies.slice(0, 12).map((movie) => (
                    <div
                        key={movie.id}
                        className="movies-card"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <h3 className="card-movie-title">{movie.title}</h3>
                        <p className="card-movie-date">{movie.release_date}</p>
                    </div>
                ))}
            </section>
            <div className="pagination-buttons-container">
                <button
                    className="pagination-button"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PeliculasPopulares;
