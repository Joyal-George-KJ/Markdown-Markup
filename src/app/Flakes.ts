import { RefObject } from "react";
import { Direction, EdgeBehavior, Flake, FlakeShape } from "./EffectTypes";

interface MoveConfig {
    mouseRepel?: boolean;
    gravity?: boolean;
    edgeBehavior?: EdgeBehavior;
    customShape?: FlakeShape;
    customImageSrc?: string;
    opacity?: number;
    maxSize?: number;
    minSize?: number;
    fps?: number;
    hoverColor?: string;
    interactive?: boolean;
    bgOpacity?: number;
}

export class Spear {
    private mouse = { x: -1000, y: -1000 };
    private imageElement: HTMLImageElement | null = null;

    private loadImage(src: string) {
        if (!this.imageElement) {
            this.imageElement = new Image();
            this.imageElement.src = src;
        }
    }

    constructor(
        private ctx: CanvasRenderingContext2D,
        private flakesRef: RefObject<Flake[]>,
        private speedRef: RefObject<number>,
        private width: number,
        private height: number,
        private flakeColor: string
    ) {
        if (typeof window !== "undefined") {
            window.addEventListener("mousemove", this.handleMouseMove);
        }
    }

    private handleMouseMove = (e: MouseEvent) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    };

    generateFlakes(
        count: number,
        direction: Direction,
        width: number,
        radious: number,
        height: number
    ) {
        this.flakesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: radious ? radious : Math.random() * 3 + 1,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            direction,
        }));
    }

    move(config: MoveConfig = {}) {
        const {
            mouseRepel = false,
            gravity = false,
            edgeBehavior = "wrap",
            customShape = "circle",
            opacity = 1,
        } = config;

        if (customShape === "image" && config.customImageSrc) {
            this.loadImage(config.customImageSrc);
        }

        const animate = () => {
            const { ctx, flakesRef, width, height, speedRef } = this;
            if (!ctx || !flakesRef.current) return;

            ctx.clearRect(0, 0, width, height);

            for (const flake of flakesRef.current) {
                const speed = speedRef.current;
                let { x, y, dx, dy, r: size, direction } = flake;

                // Repulsion from mouse
                if (mouseRepel) {
                    const dist = Math.hypot(this.mouse.x - x, this.mouse.y - y);
                    const repulsionRadius = 10;

                    if (dist < repulsionRadius && dx && dy) {
                        const angle = Math.atan2(
                            y - this.mouse.y,
                            x - this.mouse.x
                        );
                        dx += Math.cos(angle);
                        dy += Math.sin(angle);
                    }
                }

                // Gravity
                if (gravity && dy) dy += 0.05;

                // Apply movement
                if (dx && dy) {
                    x += dx * speed;
                    y += dy * speed;
                }

                // Edge behavior
                if (edgeBehavior === "wrap") {
                    if (x > width) x = 0;
                    if (x < 0) x = width;
                    if (y > height) y = 0;
                    if (y < 0) y = height;
                } else if (edgeBehavior === "bounce" && dx && dy) {
                    if (x <= 0 || x >= width) dx *= -1;
                    if (y <= 0 || y >= height) dy *= -1;
                }

                // Update flake properties
                flake.x = x;
                flake.y = y;
                flake.dx = dx;
                flake.dy = dy;

                // Direction Change
                switch (direction) {
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

                // Draw flake
                ctx.beginPath();
                ctx.globalAlpha = opacity;
                ctx.fillStyle = this.flakeColor;

                switch (customShape) {
                    case "square":
                        ctx.fillRect(x, y, size, size);
                        break;
                    case "star":
                        this.drawStar(x, y, 5, size, size / 2);
                        break;
                    case "image":
                        if (this.imageElement?.complete) {
                            ctx.drawImage(
                                this.imageElement,
                                x,
                                y,
                                size * 4,
                                size * 4
                            );
                        }
                        break;
                    default:
                        ctx.arc(x, y, size, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                }

                ctx.globalAlpha = 1;
            }

            requestAnimationFrame(animate);
        };

        animate();
    }

    private drawStar(
        x: number,
        y: number,
        points: number,
        outer: number,
        inner: number
    ) {
        const step = Math.PI / points;
        this.ctx.beginPath();
        for (let i = 0; i < 2 * points; i++) {
            const r = i % 2 === 0 ? outer : inner;
            const angle = i * step;
            const sx = x + r * Math.cos(angle);
            const sy = y + r * Math.sin(angle);
            i === 0 ? this.ctx.moveTo(sx, sy) : this.ctx.lineTo(sx, sy);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
}
