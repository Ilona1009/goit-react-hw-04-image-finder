import { Gallery, ImageItem } from './ImageGalleryStyled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
export function ImageGallery({ images, onOpenModal }) {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onOpenModal={onOpenModal}
        />
      ))}
    </Gallery>
  );
}
