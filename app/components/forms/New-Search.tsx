import React, { Component } from 'react';
import SearchItem from './Search-Form';

const testSearch = "Test Search"

class NewSearch extends Component{
  // handleSubmit = async testSearch => {
  //   const searchResult = testSearch;
  //   await //call to db
  // }
  handleSubmit = () => {
    return testSearch;
  };

  render() {
    return (
      <div>
        <div>
          <h1> Search </h1>
        </div>
        <div>
          {/* <SearchItem onSubmit={this.handleSubmit} /> */}
          <SearchItem />
        </div>
      </div>
    );
  }
}

export default NewSearch;
