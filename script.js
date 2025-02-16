const key = "a29c87ac";
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
    } else {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response === "False") {
                    result.innerHTML = `<h3 class="msg" style="color:red; font-size:20px; text-align:center;">${data.Error}</h3>`;
                    return;
                }
                console.log(data);
                result.innerHTML = `
                        <div class="movie-info" id="result">
            <div class="movie-image">
            <a href="https://www.imdb.com/title/${data.imdbID}/" target="_blank"><img src="${data.Poster}" alt="Movie Poster" class="poster"></a>
            </div>
            <div class="movie-about">
                <h1>${data.Title}</h1>
                <div class="star">
                <i class="fa-solid fa-star"></i>
                <span>${data.imdbRating}</span>
                </div>
                <div class="movie-details">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
                </div>
                <div class="movie-genre">
                ${data.Genre.split(",").map(genre => `<span>${genre.trim()}</span>`).join("")}
                </div>
            </div>
        </div>
        <div class="movie-description">
            <div class="plot">
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            </div>
            <div class="cast">
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            </div>
            <div class="box-office">
            <h3>Awards:</h3>
            <p>${data.Awards}</p>
            </div>
        </div>
                `
            })
            .catch((err) => {
                result.innerHTML = `<h3 class="msg">Error occurred. Please try again.</h3>`;
            });
    }
};

window.addEventListener("load", () => {
    movieNameRef.value = "";
    result.innerHTML = "";
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getMovie();
});
movieNameRef.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getMovie();
    }
});