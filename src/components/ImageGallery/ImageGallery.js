import React, { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.css";

class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <ul className={s.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
