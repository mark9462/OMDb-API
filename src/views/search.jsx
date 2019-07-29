import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import apikey from '../apikey.json';

class searchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      getResponse: false,
      pagination: [1, 2, 3],
      lastPage: 0
    };
    this.changePagination = this.changePagination.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    const query = this.props.location.state;
    this.getMovieList(query);
  }

  getMovieList = (query, page = 1) => {
    fetch(`http://www.omdbapi.com/?apikey=${apikey.key}&${query}&page=${page}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ getResponse: true });
        if (data.Response === 'True') {
          this.setState({
            movieList: data.Search,
            lastPage: Math.ceil(data.totalResults / 30)
          });
        }
      })
      .catch(error => console.error(error));
  };

  changePagination(e) {
    let newPagination = [];
    const { pagination, lastPage } = this.state;
    if (e.target.value === 'previous') {
      newPagination = pagination[0] - 1 > 0 ? pagination.map(item => item - 1) : pagination;
    } else {
      newPagination = pagination[2] + 1 < lastPage
          ? pagination.map(item => item + 1)
          : pagination;
    }
    this.setState({ pagination: newPagination });
  }

  changePage(e) {
    const query = this.props.location.state;
    this.getMovieList(query, e.target.value);
  }

  render() {
    const { movieList, getResponse, pagination } = this.state;
    const title = new URLSearchParams(this.props.location.state).get('s');
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
    const pages = pagination.map(item => (
      <li className="page-item" key={item}>
        <button
          className="page-link"
          type="button"
          value={item}
          onClick={this.changePage}
        >
          {item}
        </button>
      </li>
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
      <Fragment>
        <Header />
        <div className="container main-height">
          <br />
          {movieList.length > 0 ? (
            <Fragment>
              <div className="alert alert-success" role="alert">
                "{title}" search result:
              </div>
              <div className="row">{result}</div>
              <nav>
                <ul className="pagination d-flex justify-content-center">
                  <li className="page-item">
                    <button
                      className="page-link"
                      type="button"
                      onClick={this.changePagination}
                      value="previous"
                    >
                      &laquo;
                    </button>
                  </li>
                  {pages}
                  <li className="page-item">
                    <button
                      className="page-link"
                      type="button"
                      onClick={this.changePagination}
                      value="next"
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </Fragment>
          ) : (
            <div className="main-vertical-align">
              <div className="d-flex justify-content-center">{message}</div>
            </div>
          )}
        </div>
        <Footer />
      </Fragment>
    );
  }
}
export default searchPage;
