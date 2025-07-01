"use client";

import { useEffect, useRef } from "react";
import { EffectProp, Flake } from "./EffectTypes"; // or wherever you export types

export default function EffectProvider({
    height,
    width,
    count,
    flakeObject,
    direction = "left",
    speed = 0.1,
    bgColor = "white",
    flakeColor = "black",
    zIndex = "under",
    mouseRepel = false,
    interactive = false,
    bgOpacity = 1,
    gravity = false,
    opacity = 1,
    maxSize = 6,
    minSize = 1,
    edgeBehavior = "wrap",
    customShape = "circle",
    customImageSrc,
    fps,
    hoverColor,
    layer,
    children,
}: EffectProp & { children?: React.ReactNode }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const flakesRef = useRef<Flake[]>([]);
    const speedRef = useRef(speed);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || height === 0 || width === 0) return;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Instantiate flake logic object
        const flake = new flakeObject(
            ctx,
            flakesRef,
            speedRef,
            width,
            height,
            flakeColor
        );
        

        flake.generateFlakes(count, direction, width, height);
        flake.move();
    }, [width, height, count, direction, flakeColor]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                backgroundColor: bgColor,
            }}
        />
    );
}
