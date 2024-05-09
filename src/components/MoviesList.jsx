import React, { useEffect, useRef, useState } from "react";
import useFetchMovies from "../hooks/use-fetch-movies";
import { end_date, start_date } from "../utils/base";
import MovieCard from "./MovieCard";
import style from "../styles/Movies.module.css";
import Layout from "../Layout";

function MoviesList() {
  const pageRef = useRef(null);
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const { data, loading, error } = useFetchMovies(page, start_date, end_date);

  const handleIntersection = (entries) => {
    const entry = entries[0];

    if (entry?.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (observer && pageRef?.current) {
      observer?.observe(pageRef?.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [movieList]);

  useEffect(() => {
    if (data?.length) {
      setMovieList(data);
    }
  }, [data]);

  return (
    <Layout>
      <section className={style.moviehead}></section>
      <section className={style.moviesContainer}>
        <div className={style.movieslist}>
          {movieList?.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </div>

        <div className={style.ref} ref={pageRef}></div>
      </section>
    </Layout>
  );
}

export default MoviesList;
