import { useState } from 'react';

export default function ImageGallery({ images = [], title = 'Stay' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const imageList = Array.isArray(images) && images.length > 0
    ? images
    : ['https://placehold.co/800x500?text=StayNest'];

  const activeImage = imageList[selectedIndex] || imageList[0];

  return (
    <div className="image-gallery">
      <div className="gallery-main">
        <img
          src={activeImage}
          alt={`${title} - photo ${selectedIndex + 1}`}
          className="gallery-featured-img"
        />
      </div>
      {imageList.length > 1 && (
        <div className="gallery-thumbnails">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`gallery-thumb-btn ${idx === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
            >
              <img src={img} alt={`${title} thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
