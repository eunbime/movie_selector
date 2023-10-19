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
    const movies = data.results;

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

    const search = document.querySelector("#search");
    const searchIcon = document.querySelector("#searchIcon");

    // 영화 카드 불러오기
    const showMovies = (list) => {
      let listCards = document.querySelector(".movie_cards");

      list.forEach((movie) => {
        const listCard = document.createElement("div");
        const listImg = document.createElement("img");
        const listTitle = document.createElement("h3");
        const listRating = document.createElement("span");
        const posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        listImg.src = posterPath;
        listCard.appendChild(listImg);
        listTitle.innerText = movie.title;
        listRating.innerText = movie.vote_average;
        listCard.appendChild(listTitle);
        listCard.appendChild(listRating);
        listCards.appendChild(listCard);

        function idAlert(e) {
          e.preventDefault();
          alert(`id=${movie.id}`);
        }

        listCard.addEventListener("click", idAlert);
      });
    };

    function onSearchButtonClick(e) {
      let listCards = document.querySelector(".movie_cards");
      listCards.innerHTML = ""; // 초기화
      filteredMovies = movies.filter((movie) => {
        if (e) e.preventDefault();

        if (search.value) {
          // input 값이 들어오면
          return movie.title.includes(search.value); // 키워드를 포함한 movie.title 반환
        } else {
          return movie; // input 값이 들어오지 않을 때 (초기 상태) 전체 movie 데이터 반환
        }
      });
      search.value = "";
      showMovies(filteredMovies);
    }

    searchIcon.addEventListener("click", onSearchButtonClick);
    showMovies(movies);
  })
  .catch((err) => console.error(err));
