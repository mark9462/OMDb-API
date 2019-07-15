import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

class searchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: [], getResponse: false };
  }

  componentDidMount() {
    const query = this.props.location.state;
    this.getMovieList(query);
  }

  getMovieList = (query) => {
    fetch(`http://www.omdbapi.com/?apikey=8aff09d1&${query}`)
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
    const { movieList, getResponse } = this.state;
    let message = '';
    const result = movieList.map(list => (
      <div className="col-sm-6 col-md-4 col-lg-3" key={list.imdbID}>
        <Link
          to={{
            pathname: '/item',
            state: list.imdbID
          }}
        >
          <div className="card">
            <img className="card-img-top" src={list.Poster} />
            <div className="card-body">
              <h5 className="card-title book-title text-center">
                {' '}
                {list.Title}
              </h5>
            </div>
          </div>
        </Link>
      </div>
    ));
    if (!getResponse) {
      message = 'Loading...';
    }
    if (getResponse && movieList.length === 0) {
      message = 'Oops something went wrong...';
    }
    return (
      <div>
        <Header />
        <div className="container-fluid main-height">
          {message.length > 0 ? (
            <div className="main-vertical-align">
              <h1 className="text-center mb-5">{message}</h1>
            </div>
          ) : (
            <div>
              <br />
              <div className="alert alert-success" role="alert">
                Search result:
              </div>
              <div className="row">{result}</div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
export default searchPage;
