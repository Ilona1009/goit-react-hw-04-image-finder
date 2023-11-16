import { Component } from 'react';
import { Gallery, ImageItem } from './ImageGalleryStyled';
import { fetchPhoto } from 'components/api/api';

export class ImageGallery extends Component {
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      console.log(this.props.query);
      const initialImages = await fetchPhoto(this.props.query);
      const { hits, totalHits } = initialImages;
      console.log(hits);
    }
  }
  render() {
    return <div>{this.props.query}</div>;
  }
}
