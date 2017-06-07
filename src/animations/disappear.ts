import * as bezier from 'bezier-easing';

let standardCurve = bezier(0.4, 0.0, 0.2, 1);
let decelerationCurve = bezier(0.0, 0.0, 0.2, 1);
let accellerationCurve = bezier(0.4, 0.0, 1, 1);
let sharpCurve = bezier(0.4, 0.0, 0.6, 1);

export let createDisppearAnimation = (dependencies: { window: Window }, duration = 200) => {

  return (element: HTMLElement, removeElement: () => void) => {
    let autoHeight = element.offsetHeight;
    let start = window.performance.now();

    let step = () => {
      let progress = (window.performance.now() - start) / duration;
      if (progress >= 1) {
        // done
        removeElement();
      } else {
        // progress
        let factor = decelerationCurve(progress);
        element.style.height = `${autoHeight - autoHeight * factor}px`;
        element.style.opacity = `${Math.max(0, 1 - 2 * progress)}`;
        requestAnimationFrame(step);
      }
    };

    // init
    (element as any).style['willChange'] = 'opacity,height';
//    element.style.boxSizing = 'border-box';
    element.classList.add('animating');

    requestAnimationFrame(step);
  };
};
