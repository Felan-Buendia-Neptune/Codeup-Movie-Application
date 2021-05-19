const getMovies = () => {
    fetch('https://abundant-automatic-knee.glitch.me/movies')
        .then(response => response.json())
        .then(movies => {
            console.log(movies)
            let htmlStr = "";
            for(let movie of movies){
                htmlStr += `<h1>${movie.title}</h1><p> Directed by: ${movie.director} <br> <img src="${movie.poster}"> </p>`
            }
            $("#container").html(htmlStr)

        });
};

getMovies()