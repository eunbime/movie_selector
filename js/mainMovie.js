const API_KEY = "7ea5a4480f6e34a1f8f87e7241924dd2";

// movies = [
//   // 여러 개의 movie 객체를 배열로 저장한다.
// ];

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWE1YTQ0ODBmNmUzNGExZjhmODdlNzI0MTkyNGRkMiIsInN1YiI6IjY1MmY5MzY3MDI0ZWM4MDEwMTU0NDFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nz9d2XK3u_dsHdjY7ScL6O4qMGn95lPDXk30MmeelLo",
  },
};

fetch(
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
  options
)
  .then((response) => response.json())
  .then((data) => {
    const title = document.querySelector(".movie_info .movie_title");
    const rating = document.querySelector(".movie_info .movie_rating");
    const summary = document.querySelector(".movie_info .movie_summary");
    const image = document.querySelector(".movie_header_image");
    const movieImg = document.createElement("img");
    const header = document.querySelector(".header");
    const movies = data.results;
    const rndMovie = movies[Math.floor(Math.random() * movies.length)];
    const backdropPath = `https://image.tmdb.org/t/p/w500/${rndMovie.backdrop_path}`;
    const posterPath = `https://image.tmdb.org/t/p/w500/${rndMovie.poster_path}`;
    movieImg.src = posterPath;
    header.style.backgroundImage = `url(${backdropPath})`;

    image.appendChild(movieImg);
    title.innerText = rndMovie.title;
    rating.innerText = rndMovie.vote_average;
    summary.innerText = rndMovie.overview;
  })
  .catch((err) => console.error(err));
