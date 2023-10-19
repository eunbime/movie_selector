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

    // 영화 검색하기 => filter 사용
    const search = document.querySelector("#search");
    const searchIcon = document.querySelector("#searchIcon");

    // function paintResult(e) {
    //   e.preventDefault();

    //   if (search.value === "") {
    //     alert("영화 제목을 입력해주세요.");
    //   } else {
    //     // 검색어를 포함하는 영화일 때
    //     const resultList = movies.filter((movie) =>
    //       movie.title.includes(search.value)
    //     );
    //     resultList.map((result) => {

    //     })
    //     search.value = "";
    //     // 검색 리스트 출력
    //     console.log(resultList);
    //   }
    // }

    searchIcon.addEventListener("click", paintResult);

    // 영화 카드 불러오기
    let listCards = document.querySelector(".movie_cards");

    // 만약 search.value가 존재하는 경우 => 필터링을 적용
    // 만약 search.value가 존재하지 않는 경우 => 원래대로 map을 그대로 적용

    movies
      .filter(function (item) {
        if (search.value) {
          // 존재하는 경우 -> 필터링 적용
          console.log("키워드 존재 : " + search.value);
          console.log("키워드 존재 : " + item.title);
          if (item.title.includes(search.value)) {
            return true;
          } else {
            return false;
          }
        } else {
          // 존재하지 x -> 그대로 출력
          console.log("키워드 존재 X : " + search.value);
          console.log("키워드 존재 X : " + item.title);
          return true;
        }
      })
      .map((movie) => {
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
  })
  .catch((err) => console.error(err));
