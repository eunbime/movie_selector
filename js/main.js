const API_KEY = "7ea5a4480f6e34a1f8f87e7241924dd2";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWE1YTQ0ODBmNmUzNGExZjhmODdlNzI0MTkyNGRkMiIsInN1YiI6IjY1MmY5MzY3MDI0ZWM4MDEwMTU0NDFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nz9d2XK3u_dsHdjY7ScL6O4qMGn95lPDXk30MmeelLo",
  },
};

const fetchMovies = (data) => {
  const movies = data.results;
  const title = document.querySelector(".movie_info .movie_title");
  const rating = document.querySelector(".movie_info .movie_rating");
  const summary = document.querySelector(".movie_info .movie_summary");
  const image = document.querySelector(".movie_header_image");
  const header = document.querySelector(".header");
  const search = document.querySelector("#search");
  const searchBtn = document.querySelector("#searchBtn");
  const cardList = document.querySelector(".movie_cards");

  // 영화 헤더 불러오기
  const showMovieHeader = (movies) => {
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
  };

  // 영화 리스트 불러오기
  const showMovies = (list) => {
    list.forEach((movie) => {
      const posterImg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      const cardHTML = `
          <div data-id="${movie.id}">
            <img src="${posterImg}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <span>${movie.vote_average}</span>
            <p class="info">${movie.overview}</p>
          </div>
        `;
      cardList.innerHTML += cardHTML;
      console.log(cardList);
    });

    // id값 알림메시지 띄우기
    const cardElements = cardList.querySelectorAll("div[data-id]");
    cardElements.forEach((cardElement) => {
      cardElement.addEventListener("click", () => {
        const movieID = cardElement.getAttribute("data-id");
        alert(`id=${movieID}`);
      });
    });
  };

  // 검색 기능
  const onSearchButtonClick = (e) => {
    cardList.innerHTML = ""; // 리스트 초기화

    filteredMovies = movies.filter((movie) => {
      if (e) e.preventDefault();
      // toUpperCase()를 사용하여 대소문자 상관없이 비교
      let val = search.value.toUpperCase(); // 검색값
      let title = movie.title.toUpperCase(); // 영화 제목

      // input 값이 들어올 때
      if (val) {
        return title.includes(val); // 키워드를 포함한 movie.title 반환
      } else {
        return movie; // input 값이 들어오지 않을 때 (초기 상태) 전체 movie 데이터 반환
      }
    });
    console.log(search.value);
    search.value = "";
    showMovies(filteredMovies); // 필터링된 값을 인수로 showMovies() 함수 실행
  };

  // 엔터키를 입력했을 때 (e.code === "Enter") 함수 실행
  search.addEventListener("keyup", function (e) {
    if (e.code === "Enter") {
      onSearchButtonClick();
    }
  });

  searchBtn.addEventListener("click", onSearchButtonClick);

  showMovieHeader(movies);
  showMovies(movies);
};

fetch(
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
  options
)
  .then((response) => response.json())
  .then((data) => {
    // 초기 로드시 데이터 가져오기
    fetchMovies(data);
  })
  .catch((err) => {
    console.error(err);
  });
