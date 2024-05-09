import useFormatDate from "../hooks/use-format-date";
import style from "../styles/Movies.module.css";
import { imageUrl } from "../utils/base";

function MovieCard({ movie }) {
  const date = useFormatDate(movie?.release_date);

  return (
    <div className={style.moviecard}>
      <div className={style.movie}>
        <img
          className={style.movieimg}
          src={`${imageUrl}${movie?.poster_path}`}
          alt=""
        />
      </div>
      <div className={style.popularity}>
        <div className={style.popularityinner}>
          {Math.ceil(movie?.popularity) >= 100
            ? "95"
            : Math.ceil(movie?.popularity)}
          <span>%</span>
        </div>
      </div>
      <h6 className={style.title}>{movie?.title}</h6>
      <p className={style.date}>{date}</p>
    </div>
  );
}

export default MovieCard;
