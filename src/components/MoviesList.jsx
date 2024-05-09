import React, { useEffect, useRef, useState } from "react";
import useFetchMovies from "../hooks/use-fetch-movies";
import { end_date, start_date } from "../utils/base";
import MovieCard from "./MovieCard";
import style from "../styles/Movies.module.css";
import Layout from "../Layout";
import useDebounce from "../hooks/use-debounce";
import Loader from "./Loader";

function MoviesList() {
  const pageRef = useRef(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const debouncedVal = useDebounce(search);
  const { data, loading, error } = useFetchMovies(page, start_date, end_date);

  const handleIntersection = (entries) => {
    const entry = entries[0];

    if (entry?.isIntersecting && search === "") {
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

  useEffect(() => {
    const filterdUsers = data?.filter((movie) => {
      return movie?.title?.toLowerCase()?.includes(search?.toLowerCase());
    });

    setMovieList(filterdUsers);
  }, [debouncedVal]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <section className={style.moviehead}>
        <div className={style.exploresection}>
          <div className={style.exploresectioninner}>
            <h3 className={style.heading}>Welcome.</h3>
            <h4>Millions of movies to discover. Explore now.</h4>

            <input
              type="text"
              className={style.searchinput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Serch for a movie..."
            />
          </div>
        </div>
      </section>
      <section className={style.moviesContainer}>
        {movieList?.length === 0 && !loading ? (
          <div className={style.notfound}>No movies found</div>
        ) : (
          <div className={style.movieslist}>
            {movieList?.map((movie) => (
              <MovieCard key={movie?.id} movie={movie} />
            ))}
          </div>
        )}

        <div className={style.ref} ref={pageRef}></div>
      </section>
    </Layout>
  );
}

export default MoviesList;
