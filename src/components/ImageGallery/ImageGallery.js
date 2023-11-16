import { Gallery, ImageItem } from './ImageGalleryStyled';

export function ImageGallery({ images }) {
  return (
    <Gallery>
      {images.map(img => (
        <ImageItem key={img.id} image={img} />
      ))}
    </Gallery>
  );
}
