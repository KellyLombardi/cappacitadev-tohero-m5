const API_KEY = 'api_key=d77db555e6c3592d41d53346ad28e905'
const API_BASE = 'https://api.themoviedb.org/3'
const API_URL = API_BASE + "/discover/movie?&language=pt-BR&sort_by=popularity.desc&" + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const searchURL = API_BASE + '/search/movie?' + API_KEY

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


getMovies(API_URL)

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Resumo</h3>
            ${overview}
        </div>`

        main.appendChild(movieEl);
    })
}

function getColor(vote) {
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const searchTerm = search.value 

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL)
    }

})