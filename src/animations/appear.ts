import * as bezier from "bezier-easing";

let standardCurve = bezier(0.4, 0.0, 0.2, 1);
let decelerationCurve = bezier(0.0, 0.0, 0.2, 1);
let accellerationCurve = bezier(0.4, 0.0, 1, 1);
let sharpCurve = bezier(0.4, 0.0, 0.6, 1);

export let createAppearAnimation = (dependencies: {window: Window}, duration = 300) => {

  return (element: HTMLElement) => {
    let autoHeight = element.offsetHeight;
    let start = window.performance.now();

    let step = () => {
      let progress = (window.performance.now() - start) / duration;
      if (progress >= 1) {
        // done
        element.style.boxSizing = '';
        element.style.height = '';
        element.style.transform = '';
        element.style.opacity = '';
        (element as any).style['willChange'] = '';
        element.classList.remove('animating');
      } else {
        // progress
        let heightProgress = Math.min(1, progress * 1.5);
        let appearProgress = Math.max(0, progress * 1.2 - 0.2);
        let heightFactor = standardCurve(heightProgress);
        let appearFactor = decelerationCurve(appearProgress);
        element.style.height = `${heightFactor * autoHeight}px`;
        element.style.opacity = `${appearFactor}`;
        element.style.transform = `scaleX(${0.95 + 0.05 * appearFactor}) scaleY(${0.8 + 0.2 * appearFactor})`;
        requestAnimationFrame(step);
      }
    };

    // init
    (element as any).style['willChange'] = 'transform,opacity,height';
    element.style.boxSizing = 'border-box';
    element.style.transformOrigin = '50% 50%';
    element.style.height = '0px';
    element.style.opacity = '0';
    element.style.transform = 'scale(0.5)';
    element.classList.add('animating');

    requestAnimationFrame(step);
  }
};
