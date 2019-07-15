import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import apikey from '../apikey.json';

class searchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: [], getResponse: false, title: '' };
  }

  componentDidMount() {
    const query = this.props.location.state;
    const qs = new URLSearchParams(query);
    this.setState({ title: qs.get('s') });
    this.getMovieList(query);
  }

  getMovieList = (query) => {
    fetch(`http://www.omdbapi.com/?apikey=${apikey.key}&${query}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ getResponse: true });
        if (data.Response === 'True') {
          this.setState({ movieList: data.Search });
        }
      })
      .catch(error => console.error(error));
  };

  render() {
    const { movieList, getResponse, title } = this.state;
    let message = '';
    const result = movieList.map(list => (
      <div className="col-sm-6 col-md-4 col-lg-3" key={list.imdbID}>
        <Link
          to={{
            pathname: '/item',
            state: list.imdbID
          }}
        >
          <div className="card mb-3">
            <img className="card-img-top" src={list.Poster} />
            <div className="card-body">
              <h5 className="card-title book-title text-center">
                {list.Title}
              </h5>
            </div>
          </div>
        </Link>
      </div>
    ));
    if (!getResponse) {
      message = (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    if (getResponse && movieList.length === 0) {
      message = <h1>Oops something went wrong...</h1>;
    }
    return (
      <div>
        <Header />
        <div className="container main-height">
          <br />
          {movieList.length > 0 ? (
            <div>
              <div className="alert alert-success" role="alert">
                "{title}" search result:
              </div>
              <div className="row">{result}</div>
            </div>
          ) : (
            <div className="main-vertical-align">
              <div className="d-flex justify-content-center">{message}</div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
export default searchPage;
