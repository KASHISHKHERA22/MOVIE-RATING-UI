const main = document.querySelector('#main');
const movie = document.querySelector('.movie');
const movieInfo = document.querySelector('.movieInfo');
const overview = document.querySelector('.overview')

const API_KEY = 'your api key';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const form = document.querySelector('#form');
const search = document.querySelector('#search');
const btn = document.querySelector('#btn')

const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

getMovies(API_URL)
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);

    })
}


function showMovies(data) {
    main.innerHTML = ''
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}"
                alt="${title}">

            <div class="movieInfo">
                <h3>${title}</h3>
                <span class="green">${vote_average}</span>
            </div>
            <div class="overview">
               ${overview}
            </div>`
        main.appendChild(movieEl);
    })
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm)
    }
    else {
        getMovies(API_URL)

    }
})




