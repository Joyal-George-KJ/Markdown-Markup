"use client";

import { useEffect, useRef } from "react";
import { EffectProp, Flake } from "./EffectTypes"; // or wherever you export types

export default function EffectProvider({
    height,
    width,
    count,
    direction = "left",
    speed = 0.1,
    bgColor = "white",
    flakeColor = "black",
    flakeObject,
}: EffectProp) {
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

        const flake = new flakeObject(
            ctx,
            flakesRef,
            speedRef,
            width,
            height,
            flakeColor,
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
