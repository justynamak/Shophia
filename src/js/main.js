import "../sass/main.scss";
import "../../node_modules/@fortawesome/fontawesome-free/js/all.js";

import NavigationMobile from "./components/NavigationMobile";
import NavFixed from "./components/HamburgerFixedAfterScroll";
import Slider from "./components/Slider";

window.addEventListener("DOMContentLoaded", function() {
  const nav = new NavigationMobile();
  const navScroll = new NavFixed();
  const mainSlider = new Slider();
  console.log(mainSlider);
});
