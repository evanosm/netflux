//RANDOM FUNCTIONS
//----------------------

function getRandomNumber() {
    return Math.floor(Math.random() * (1500 - 250 + 1)) + 250;
}

random = getRandomNumber();

console.log(random)

function getRandint20() {
    return Math.floor(Math.random() * (19 - 0 + 1)) + 0;
}

function getRandint100() {
    return Math.floor(Math.random() * (100 - 85 + 1)) + 85;
}

//----------------------
// LOADING
//----------------------


window.addEventListener('load', function () {
    setTimeout(function () {
        console.log('window loaded');
        //change opacity to 1 and display to block of #loading
        document.getElementById('loading').style.opacity = 0;
        //add class .header-logo to #logo
        //transform scale #logo .7
        document.getElementById('logo').style.top = "5vh";
        //left center #logo
        document.getElementById('logo').style.left = "10vw";
        document.getElementById('logo').style.transform = "translate(-50%,-50%) scale(.15)"


        setTimeout(function () {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('app').style.opacity = 1;
        }, 500);

    }, random);
});

//if #loading opacity === 0 wait 3s and opacity to 1 for #main
if (document.getElementById('loading').style.opacity === '0') {
    setTimeout(function () {
        console.log('main');
    }, random + 500);
}


//----------------------
// API
//----------------------
Vue.createApp({
    data() {
        return {
            landing : {
                title : 'title',
                desc :'overview',
                img : '',
                reco : 'note',
                releaseDate : 'release',
                genre: '',
            },
            topMovies : {
                title : 'title',
                desc :'overview',
                img : '',
                reco : 'note',
                releaseDate : 'release',
            },
            topSeries : {
                title : 'title',
                desc :'overview',
                img : '',
                reco : 'note',
                releaseDate : 'release',
            },
        }
    },
    methods : {        
        async getRandomPopularMovie(){
            const response = await fetch('http://api.themoviedb.org/3/movie/popular?api_key=318bb0040b1a8715cead77baa66bb0b8&language=fr-FR&page=1 ');
            const data = await response.json();
            randomNumber = getRandint20();
            this.landing.title = data.results[randomNumber].title;
            this.landing.desc = data.results[randomNumber].overview.substring(0,200) + "...";
            this.landing.img = 'https://image.tmdb.org/t/p/original' + data.results[randomNumber].poster_path;
            this.landing.reco = data.results[randomNumber].vote_average ;
            this.landing.releaseDate = data.results[randomNumber].release_date;   
        },
        async getTopMovies(){
            const responseTopMovie = await fetch('http://api.themoviedb.org/3/movie/top_rated?api_key=318bb0040b1a8715cead77baa66bb0b8&language=fr-FR&page=1 ');
            const dataTopMovies = await responseTopMovie.json();
            this.topMovies = dataTopMovies.results.slice(0,5); 
        },

        async getTopSeries(){
            const responseTopSeries = await fetch('http://api.themoviedb.org/3/tv/top_rated?api_key=318bb0040b1a8715cead77baa66bb0b8&language=fr-FR&page=1 ');
            const dataTopSeries = await responseTopSeries.json();
            console.log(dataTopSeries);
            this.topSeries = dataTopSeries.results.slice(0,5); 
        },
    },
    mounted(){
        console.log('succesfully mounted');
        this.getRandomPopularMovie();
        this.getTopMovies();
        this.getTopSeries();
    },
}).mount('#app')