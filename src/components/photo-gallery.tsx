import { useState } from 'react';
import { MasonryPhotoAlbum } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'react-photo-album/masonry.css';
import 'yet-another-react-lightbox/styles.css';

interface PhotoGalleryProps {
  images: {
    src: string;
    width: number;
    height: number;
  }[];
  fullSizeImages: {
    src: string;
  }[];
}

export default function PhotoGallery({ images, fullSizeImages }: PhotoGalleryProps) {
  const [index, setIndex] = useState(-1);

  return (
    <div>
      <MasonryPhotoAlbum photos={images} onClick={({ index: current }) => setIndex(current)} />
      <Lightbox
        index={index}
        slides={fullSizeImages}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </div>
  );
}
