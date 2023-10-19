const API_KEY = "7ea5a4480f6e34a1f8f87e7241924dd2";

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
    let movies = data.results;

    // 헤더 영화 랜덤 보여주기
    const title = document.querySelector(".movie_info .movie_title");
    const rating = document.querySelector(".movie_info .movie_rating");
    const summary = document.querySelector(".movie_info .movie_summary");
    const image = document.querySelector(".movie_header_image");
    const header = document.querySelector(".header");
    const rndMovie = movies[Math.floor(Math.random() * movies.length)];

    const backdropPath = `https://image.tmdb.org/t/p/w500/${rndMovie.backdrop_path}`;
    const posterPath = `https://image.tmdb.org/t/p/w500/${rndMovie.poster_path}`;
    const movieImg = document.createElement("img");
    movieImg.src = posterPath;
    image.appendChild(movieImg);
    header.style.backgroundImage = `url(${backdropPath})`;

    title.innerText = rndMovie.title;
    rating.innerText = rndMovie.vote_average;
    summary.innerText = rndMovie.overview;

    // 영화 카드 불러오기
    const search = document.querySelector("#search");
    const searchIcon = document.querySelector("#searchIcon");

    const showMovies = (list) => {
      let cardList = document.querySelector(".movie_cards");

      list.forEach((movie) => {
        const card = document.createElement("div");
        const cardImg = document.createElement("img");
        const cardTitle = document.createElement("h3");
        const cardRating = document.createElement("span");
        const posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        cardImg.src = posterPath;
        card.appendChild(cardImg);
        cardTitle.innerText = movie.title;
        cardRating.innerText = movie.vote_average;
        card.appendChild(cardTitle);
        card.appendChild(cardRating);
        cardList.appendChild(card);
      });
    };

    function onSearchButtonClick(e) {
      let cardList = document.querySelector(".movie_cards");
      cardList.innerHTML = "";
      filteredMovies = movies.filter(function (movie) {
        if (e) e.preventDefault();

        if (search.value) {
          return movie.title.includes(search.value);
        } else {
          return movie;
        }
      });
      search.value = "";
      showMovies(filteredMovies);
    }

    searchIcon.addEventListener("click", onSearchButtonClick);
    showMovies(movies);
  })
  .catch((err) => console.error(err));
