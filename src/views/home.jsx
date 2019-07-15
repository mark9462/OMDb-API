import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

class homePage extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', year: '', type: '' };
  }

  titleChange(e) {
    this.setState({ title: e.target.value.trim() });
  }

  yearChange(e) {
    this.setState({ year: e.target.value.trim() });
  }

  typeChange(e) {
    this.setState({ type: e.target.value });
  }

  handleSubmit() {
    const { title, year, type } = this.state;
    const arrary = [];
    let params = '';
    if (!title) {
      alert('You must have key in title！');
      return;
    }
    if (title) {
      arrary.push(`s=${title}`);
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
        <div className="container main-height d-flex align-items-center justify-content-center">
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
                <div className="row">
                  <div className="col-9">
                    <select
                      className="custom-select"
                      value={this.state.type}
                      onChange={e => this.typeChange(e)}
                    >
                      <option>Type</option>
                      <option value="movie">movie</option>
                      <option value="series">series</option>
                      <option value="episode">episode</option>
                    </select>
                  </div>
                  <div className="col-3">
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
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default homePage;
