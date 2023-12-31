const url = "https://imdb-top-100-movies.p.rapidapi.com/";
const options = {
 method: "GET",
 headers: {
   "X-RapidAPI-Key": "Your Generated API Key",
   "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
 },
};

const searchBar = document.getElementById("search-bar");
const resultsContainer = document.getElementById("results-container");
const movieUnavailableTxt = document.getElementById("movie-unavailable-txt");
let movieList;
let searchValue;
let moviesReturnedOnSearch;

// Function to fetch movies from the API
const fetchMovies = async () => {
 try {
   const response = await fetch(url, options);
   movieList = await response.json();

   // Storing the Movie Data in browser storage
   localStorage.setItem("moviedata", JSON.stringify(movieList));
   localStorage.setItem("cacheTimestamp", Date.now()); // Update cache timestamp

   // Render the movies on the page
   renderMovies(movieList);
 } catch (error) {
   movieUnavailableTxt.innerHTML =
     "An error occurred while fetching movies. <br /> Please try again later.";
   movieUnavailableTxt.style.display = "block";
   console.error(error);
 }
};

// Function to render movies on the page
const renderMovies = (movies) => {
 resultsContainer.innerHTML = ""; // Clear the existing movies
 movieUnavailableTxt.style.display = "none"; // Hide the "No movies found" message
 moviesReturnedOnSearch = []; // Clear the movies returned on search array

 movies.forEach((movie) => {
   resultsContainer.innerHTML += `
     <div class="movie-cards">
       <img src="${movie.image}" alt="movie image" class="movie-image" />
       <h2 class="title">${movie.title}</h2>
       <p class="plot">${movie.description}</p>
       <p class="date">${movie.year}</p>
     </div>
   `;

   moviesReturnedOnSearch.push(movie); // Add the movies that are a result to the search input value
 });
};

const cacheTimestamp = localStorage.getItem("cacheTimestamp");
const expirationDuration = 21600000; // 6 hours in milliseconds

// Check if cache has expired or data is not available
if (
 !cacheTimestamp ||
 Date.now() - parseInt(cacheTimestamp) > expirationDuration
) {
 // Cache expired or data not available, fetch movies again
 fetchMovies();
} else {
 // Use cached movie data
 movieList = JSON.parse(localStorage.getItem("moviedata"));
 renderMovies(movieList);
}

// Event listener and handler for search bar input
searchBar.addEventListener("input", (event) => {
 searchValue = event.target.value.trim().toLowerCase();

 // Filter movies based on search input
 const filteredMovies = movieList.filter((movie) =>
   movie.title.toLowerCase().includes(searchValue),
 );

 // Render the filtered movies on the page
 renderMovies(filteredMovies);

 if (moviesReturnedOnSearch.length <= 0) {
   movieUnavailableTxt.style.display = "block"; // Show the "No movies found" message if no movies match the search
 }
});
