
const loader = document.querySelector("#loading");




// showing loading
function displayLoading() {
    $(loader).addClass("display");

    // to stop loading after some time
    setTimeout(() => {
        $(loader).removeClass("display");
    }, 5000);
}

// hiding loading
function hideLoading() {
    $(loader).removeClass("display");
}


// // showing loading
// function displayLoading() {
//     loader.classList.add("display");
//     // to stop loading after some time
//     setTimeout(() => {
//         loader.classList.remove("display");
//     }, 5000);
// }
//
// // hiding loading
// function hideLoading() {
//     loader.classList.remove("display");
// }

let getMovies = () => {
    fetch('https://abundant-automatic-knee.glitch.me/movies')
    .then(response => response.json())
    .then(movies => {
        hideLoading();
        console.log(movies);
        let htmlStr = "";
        for(let movie of movies){
            htmlStr += `<h1>${movie.title}</h1>
<p>
Rating: ${movie.rating} <br>
 Year: ${movie.year} <br>
  Genre: ${movie.genre} <br>
   Directed by: ${movie.director} <br>
   Plot: ${movie.plot} <br>
   Actors: ${movie.actors} <br>
    <img src="${movie.poster}">
     </p>`;
        }
        $("#container").html(htmlStr)
        $("#add-movie")

    });
}


function fetchHandler(event) {
    displayLoading()
    getMovies()


    // fetch('https://abundant-automatic-knee.glitch.me/movies')
    //     .then(response => response.json())
    //     .then(movies => {
    //         hideLoading()
    //         console.log(movies)
    //         let htmlStr = "";
    //         for(let movie of movies){
    //             htmlStr += `<h1>${movie.title}</h1><p> Directed by: ${movie.director} <br> <img src="${movie.poster}"> </p>`
    //         }
    //         $("#container").html(htmlStr)
    //         $("#add-movie")
    //
    //     });
}

$(document).ready( function () {
    fetchHandler(event);
});

let newMovieTitle = document.getElementById("movie-title")
let newMovieRating = document.getElementById("movie-rating")
let newMoviePoster = document.getElementById("movie-poster")
let newMovieYear = document.getElementById("movie-year")
let newMovieGenre = document.getElementById("movie-genre")
let newMovieDirector = document.getElementById("movie-director")
let newMovieDescription = document.getElementById("movie-plot")
let newMovieActors = document.getElementById("movie-actors")

let newMovie = {
    "title": newMovieTitle.value,
    "rating": newMovieRating.value,
    "poster": newMoviePoster.value,
    "year": newMovieYear.value,
    "genre": newMovieGenre.value,
    "director": newMovieDirector.value,
    "plot": newMovieDescription.value,
    "actors": newMovieActors.value

}

let postThis = {
    "title": newMovieTitle.value,
    "rating": newMovieRating.value,
    "poster": newMoviePoster.value,
    "year": newMovieYear.value,
    "genre": newMovieGenre.value,
    "director": newMovieDirector.value,
    "plot": newMovieDescription.value,
    "actors": newMovieActors.value

}

let postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(postThis),
};

$("#new-movie-submit").click(() => {
    // fetch('https://abundant-automatic-knee.glitch.me/movies', postOptions)
    //     .then(getMovies);
    fetch('https://abundant-automatic-knee.glitch.me/movies')
        .then(response => response.json())
        .then(movies => {
            for (let movie of movies) {
                if(movie.title !== newMovie.title || movie.rating !== newMovie.rating || movie.year !== newMovie.year || movie.genre !== newMovie.genre || movie.director !== newMovie.director || movie.plot !== newMovie.plot || movie.actors !== newMovie.actors) {
                    fetch('https://abundant-automatic-knee.glitch.me/movies', postOptions)
                        .then(getMovies);
                } else {
                    alert("Hey, that movie already exists!");
                    break;
                }
            }
        })

});



