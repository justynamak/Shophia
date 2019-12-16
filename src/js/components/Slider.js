const Slider = (function() {
  let _activeSlide = 1;

  class mainSlider {
    constructor() {
      this.maxSize = document.querySelectorAll(".slider__image").length;
      this.items = [...document.querySelectorAll(".slider__image")];
      this.startShowImages();
      this.waiting = 50000;
    }
    get activeSlide() {
      return _activeSlide;
    }
    set activeSlide(number) {
      if (number > 0 && number < this.maxSize) {
        _activeSlide = number;
      } else if (number >= this.maxSize) {
        _activeSlide = 1;
      }
    }

    takeCurrentElement() {
      return document.querySelector(`#slide${_activeSlide}`);
    }
    resetToStartSlide() {
      _activeSlide = 1;
    }
    showNextImage() {
      _activeSlide = ++_activeSlide;
      if (this.activeSlide > this.maxSize) {
        this.resetToStartSlide();
      }
      this.resetActiveClass();
      this.takeCurrentElement().classList.add("slider__image--active");
    }
    startShowImages() {
      setInterval(() => {
        this.showNextImage();
      }, 4000);
    }
    resetActiveClass() {
      const notActiveSlides = this.items
        .filter(item => item.id !== _activeSlide)
        .forEach(element => {
          element.classList.remove("slider__image--active");
        });
    }
  }
  return mainSlider;
})();

export default Slider;
