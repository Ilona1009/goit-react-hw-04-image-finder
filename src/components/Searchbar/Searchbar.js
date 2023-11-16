import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  SearchButton,
  SearchForm,
  SearchFormInput,
  SearchBar,
} from './SearchBarStyled';
export class Searchbar extends Component {
  state = {
    query: '',
  };
  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;

    if (query.trim() === '') {
      toast.warn('Please, enter correct search word!');
      return;
    }
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };
  render() {
    const { query } = this.state;
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit"></SearchButton>
          <SearchFormInput
            onChange={this.handleChange}
            type="text"
            name="query"
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchBar>
    );
  }
}
