import * as React from "react";
import {NavLink} from 'react-router-dom';

import axios from 'axios';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = { 
      movie: {
        title: '',
      },
      ratings: [],
    }
  }

  componentDidMount() {
    axios.get('http://54.193.126.34:8000/api/movies/' + this.id + '/')
    .then(response => {
      this.setState({
        movie: response.data
      })
    })
    
    axios.get('http://54.193.126.34:8000/api/rating/' + this.id + '/')
    .then(response => {
      this.setState({
        ratings: response.data
      })
    })
  }

  tableRow(name, value) {
    return (
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    )
  }

  ratingRows() {
    return this.state.ratings.map( object => {
      return (
        <tr key={object.id}>
          <td><ProgressBar variant="warning" now={20 * object.rating} /></td>
          <td>{object.comment}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{this.state.movie.title}</Breadcrumb.Item>
        </Breadcrumb>
        <Table striped bordered hover variant="dark">
          <tbody>
            {this.tableRow('Title', this.state.movie.title)}
            {this.tableRow('Year', this.state.movie.year)}
            {this.tableRow('Rated', this.state.movie.rated)}
            {this.tableRow('Release Date', this.state.movie.released_on)}
            {this.tableRow('Genre', this.state.movie.genre)}
            {this.tableRow('Director', this.state.movie.director)}
            {this.tableRow('Plot', this.state.movie.plot)}
            <tr>
              <td>Average Rating</td>
              <td><ProgressBar variant="warning" now={20 * this.state.movie.avg_rating} /></td>
            </tr>
          </tbody>
        </Table>
        <p>Ratings</p>
        <NavLink to={'/rating/' + this.state.movie.id + '/'} className="nav-link"><Button>Add Rating</Button></NavLink>
        <Table striped bordered hover variant="dark">
          <thead>
            <th>Rating</th>
            <th>Comment</th>
          </thead>
          <tbody>
            {this.ratingRows()}
          </tbody>
        </Table>
      </div>
    );
  }
}
