import { getElement } from "./utils.mjs";

export class SearchBar {
  constructor() {
    this.input = getElement("#search-bar-input");
    this.button = getElement("#search-bar-button");
    this.init();
  }

  init() {
    this.initializeListeners();
  }

  initializeListeners() {
    this.input.addEventListener("keyup", (event) =>
      this.handleInput(event.key),
    );
    this.button.addEventListener("click", () => this.searchValue());
  }

  handleInput(key) {
    if (key === "Enter") this.searchValue();
  }

  searchValue() {
    if (this.input.validity.valid)
      window.location.assign(
        `/product-listing/index.html?search=${this.input.value}`,
      );
  }
}

export function initializeSearchBar() {
  new SearchBar();
}
