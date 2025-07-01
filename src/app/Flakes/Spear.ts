import { RefObject } from "react";
import { Direction, EdgeBehavior } from "../EffectTypes";

interface MoveConfig {
    mouseRepel?: boolean;
    gravity?: boolean;
    edgeBehavior?: EdgeBehavior;
    customShape?: "circle" | "square" | "triangle";
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
    constructor(
        private ctx: CanvasRenderingContext2D,
        private flakesRef: RefObject<any[]>,
        private speedRef: RefObject<number>,
        private width: number,
        private height: number,
        private flakeColor: string
    ) {}

    generateFlakes(count: number, direction: Direction, width: number, height: number) {
        this.flakesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
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

        const animate = () => {
            const { ctx, flakesRef, width, height, speedRef } = this;

            if (!ctx) return;

            ctx.clearRect(0, 0, width, height);

            flakesRef.current.forEach((flake) => {
                let { x, y, dx, dy, size } = flake;

                // Update movement
                if (gravity) dy += 0.05;
                flake.x += dx * speedRef.current;
                flake.y += dy * speedRef.current;

                // Edge handling
                if (edgeBehavior === "wrap") {
                    if (flake.x > width) flake.x = 0;
                    if (flake.x < 0) flake.x = width;
                    if (flake.y > height) flake.y = 0;
                    if (flake.y < 0) flake.y = height;
                } else if (edgeBehavior === "bounce") {
                    if (flake.x <= 0 || flake.x >= width) flake.dx *= -1;
                    if (flake.y <= 0 || flake.y >= height) flake.dy *= -1;
                }

                // Draw flake
                ctx.beginPath();
                ctx.globalAlpha = opacity;

                switch (customShape) {
                    case "square":
                        ctx.fillStyle = this.flakeColor;
                        ctx.fillRect(flake.x, flake.y, size, size);
                        break;
                    case "triangle":
                        ctx.fillStyle = this.flakeColor;
                        ctx.moveTo(flake.x, flake.y);
                        ctx.lineTo(flake.x - size, flake.y + size);
                        ctx.lineTo(flake.x + size, flake.y + size);
                        ctx.closePath();
                        ctx.fill();
                        break;
                    default:
                        ctx.fillStyle = this.flakeColor;
                        ctx.arc(flake.x, flake.y, size, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                }

                ctx.globalAlpha = 1;
            });

            requestAnimationFrame(animate);
        };

        animate();
    }
}