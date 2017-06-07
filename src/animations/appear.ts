import * as bezier from 'bezier-easing';

let standardCurve = bezier(0.4, 0.0, 0.2, 1);
let decelerationCurve = bezier(0.0, 0.0, 0.2, 1);
let accellerationCurve = bezier(0.4, 0.0, 1, 1);
let sharpCurve = bezier(0.4, 0.0, 0.6, 1);

const STAGGER = 50;
const MAX_STAGGER = 500;

export let createStaggerAppearAnimation = (dependencies: { window: Window }, duration = 300) => {

  let lastStart = 0;

  return (element: HTMLElement) => {
    let autoHeight = element.offsetHeight;
    let start = window.performance.now();
    if (lastStart + STAGGER > start) {
      start = Math.min(start + MAX_STAGGER, lastStart + STAGGER);
    }
    lastStart = start;

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
        let heightProgress = Math.max(0, Math.min(1, progress * 2));
        let appearProgress = Math.max(0, progress * 1.5 - 0.5);
        let heightFactor = standardCurve(heightProgress);
        let appearFactor = decelerationCurve(appearProgress);
        element.style.height = `${heightFactor * autoHeight}px`;
        element.style.opacity = `${appearFactor}`;
        element.style.transform = `translateY(${20 - 20 * appearFactor}px)`;
        requestAnimationFrame(step);
      }
    };

    // init
    (element as any).style['willChange'] = 'transform,opacity,height';
//    element.style.boxSizing = 'border-box';
    element.style.transformOrigin = '50% 50%';
    element.style.height = '0px';
    element.style.opacity = '0';
    element.classList.add('animating');

    requestAnimationFrame(step);
  };
};
