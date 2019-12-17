const Slider = (function() {
  let _activeSlide = 1;

  class mainSlider {
    constructor() {
      this.maxSize = document.querySelectorAll(".slider__image").length;
      this.items = [...document.querySelectorAll(".slider__image")];
      this.controls = [...document.querySelectorAll(".slider__control")];
      this.startSlider();
      this.waiting = 50000;
      this.controls.forEach(control =>
        control.addEventListener("click", this.handleClickControl.bind(this))
      );
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

    takeCurrentImage() {
      return document.querySelector(`#slide${_activeSlide}`);
    }
    takeCurrentControl() {
      return document.querySelector(`#control${_activeSlide}`);
    }
    resetToStartSlide() {
      _activeSlide = 1;
    }
    showNextImage() {
      _activeSlide = ++_activeSlide;
    }
    showImage() {
      this.idInterval ? this.showNextImage() : this.startSlider();

      if (this.activeSlide > this.maxSize) {
        this.resetToStartSlide();
      }
      this.resetActiveClass(this.items, "slider__image--active");
      this.resetActiveClass(this.controls, "slider__control--active");

      this.addActiveClass(this.takeCurrentImage(), "slider__image--active");
      this.addActiveClass(this.takeCurrentControl(), "slider__control--active");
    }

    resetActiveClass(arr, className) {
      const notActiveSlides = arr
        .filter(item => item.id !== _activeSlide)
        .forEach(element => {
          element.classList.remove(className);
        });
    }
    addActiveClass(element, className) {
      element.classList.add(className);
      return element;
    }
    handleClickControl(e) {
      this.stopSlider();
      const id = e.target.id.slice(-1);
      _activeSlide = id;
      this.showImage();
    }
    startSlider() {
      this.idInterval = setInterval(() => {
        this.showImage();
      }, 4000);
    }
    stopSlider() {
      clearInterval(this.idInterval);
      this.idInterval = null;
    }
  }
  return mainSlider;
})();

export default Slider;
