import { RefObject } from "react";
import { Direction, Flake } from "../EffectTypes";

export default class Spear {
    ctrl: CanvasRenderingContext2D;
    flakesRef: RefObject<Flake[]>;
    speedRef: RefObject<number>;
    width: number;
    height: number;
    flakeColor: string;

    constructor(
        ctrl: CanvasRenderingContext2D,
        flakesRef: RefObject<Flake[]>,
        speedRef: RefObject<number>,
        width: number,
        height: number,
        flakeColor: string
    ) {
        this.ctrl = ctrl;
        this.flakesRef = flakesRef;
        this.speedRef = speedRef;
        this.width = width;
        this.height = height;
        this.flakeColor = flakeColor;
    }

    draw = () => {
        this.ctrl.clearRect(0, 0, this.width, this.height);
        for (const flake of this.flakesRef.current) {
            this.ctrl.beginPath();
            this.ctrl.arc(flake.x, flake.y, flake.r, 0, 2 * Math.PI);
            this.ctrl.fillStyle = this.flakeColor;
            this.ctrl.fill();
            this.ctrl.closePath();
        }
    };

    getRandomDirection = (): Direction => {
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

    generateFlakes = (
        count: number,
        direction: Direction,
        width: number,
        height: number
    ) => {
        this.flakesRef.current = Array.from({ length: count }, () => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * 5 + 1;
            return {
                x,
                y,
                r,
                direction:
                    direction === "random"
                        ? this.getRandomDirection()
                        : direction,
            };
        });
    };

    move = () => {
        for (const flake of this.flakesRef.current) {
            switch (flake.direction) {
                case "left":
                    flake.x -= this.speedRef.current;
                    if (flake.x < 0) flake.x = this.width;
                    break;
                case "right":
                    flake.x += this.speedRef.current;
                    if (flake.x > this.width) flake.x = 0;
                    break;
                case "up":
                    flake.y -= this.speedRef.current;
                    if (flake.y < 0) flake.y = this.height;
                    break;
                case "down":
                    flake.y += this.speedRef.current;
                    if (flake.y > this.height) flake.y = 0;
                    break;
                case "upleft":
                    flake.x -= this.speedRef.current;
                    flake.y -= this.speedRef.current;
                    if (flake.x < 0 || flake.y < 0) {
                        flake.x = Math.random() * this.width;
                        flake.y = this.height;
                    }
                    break;
                case "upright":
                    flake.x += this.speedRef.current;
                    flake.y -= this.speedRef.current;
                    if (flake.x > this.width || flake.y < 0) {
                        flake.x = Math.random() * this.width;
                        flake.y = this.height;
                    }
                    break;
                case "downleft":
                    flake.x -= this.speedRef.current;
                    flake.y += this.speedRef.current;
                    if (flake.x < 0 || flake.y > this.height) {
                        flake.x = Math.random() * this.width;
                        flake.y = 0;
                    }
                    break;
                case "downright":
                    flake.x += this.speedRef.current;
                    flake.y += this.speedRef.current;
                    if (flake.x > this.width || flake.y > this.height) {
                        flake.x = Math.random() * this.width;
                        flake.y = 0;
                    }
                    break;
                case "none":
                    break;
            }
        }
        this.draw();
        requestAnimationFrame(this.move);
    };
}
