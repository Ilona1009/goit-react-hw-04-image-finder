import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
  };
  render() {
    return <SearchBar />;
  }
}
