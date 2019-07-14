import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

class itemPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movieItem: {} };
  }

  componentDidMount() {
    const movieObj = this.props.location.state;
    this.setState({ movieItem: movieObj });
  }

  render() {
    const { movieItem } = this.state;
    return (
      <div>
        <Header />
        <br />
        <div className="container-fluid main-height">
          <div className="row">
            <div className="col-12 col-sm-4">
              <img src={movieItem.Poster} className="img-fluid" />
            </div>
            <div className="col-12 col-sm-8">
              <div className="d-flex justify-content-around">
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
              <hr />
              <p>{movieItem.Plot}</p>
              <p />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default itemPage;
