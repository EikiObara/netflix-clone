import './App.css';
import requests from './utils/request';
import Row from './components/Row';
import Banner from './components/Banner';


function App() {
  return (
    <div className="App">
      <Banner />
      <Row
        title="OSHIFLIX ORIGINALS"
        fetchUrl={requests.feachNetflixOriginals}
        isLargeRow
      />
      <Row title="Top Rated" fetchUrl={requests.feachTopRated}/>
      <Row title="Action Movies" fetchUrl={requests.feachActionMovies}/>
      <Row title="Comedy Movies" fetchUrl={requests.feachComedyMovies}/>
      <Row title="Horror Movies" fetchUrl={requests.feachHorrorMovies}/>
      <Row title="Romance Movies" fetchUrl={requests.feachRomanceMovies}/>
      <Row title="Documentaries" fetchUrl={requests.feachDocumentMovies}/>
    </div>
  );
}

export default App;
