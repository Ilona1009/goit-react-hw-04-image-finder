import { Component } from 'react';
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
    this.setState(prevState => ({
      query: newQuery,
      page: 1,
      images: [],
    }));
  };
  async componentDidUpdate(prevProp, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      const initialImages = await fetchPhoto(query);
      const { hits, totalHits } = initialImages;
      console.log(hits);
    }
  }

  render() {
    const { images, query } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        <GlobalStyle />
      </div>
    );
  }
}
