"use client";

import { useEffect, useRef } from "react";

type Direction =
    | "none"
    | "left"
    | "right"
    | "up"
    | "down"
    | "upleft"
    | "upright"
    | "downright"
    | "downleft"
    | "random";

interface EffectProp {
    height: number;
    width: number;
    count: number;
    direction?: Direction;
    speed?: number;
    bgColor?: string;
    flakeColor?: string;
}

interface Flake {
    x: number;
    y: number;
    r: number;
    direction: Direction;
}

export default function EffectProvider({
    height,
    width,
    count,
    direction,
    speed,
}: EffectProp) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const flakesRef = useRef<Flake[]>([]);

    useEffect(() => {
        if (height === 0 && width === 0) return;

        const myCanvas = canvasRef.current;
        if (!myCanvas) return;

        myCanvas.height = height;
        myCanvas.width = width;

        const ctrl = myCanvas.getContext("2d");
        if (!ctrl) return;

        const positionPicker = () => {
            for (let i = 0; i < count; i++) {
                let [x, y, r] = [
                    Math.floor(Math.random() * width),
                    Math.floor(Math.random() * height),
                    Math.floor(Math.random() * 5),
                ];

                if (x <= width && y <= height) {
                    console.log(i, x, y, r);
                    flakesRef.current.push({
                        x: x,
                        y: y,
                        r: r,
                        direction: direction ? direction : "left",
                    });
                } else {
                    --i;
                }
            }
        };
        positionPicker();

        const drawShape = () => {
            ctrl.clearRect(0, 0, width, height);
            flakesRef.current.map((val) => {
                ctrl.beginPath();
                ctrl.arc(val.x, val.y, val.r, 0, 2 * Math.PI);
                ctrl.fillStyle = "white";
                ctrl.fill();
                ctrl.closePath();
            });
        };
        drawShape();

        const moveShape = () => {
            flakesRef.current.map((val) => {
                switch (val.direction) {
                    case "left":
                        val.x -= speed ? speed : 0.1;
                        if (val.x < 0) {
                            val.x = width;
                            val.y = Math.floor(Math.random() * height);
                        }
                        break;
                    case "right":
                        val.x += speed ? speed : 0.1;
                        if (val.x > width) {
                            val.x = 0;
                            val.y = Math.floor(Math.random() * height);
                        }
                        break;
                    case "up":
                        val.y -= speed ? speed : 0.1;
                        if (val.y < 0) {
                            val.y = height;
                            val.x = Math.floor(Math.random() * height);
                        }
                        break;
                    case "down":
                        val.y += speed ? speed : 0.1;
                        if (val.y > height) {
                            val.y = 0;
                            val.x = Math.floor(Math.random() * height);
                        }
                        break;
                    case "upleft":
                        val.x -= speed ? speed : 0.1;
                        val.y -= speed ? speed : 0.1;
                        if (val.y < 0 || val.x < 0) {
                            val.y = height;
                            val.x = Math.floor(Math.random() * width);
                        }
                        break;
                    case "upright":
                        val.x += speed ? speed : 0.1;
                        val.y += speed ? speed : 0.1;
                        if (val.y > height || val.x > width) {
                            val.x = Math.floor(
                                Math.random() * width - width / 2
                            );
                            val.y = Math.floor(
                                Math.random() * height - height / 2
                            );
                        }
                        break;
                    case "downleft":
                        val.x -= speed ? speed : 0.1;
                        val.y += speed ? speed : 0.1;
                        if (val.y > height || val.x < 0) {
                            val.x = Math.floor(Math.random() * width);
                            val.y = Math.floor(
                                Math.random() * height - height / 2
                            );
                        }
                        break;
                    case "downright":
                        val.x += speed ? speed : 0.1;
                        val.y -= speed ? speed : 0.1;
                        if (val.x > width || val.y < 0) {
                            val.y = Math.floor(Math.random() * height);
                            val.x = Math.floor(Math.random() * width);
                        }
                        break;
                    case "none":
                        break;

                    default:
                        break;
                }

                drawShape();
            });
            requestAnimationFrame(moveShape);
        };
        moveShape();
    }, [width, height]);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: "block", backgroundColor: "black" }}
        />
    );
}
