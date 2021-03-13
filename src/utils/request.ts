const API_KEY = process.env.REACT_APP_API_KEY;

const requests = {
    feachTrending:`/trending/all/week?api_key=${API_KEY}&language=ja`,
    feachNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    feachTopRated:`/discover/tv?api_key=${API_KEY}&language=ja`,
    feachActionMovies:`/discover/tv?api_key=${API_KEY}&with_genres=28`,
    feachComedyMovies:`/discover/tv?api_key=${API_KEY}&with_genres=35`,
    feachHorrorMovies:`/discover/tv?api_key=${API_KEY}&with_genres=27`,
    feachRomanceMovies:`/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    feachDocumentMovies:`/discover/tv?api_key=${API_KEY}&with_genres=99`,
};

export default requests;