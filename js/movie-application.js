$(document).ready(function(){

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

//display container

    let getMovies = () => {
        fetch('https://abundant-automatic-knee.glitch.me/movies')
            .then(response => response.json())
            .then(movies => {
                hideLoading();
                console.log(movies);
                let htmlStr = "";
                for (let movie of movies) {
                    htmlStr += `<h1>${movie.title}</h1>
<p>
Rating: ${movie.rating} <br>
Year: ${movie.year} <br>
Genre: ${movie.genre} <br>
Directed by: ${movie.director} <br>
Plot: ${movie.plot} <br>
Actors: ${movie.actors} <br>
    <img src="${movie.poster}">
     </p> <button id="delete-${movies.id}">Delete</button>`

                    $("#container").html(htmlStr);
                    $(`#delete-${movie.id}`).click(function () {
                        fetch(`https://abundant-automatic-knee.glitch.me/movies/${movie.id}`, deleteOptions).then(getMovies)
                    })


                    let deleteOptions = {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                }
    });
    }


// display loading
    function fetchHandler(event) {
        displayLoading()
        getMovies()
    }

    $(document).ready( function () {
        fetchHandler(event);
    });


    //GRAB
    let newMovieTitle = document.getElementById("movie-title");
    console.log(newMovieTitle);
    let newMovieRating = document.getElementById("movie-rating");
    let newMoviePoster = document.getElementById("movie-poster");
    let newMovieYear = document.getElementById("movie-year");
    let newMovieGenre = document.getElementById("movie-genre");
    let newMovieDirector = document.getElementById("movie-director");
    let newMovieDescription = document.getElementById("movie-plot");
    let newMovieActors = document.getElementById("movie-actors");

    // New Movies add

    $("#new-movie-submit").click(() => {
        console.log(newMovieTitle.value);
        let postThis = {
            "title": newMovieTitle.value,
            "rating": newMovieRating.value,
            "poster": newMoviePoster.value,
            "year": newMovieYear.value,
            "genre": newMovieGenre.value,
            "director": newMovieDirector.value,
            "plot": newMovieDescription.value,
            "actors": newMovieActors.value
        };
        let postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postThis),
        };
        fetch('https://abundant-automatic-knee.glitch.me/movies', postOptions)
                    .then(getMovies);

            });
});

