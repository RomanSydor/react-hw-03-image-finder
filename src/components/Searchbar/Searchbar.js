import React, { Component } from "react";
import s from "./Searchbar.module.css";

class Saerchbar extends Component {
  state = {
    keyword: "",
  };

  onKeywordChange = (e) => {
    this.setState({ keyword: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.search(this.state.keyword);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            name="keyword"
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onKeywordChange}
          />
        </form>
      </header>
    );
  }
}

export default Saerchbar;
