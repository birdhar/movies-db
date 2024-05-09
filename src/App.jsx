import "./App.css";
import MoviesList from "./components/MoviesList";

function App() {
  const fetchMovie = () => {
    fetch("https://api.themoviedb.org/3/movie/changes");
  };
  return (
    <>
      <MoviesList />
    </>
  );
}

export default App;
