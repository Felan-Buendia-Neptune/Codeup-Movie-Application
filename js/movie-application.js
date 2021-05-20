$(document).ready(function () {

    const loader = document.querySelector("#loading");

// showing loading
    function displayLoading() {
        $(loader).addClass("display");

// to stop loading after some time
        setTimeout(() => {
            $(loader).removeClass("display");
        }, 30000);
    }

// hiding loading
    function hideLoading() {
        $(loader).removeClass("display");
    }


//display container
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


                    htmlStr += `<h1>${movie.title}</h1>
 <p>
 Rating: ${movie.rating} 
 Year: ${movie.year} <br>
 Genre: ${movie.genre} <br>
 Directed by: ${movie.director} <br>
 Plot: ${movie.plot} <br>
 Actors: ${movie.actors} <br>
     <img src="${movie.poster}">
      </p> <button data-id="${movie.id}" class="delete-movie">Delete</button>
      <button data-id="${movie.id}" class="modal">Edit</button> `

                    $("#container").html(htmlStr);
                    html += `<option value=${movie.id}>${movie.title}</option>`;
                    // $("#selectMenu").html(`<option value='-1' selected>Select a movie</option>`)

                };
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

    //when the option selected is changed, update the input
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
                };
            };
        }

    );

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




// display loading
    function fetchHandler(event) {
        displayLoading();
        getMovies();
    };

    $(document).ready(function () {
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
    let editMovieTitle = document.getElementById("movie-title");
    console.log(newMovieTitle);
    let editMovieRating = document.getElementById("movie-rating");
    let editMoviePoster = document.getElementById("movie-poster");
    let editMovieYear = document.getElementById("movie-year");
    let editMovieGenre = document.getElementById("movie-genre");
    let editMovieDirector = document.getElementById("movie-director");
    let editMovieDescription = document.getElementById("movie-plot");
    let editMovieActors = document.getElementById("edit-movie-actors");

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
});

