import * as React from "react";

import axios from 'axios';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Rating extends React.Component {

  constructor(props) {
    super(props);
    this.mid = this.props.match.params.mid;
    this.state = { 
      movie: {
        title: '',
      },
      rating: {
        rating: 1,
        comment: '',
      },
    }
  }
  
  componentDidMount() {
    axios.get('http://54.193.126.34:8000/api/movies/' + this.mid + '/')
    .then(response => {
      this.setState({
        movie: response.data
      })
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    const rating = {
      rating: this.state.rating.rating,
      comment: this.state.rating.comment,
      movie: this.state.movie.id,
    };

    axios.post(`http://54.193.126.34:8000/api/rating/`, rating)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push('/movie/' + this.state.movie.id + '/');
      })
  }

  handleChangeRating = event => {
    let rating = this.state.rating;
    rating.rating = Number(event.target.value);
    this.setState(
      {
        rating: rating,
      }
    );
  }

  handleChangeComment = event => {
    let rating = this.state.rating;
    rating.comment = event.target.value;
    this.setState(
      {
        rating: rating,
      }
    );
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/" >Home</Breadcrumb.Item>
          <Breadcrumb.Item href={'/#/movie/' + this.mid +'/'} >{this.state.movie.title}</Breadcrumb.Item>
          <Breadcrumb.Item active>Add Rating</Breadcrumb.Item>
        </Breadcrumb>
        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control as="select" onChange={this.handleChangeRating} >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control id="comment" as="textarea" rows="3" onChange={this.handleChangeComment} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
