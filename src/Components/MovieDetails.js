import { useState, useEffect } from "react";
import { KEY, Loader } from "./App";
import StarRating from "./StarRating";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Director: director,
    Genre: genre,
    Actors: actors,
  } = movie;

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  // console.log(title);
  // console.log(plot);

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          // console.log("CLOSING");
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  useEffect(
    function () {
      async function getMoviesDetails() {
        setIsloading(true);
        const res = await fetch(
          ` http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();
        //console.log(data);
        setMovie(data);
        setIsloading(false);
      }
      getMoviesDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      // the CLEANUP FUCTION gets returned once (after) the component gets unmounted
      return function () {
        document.title = "Popcorn";
        // console.log(
        //   `Clean up effect for movie ${title}. This title gets printed to the console, eventhough currently title is undefined (the component has been unmounted). This happens due to closure -> The function remembers the variables that were created when it was called`
        // );
      };
    },
    [title]
  );

  function handleAdd() {
    const newWatchedMovie = {
      title,
      imdbID: selectedId,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className="detail">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>

            <img src={poster} alt={`poster of the ${title} movie`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>

              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to List
                    </button>
                  )}
                </>
              ) : (
                <>
                  <p>
                    You rated this movie {watchedUserRating} <span>⭐️</span>
                  </p>
                </>
              )}
            </div>

            <em>{plot}</em>
            <p>Starring: {actors} </p>
            <p>Directed by: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
