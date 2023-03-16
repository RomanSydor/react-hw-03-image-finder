import React, { Component } from "react";
import s from "./ImageGalleryItem.module.css";
import ImageView from "../ImageView";
import Modal from "../Modal";

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { webformatURL, largeImageURL } = this.props;

    return (
      <>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ImageView largeImageURL={largeImageURL} />
          </Modal>
        )}

        <li className={s.ImageGalleryItem}>
          <img
            src={webformatURL}
            alt=""
            className={s.ImageGalleryItemImage}
            onClick={this.toggleModal}
          />
        </li>
      </>
    );
  }
}

export default ImageGalleryItem;
