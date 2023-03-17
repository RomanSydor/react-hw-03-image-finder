import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";
import pixabayAPI from "./services/pixabay-api";

const Status = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

class App extends Component {
  state = {
    keyword: "",
    page: 1,
    images: null,
    isNewSearch: false,
    status: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevKeyword = prevState.keyword;
    const currentKeyword = this.state.keyword;
    const prevPage = prevState.page;
    const currentPage = this.state.page;
    const isNewSearch = this.state.isNewSearch;

    if (prevKeyword !== currentKeyword) {
      this.setState({ page: 1 });
      this.setState({ images: null });
      this.setState({ status: Status.PENDING });

      setTimeout(() => {
        pixabayAPI
          .getImages(currentKeyword, currentPage)
          .then((images) => {
            this.setState({ images: images.hits, status: Status.RESOLVED });
          })
          .catch((error) => this.setState({ error, status: Status.REJECTED }));
      }, 1000);
    }

    if (prevPage !== currentPage && !isNewSearch) {
      this.setState({ status: Status.PENDING });

      pixabayAPI
        .getImages(currentKeyword, currentPage)
        .then((images) => {
          this.setState((prevState) => ({
            images: [...prevState.images, ...images.hits],
            status: Status.RESOLVED,
          }));
        })
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }
  }

  onSearch = (keyword) => {
    this.setState({ keyword: keyword });
    this.setState({ isNewSearch: true });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isNewSearch: false,
    }));
  };

  render() {
    const { images, status, error } = this.state;

    return (
      <div className="App">
        <Searchbar search={this.onSearch} />
        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && (
          <>
            <ImageGallery images={images} />
            <Button onLoadMore={this.loadMore} />
          </>
        )}
        {status === Status.REJECTED && <div>{error.message}</div>}
      </div>
    );
  }
}

export default App;
