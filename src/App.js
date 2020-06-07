import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import MovieList from "./MovieList";
import Movie from "./Movie";
import Rating from "./Rating";

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div className="content">
            <Route exact path="/" component={MovieList} />
            <Route path="/movie/:id/" component={Movie} />
            <Route path="/rating/:mid/" component={Rating} />
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
