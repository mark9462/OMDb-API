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
    e.preventDefault();
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
        <div className="container-fluid main-height">
          <div className="main-vertical-align">
            <h1 className="text-center mb-5">Let's find out...</h1>
            <form
              className="form-inline justify-content-around"
              onSubmit={e => this.handleSubmit(e)}
            >
              <div className="form-group">
                <span className="mr-1 mb-0 h5">Title:</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={e => this.titleChange(e)}
                />
              </div>
              <div className="form-group">
                <span className="mr-1 mb-0 h5">Year:</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.year}
                  onChange={e => this.yearChange(e)}
                />
              </div>
              <div className="form-group">
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
              <div className="form-group">
                <input className="btn btn-info" type="submit" value="Go" />
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

// const homeComponent = () => (
//   <div>
//     <div className="container-fluid main-height">
//       <div className="main-vertical-align">
//         <h1 className="text-center mb-5">Let's find out...</h1>
//         <div className="row">
//           <div className="col-12 col-sm-4 d-flex align-items-center mb-3">
//             <span className="mr-1 mb-0 h5">Title:</span>
//             <input type="text" className="form-control" />
//           </div>
//           <div className="col-12 col-sm-4 d-flex align-items-center mb-3">
//             <span className="mr-1 mb-0 h5">Year:</span>
//             <input type="text" className="form-control" />
//           </div>
//           <div className="col-12 col-sm-4">
//             <select className="custom-select w-75 mr-2">
//               <option selected>Type</option>
//               <option value="movie">movie</option>
//               <option value="series">series</option>
//               <option value="episode">episode</option>
//             </select>
//             <Link
//               className="btn btn-info"
//               to={{
//                 pathname: '/search',
//                 search: '?sort=name'
//               }}
//             >
//               Go
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
export default homePage;
