import { debounce } from "debounce";

class NavigationMobile {
  constructor() {
    active: false;
    this.navIcon = document.querySelector("#mainNavIcon");
    this.navList = document.querySelector("#mainCollapsedMenu");
    this.navIconDiv = document.querySelector("#mainNavIcon div");
    this.container = document.querySelector(".container");

    this.navIcon.addEventListener("click", this.checkIsCollapsed.bind(this));
    window.addEventListener(
      "resize",
      debounce(this.calculatePositionIcon.bind(this), 10)
    );
    this.calculatePositionIcon();
  }

  toggleMenu() {
    if (this.active) {
      this.navList.classList.remove("collapsed-menu");
    } else {
      this.navList.classList.add("collapsed-menu");
    }
  }

  checkIsCollapsed() {
    const isCollapsed = this.navList.classList.contains("collapsed-menu");
    if (isCollapsed) {
      this.active = true;
    } else {
      this.active = false;
    }

    this.toggleMenu();
    this.animateIcon();
  }

  animateIcon() {
    if (this.active) {
      this.navIcon.classList.add("animate-icon");
      this.navIconDiv.classList.add("scale-icon");
    } else {
      this.navIcon.classList.remove("animate-icon");
      this.navIconDiv.classList.remove("scale-icon");
    }
  }
  calculatePositionIcon() {
    const containerStyle = window.getComputedStyle(this.container);

    const marginContainer = containerStyle
      .getPropertyValue("margin")
      .split(" ");
    const marginX = marginContainer[1];
    this.posIconLeft = marginX;
    this.setPositonToIcon();
  }
  setPositonToIcon() {
    this.navIcon.style.left = this.posIconLeft;
  }
}

export default NavigationMobile;
