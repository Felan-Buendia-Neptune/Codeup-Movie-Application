
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


function fetchHandler(event) {
    displayLoading()

    fetch('https://abundant-automatic-knee.glitch.me/movies')
        .then(response => response.json())
        .then(movies => {
            hideLoading()
            console.log(movies)
            let htmlStr = "";
            for(let movie of movies){
                htmlStr += `<h1>${movie.title}</h1><p> Directed by: ${movie.director} <br> <img src="${movie.poster}"> </p>`
            }
            $("#container").html(htmlStr)

        });
}

$(document).ready( function () {
    fetchHandler(event);
});


//
// const getMovies = () => {
//     fetch('https://abundant-automatic-knee.glitch.me/movies')
//         .then(response => response.json())
//         .then(movies => {
//
//             console.log(movies)
//             let htmlStr = "";
//             for(let movie of movies){
//                 htmlStr += `<h1>${movie.title}</h1><p> Directed by: ${movie.director} <br> <img src="${movie.poster}"> </p>`
//             }
//             $("#container").html(htmlStr)
//
//         });
// };
//
// getMovies()


