"use client";

import { CSSProperties, useEffect, useRef } from "react";

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
    direction = "left",
    speed = 0.1,
    bgColor = "white",
    flakeColor = "black",
}: EffectProp) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const flakesRef = useRef<Flake[]>([]);

    const speedRef = useRef(speed);
    const directionRef = useRef(direction);

    useEffect(() => {
        speedRef.current = speed;
        directionRef.current = direction;
    }, [speed, direction]);

    const generateFlakes = () => {
        flakesRef.current = Array.from({ length: count }, () => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * 5 + 1;
            return {
                x,
                y,
                r,
                direction:
                    direction === "random" ? getRandomDirection() : direction,
            };
        });
    };

    const getRandomDirection = (): Direction => {
        const directions: Direction[] = [
            "left",
            "right",
            "up",
            "down",
            "upleft",
            "upright",
            "downleft",
            "downright",
        ];
        return directions[Math.floor(Math.random() * directions.length)];
    };

    useEffect(() => {
        generateFlakes();
    }, [count, width, height, direction, speed, bgColor, flakeColor]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || height === 0 || width === 0) return;

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            for (const flake of flakesRef.current) {
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.r, 0, 2 * Math.PI);
                ctx.fillStyle = flakeColor;
                ctx.fill();
                ctx.closePath();
            }
        };

        const move = () => {
            for (const flake of flakesRef.current) {
                switch (flake.direction) {
                    case "left":
                        flake.x -= speed;
                        if (flake.x < 0) flake.x = width;
                        break;
                    case "right":
                        flake.x += speed;
                        if (flake.x > width) flake.x = 0;
                        break;
                    case "up":
                        flake.y -= speed;
                        if (flake.y < 0) flake.y = height;
                        break;
                    case "down":
                        flake.y += speed;
                        if (flake.y > height) flake.y = 0;
                        break;
                    case "upleft":
                        flake.x -= speed;
                        flake.y -= speed;
                        if (flake.x < 0 || flake.y < 0) {
                            flake.x = Math.random() * width;
                            flake.y = height;
                        }
                        break;
                    case "upright":
                        flake.x += speed;
                        flake.y -= speed;
                        if (flake.x > width || flake.y < 0) {
                            flake.x = Math.random() * width;
                            flake.y = height;
                        }
                        break;
                    case "downleft":
                        flake.x -= speed;
                        flake.y += speed;
                        if (flake.x < 0 || flake.y > height) {
                            flake.x = Math.random() * width;
                            flake.y = 0;
                        }
                        break;
                    case "downright":
                        flake.x += speed;
                        flake.y += speed;
                        if (flake.x > width || flake.y > height) {
                            flake.x = Math.random() * width;
                            flake.y = 0;
                        }
                        break;
                    case "none":
                        break;
                }
            }
            draw();
            requestAnimationFrame(move);
        };

        move();
    }, [width, height, speed, flakeColor]);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: "block", backgroundColor: bgColor }}
        />
    );
}
