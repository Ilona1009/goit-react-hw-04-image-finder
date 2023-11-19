import {
  ItemPicture,
  ImageItem,
} from 'components/ImageGallery/ImageGalleryStyled';

export function ImageGalleryItem({ image, onOpenModal }) {
  return (
    <ImageItem as="li">
      <ItemPicture
        height={260}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onOpenModal(image)}
      />
    </ImageItem>
  );
}
