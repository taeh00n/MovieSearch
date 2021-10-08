getNewRelease();

function displayResults(results) {
    document.querySelector("#bruh").innerHTML = "";
    document.querySelector("#search-num").innerHTML = "";
    document.querySelector("#empty").innerHTML ="";
    // Convert the JSON formatted string to JS objects! JSON.parse() converts JSON formatte STRING to JS OBJECTS
    let convertedResults = JSON.parse(results);
    //console.log(convertedResults.results[0]);
    // For every result, dynamically generate <tr> and <td> tags
    for( let i = 0; i < convertedResults.results.length; i++) {
        var htmlString;
        let posterImg = "https://image.tmdb.org/t/p/w500" + convertedResults.results[i].poster_path;
        let movieTitle = convertedResults.results[i].original_title;
        let releaseDate = convertedResults.results[i].release_date;
        let numVotes = convertedResults.results[i].vote_count;
        let rating = convertedResults.results[i].vote_average;
        let description = (convertedResults.results[i].overview).substring(0,200) + "...";
        if(convertedResults.results[i].poster_path == null) {
            htmlString = `
            <div class="col col-6 col-md-4 col-lg-3 p-2 mt-2">
                <div class="poster">
                    <img class="photo" src="notAvailable.png">
                    <div class="metrics">
                        <p>Votes: ${numVotes}</p>
                        <p>Rating: ${rating}</p>
                        <p>${description}</p>
                    </div>
                </div>
                <div class="info">
                    <p>${movieTitle}</p>
                    <p>${releaseDate}</p>
                </div>    
            </div>
            `;
        } else {
            htmlString = `
            <div class="col col-6 col-md-4 col-lg-3 p-2 mt-2">
                <div class="poster">
                    <img class="photo" src=${posterImg}>
                    <div class="metrics">
                        <p>Votes: ${numVotes}</p>
                        <p>Rating: ${rating}</p>
                        <p>${description}</p>
                    </div>
                </div>
                <div class="info">
                    <p>${movieTitle}</p>
                    <p>${releaseDate}</p>
                </div>    
            </div>
            `;
        }
        document.querySelector("#bruh").innerHTML += htmlString;
    }
    if(convertedResults.results.length == 0) {
        document.querySelector("#empty").innerHTML ="No Results"
    }
    htmlString = `
    <p>Showing ${convertedResults.results.length} of ${convertedResults.total_results} movies</p>
    `;
    document.querySelector("#search-num").innerHTML = htmlString;
}

function ajax(endpoint, displayResults) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", endpoint);
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4) {
            if(httpRequest.status == 200) {
                displayResults(httpRequest.responseText);
            }
        }
    }
}

function getNewRelease() {
    let endpoint = "https://api.themoviedb.org/3/movie/now_playing?api_key=b6a9d88a06534b8f5e7bbea8e0e166e6&language=en-US&page=1";
    ajax(endpoint, displayResults);
}

document.querySelector("#search-form").onsubmit = function(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-id").value.trim();
    let endpoint = "https://api.themoviedb.org/3/search/movie?api_key=b6a9d88a06534b8f5e7bbea8e0e166e6&language=en-US&query=" + encodeURIComponent(searchInput) + "&include_adult=false";
    ajax(endpoint, displayResults);
}