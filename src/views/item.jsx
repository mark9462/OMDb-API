import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import apikey from '../apikey.json';

class itemPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movieItem: {}, getResponse: false };
  }

  componentDidMount() {
    const movieID = this.props.location.state;
    this.getMovie(movieID);
  }

  getMovie(movieID) {
    fetch(`http://www.omdbapi.com/?apikey=${apikey.key}&i=${movieID}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ getResponse: true });
        if (data.Response === 'True') {
          this.setState({ movieItem: data });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    const { movieItem, getResponse } = this.state;
    return (
      <div>
        <Header />
        <div className="container main-height">
          <br />
          {getResponse ? (
            <div className="row">
              <div className="col-12 col-sm-4 text-center mb-4">
                <img src={movieItem.Poster} className="img-fluid" />
              </div>
              <div className="col-12 col-sm-8">
                <div className="bg-light">
                  <div className="d-flex justify-content-around align-items-baseline">
                    <p className="h2">{movieItem.Title}</p>
                    <p>
                      <span className="h4">{movieItem.imdbRating}</span>/10
                    </p>
                  </div>
                  <div className="d-flex justify-content-around">
                    <p>{movieItem.Runtime}</p>
                    <p>{movieItem.Genre}</p>
                    <p>{movieItem.Year}</p>
                  </div>
                  <p>
                    <span className="h5">Creator: </span>
                    {movieItem.Writer}
                  </p>
                  <p>
                    <span className="h5">Stars: </span>
                    {movieItem.Actors}
                  </p>
                </div>
                <hr />
                <p>{movieItem.Plot}</p>
                <p />
              </div>
            </div>
          ) : (
            <div className="main-vertical-align">
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
export default itemPage;
