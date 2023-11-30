import { Gallery } from './ImageGalleryStyled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
export function ImageGallery({ images, onOpenModal }) {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem
          key={nanoid()}
          image={image}
          onOpenModal={onOpenModal}
        />
      ))}
    </Gallery>
  );
}
