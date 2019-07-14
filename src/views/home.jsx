import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

class homePage extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', year: '', type: '' };
  }

  titleChange(e) {
    this.setState({ title: e.target.value });
  }

  yearChange(e) {
    this.setState({ year: e.target.value });
  }

  typeChange(e) {
    this.setState({ type: e.target.value });
  }

  handleSubmit(e) {
    const { title, year, type } = this.state;
    const arrary = [];
    let params = '';
    if (!title && !year && !type) {
      alert('You must have key in something！');
      return;
    }
    if (title) {
      arrary.push(`t=${title}`);
    }
    if (year) {
      arrary.push(`y=${year}`);
    }
    if (type) {
      arrary.push(`type=${type}`);
    }
    params = arrary[0];
    if (arrary.length > 1) {
      for (let i = 1; i < arrary.length; i += 1) {
        params += `&${arrary[i]}`;
      }
    }

    this.props.history.push({
      pathname: '/search',
      state: params
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid main-height d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column">
            <h1 className="text-center mb-5">Let's find out...</h1>
            <div className="row">
              <div className="col-12 col-sm-4 d-flex align-items-center mb-3">
                <span className="mr-1 mb-0 h5">Title:</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={e => this.titleChange(e)}
                />
              </div>
              <div className="col-12 col-sm-4 d-flex align-items-center mb-3">
                <span className="mr-1 mb-0 h5">Year:</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.year}
                  onChange={e => this.yearChange(e)}
                />
              </div>
              <div className="col-12 col-sm-4">
                <select
                  className="custom-select w-75 mr-2"
                  value={this.state.type}
                  onChange={e => this.typeChange(e)}
                >
                  <option>Type</option>
                  <option value="movie">movie</option>
                  <option value="series">series</option>
                  <option value="episode">episode</option>
                </select>
                <button
                  className="btn btn-info"
                  type="button"
                  onClick={e => this.handleSubmit(e)}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default homePage;
