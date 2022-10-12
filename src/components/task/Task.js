import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import './task.sass';

function clamp(value, min, max) {
    if (value < min)
        return min;
    if (value > max)
        return max;
    return value;
}

export default function Task(props) {

    const holdDelay = 100;

    const animateRef = useRef(null);

    const [icon, setIcon] = useState(props.icon || '\u{1f600}');
    const [title, setTitle] = useState(props.title || 'Task Title');
    const [desc, setDesc] = useState(props.desc || 'Task Description');

    const [hold, setHold] = useState(false);

    const [startX, setStartX] = useState(0);
    const [moveX, setMoveX] = useState(0);
    const [maxMoveX, setMaxMoveX] = useState(0);

    function draw(progress) {
        setMoveX(maxMoveX * (1 - progress));
    }

    function handleMouseDown(e) {
        setTimeout(() => {
            setStartX(e.screenX);
            setHold(true);
        }, holdDelay);
    }

    function handleMouseMove(e) {
        setMoveX(e.screenX);
    }

    function handleMouseUp(e) {
        setMaxMoveX(moveX);
        setHold(false);
        setStartX(0);
    }

    useEffect(() => {
    }, []);

    return (
        <div
            className={
                clsx("task non-selectable")
            }
        >
            <div className="icon">
                {icon}
            </div>
            <div className="text">
                <p className="title">{title}</p>
                <p className="desc">{desc}</p>
            </div>
        </div>
    );
} 