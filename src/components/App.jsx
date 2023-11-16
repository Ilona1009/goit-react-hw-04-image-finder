import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPhoto } from './api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    per_page: 12,
  };

  handleFormSubmit = newQuery => {
    console.log(newQuery);
    this.setState(prevState => ({
      query: newQuery,
      page: 1,
      images: [],
    }));
  };

  render() {
    const { images, query } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={query} />
        <GlobalStyle />
        <ToastContainer />
      </div>
    );
  }
}
