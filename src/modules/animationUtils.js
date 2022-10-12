import { useEffect, useRef } from "react";

const useAnimationFrame = callback => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = time => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
}

export function linear(timeFraction) {
    return timeFraction;
}

export function makeEaseInOut(timing) {
    return function (timeFraction) {
        if (timeFraction < .5)
            return timing(2 * timeFraction) / 2;
        else
            return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
}

export function linearEaseInOut() {
    return makeEaseInOut(linear);
}

// export function animate({ timing, draw, duration }) {

//     let start = performance.now();

//     useAnimationFrame(function animate(time) {
//         // timeFraction изменяется от 0 до 1
//         let timeFraction = (time - start) / duration;
//         if (timeFraction > 1) timeFraction = 1;

//         // вычисление текущего состояния анимации
//         let progress = timing(timeFraction);

//         draw(progress); // отрисовать её

//         if (timeFraction < 1) {
//             useAnimationFrame(animate);
//         }

//     });
// }
