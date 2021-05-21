$(document).ready(function () {

    const loader = document.querySelector("#loading");

// showing loading
    function displayLoading() {
        $(loader).addClass("display");

// to stop loading after some time
        setTimeout(() => {
            $(loader).removeClass("display");
        }, 30000);
    };

// hiding loading
    function hideLoading() {
        $(loader).removeClass("display");
    };

    // display loading
    function fetchHandler(event) {
        displayLoading();
        getMovies();
    };

    $(document).ready(function () {
        fetchHandler(event);
    });


//display movie container
let moviesArray = []
    let getMovies = () => {
        fetch('https://abundant-automatic-knee.glitch.me/movies')
            .then(response => response.json())
            .then(movies => {
                hideLoading();
                console.log(movies);
                moviesArray = movies
                let htmlStr = "";
                let html = ""
                for (let movie of movies) {



                    htmlStr += `<div class="col-4"><div class="movieList card">
                <img class="card-img-top" src="${movie.poster}" alt="Card image cap">
                <div class="card-body">
                        <h1 class="card-title">${movie.title}</h1>
 <p class="card-text">
 Rating: ${movie.rating} <br>
 Year: ${movie.year} <br>
 Genre: ${movie.genre} <br>
 Directed by: ${movie.director} <br>
 Plot: ${movie.plot} <br>
 Actors: ${movie.actors} <br>
   
      </p> <button data-id="${movie.id}" class="delete-movie btn-secondary">Delete</button></div></div></div>`;


                    $("#container").html(htmlStr);
                    html += `<option value=${movie.id}>${movie.title}</option>`


                }
                $("#selectMenu").html("<option value='-1' selected>Select a movie</option>" + html)

                let deleteOptions = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                $(`.delete-movie`).click(function (event) {
                    let movieID = $(event.target).data("id")
                    console.log(movieID)

                    alert("this");
                    fetch(`https://abundant-automatic-knee.glitch.me/movies/${movieID}`, deleteOptions).then(getMovies)

                });

            });

    }

    //when the option selected is changed, update the given input to the movie that was selected
    $("#selectMenu").change(function (){
        let target = $(this).val()
        console.log(target)

            for(let movie of moviesArray){
                if(movie.id == target){
                    $("#newTitle").val(movie.title)
                    $("#newRating").val(movie.rating)
                    $("#newGenre").val(movie.genre)
                    $("#newDirector").val(movie.director)
                    $("#newPlot").val(movie.plot)
                    $("#newActors").val(movie.actors)
                }
            }
        }

    );
//actually what appends or patches the new info into the movies array on button click
    $("#changeMovie").click(function(){
        let input = $("#selectMenu").val()
        let insert = {
            title: $("#newTitle").val(),
            rating: $("#newRating").val(),
            genre: $("#newDirector").val(),
            plot: $("#newPlot").val(),
            actors: $("#newActors").val()
        };
        let patchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(insert),
        };
        fetch(`https://abundant-automatic-knee.glitch.me/movies/${input}`, patchOptions)
            .then(getMovies);

    });
    //Variables that grab the info to be edited on movie
    let editMovieTitle = document.getElementById("movie-title");

    let editMovieRating = document.getElementById("movie-rating");
    let editMoviePoster = document.getElementById("movie-poster");
    let editMovieYear = document.getElementById("movie-year");
    let editMovieGenre = document.getElementById("movie-genre");
    let editMovieDirector = document.getElementById("movie-director");
    let editMovieDescription = document.getElementById("movie-plot");
    let editMovieActors = document.getElementById("edit-movie-actors");

//the actual patch info
    let patchThis = {
        "title": editMovieTitle.value,
        "rating": editMovieRating.value,
        "poster": editMoviePoster.value,
        "year": editMovieYear.value,
        "genre": editMovieGenre.value,
        "director": editMovieDirector.value,
        "plot": editMovieDescription.value,
        "actors": editMovieActors.value
    };


//all of ADD movie JS
// New Movies add on butoon click
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

    //GRAB info for new movie add
    let newMovieTitle = document.getElementById("movie-title");
    console.log(newMovieTitle);
    let newMovieRating = document.getElementById("movie-rating");
    let newMoviePoster = document.getElementById("movie-poster");
    let newMovieYear = document.getElementById("movie-year");
    let newMovieGenre = document.getElementById("movie-genre");
    let newMovieDirector = document.getElementById("movie-director");
    let newMovieDescription = document.getElementById("movie-plot");
    let newMovieActors = document.getElementById("movie-actors");


});

