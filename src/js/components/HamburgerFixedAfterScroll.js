import { debounce } from "debounce";

const NavigationFixedAfterScroll = (function() {
  "use sctrict";
  let _active = false;
  let _scrollPos = 0;

  class NavigationFixed {
    constructor() {
      this.headerMiddle = document.querySelector("#headerMiddle");
      window.addEventListener(
        "scroll",
        debounce(this.checkScrollPosition.bind(this), 10)
      );
      debounce(this.checkScrollPosition(), 10);
    }
    checkScrollPosition() {
      if (scrollY > 50) {
        _active = true;
      } else {
        _active = false;
      }
      this.toggleClass();
    }
    toggleClass() {
      if (_active) {
        this.headerMiddle.classList.add("header-middle--scroll");
      } else {
        this.headerMiddle.classList.remove("header-middle--scroll");
      }
    }
  }
  return NavigationFixed;
})();

export default NavigationFixedAfterScroll;
