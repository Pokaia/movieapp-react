import * as React from "react";
import {NavLink} from 'react-router-dom';

import axios from 'axios';

import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] }

    this.sortByReleaseDate = this.sortByReleaseDate.bind(this);
    this.sortByAverageRating = this.sortByAverageRating.bind(this);
  }

  componentDidMount() {
    axios.get('http://54.193.126.34:8000/api/movies/')
    .then(response => {
      this.setState({
        movies: response.data
      })
    })
  }

  dataRows() {
    return this.state.movies.map(object => {
      return (
        <tr key={object.id}>
          <td><NavLink to={'/movie/'+ object.id + '/'} className="nav-link">{object.title}</NavLink></td>
          <td>{object.released_on}</td>
          <td>{object.rated}</td>
          <td><ProgressBar variant="warning" now={20 * object.avg_rating} /></td>
        </tr>
      );
    });
  }

  sortByReleaseDate() {
    this.state.movies.sort((a, b) => {
      return a.released_on < b.released_on
    });

    this.setState(this.state);
  }

  sortByAverageRating() {
    this.state.movies.sort((a, b) => {
      return a.avg_rating < b.avg_rating
    });

    this.setState(this.state);
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="#" active>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Title</th>
              <th onClick={this.sortByReleaseDate} >Release Date</th>
              <th>Rated</th>
              <th onClick={this.sortByAverageRating} >Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {this.dataRows()}
          </tbody>
        </Table>
      </div>
    );
  }
}
