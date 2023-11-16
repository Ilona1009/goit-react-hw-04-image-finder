import {
  ItemPicture,
  ImageItem,
} from 'components/ImageGallery/ImageGalleryStyled';

export function ImageGalleryItem({ image }) {
  return (
    <ImageItem as="li">
      <ItemPicture height={260} src={image.webformatURL} alt={image.tags} />
    </ImageItem>
  );
}
