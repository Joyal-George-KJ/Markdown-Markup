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
        flake.move({
            mouseRepel,
            gravity,
            edgeBehavior,
            customShape,
            customImageSrc: "/image/cherry-blossom-petal.png",
            opacity,
            maxSize,
            minSize,
            fps,
            hoverColor,
            interactive,
            bgOpacity,
        });
    }, [
        width,
        height,
        count,
        direction,
        speed,
        flakeColor,
        bgColor,
        mouseRepel,
        gravity,
        edgeBehavior,
        customShape,
        customImageSrc,
        opacity,
        maxSize,
        minSize,
        fps,
        hoverColor,
        interactive,
        bgOpacity,
        flakeObject,
    ]);

    return (
        <div style={{ position: "relative", width, height }}>
            {zIndex === "under" && (
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: layer ?? 0,
                        backgroundColor: bgColor,
                        opacity: bgOpacity,
                        pointerEvents: "none",
                    }}
                />
            )}

            {children}

            {zIndex === "over" && (
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: layer ?? 9999,
                        backgroundColor: bgColor,
                        opacity: bgOpacity,
                        pointerEvents: "none",
                    }}
                />
            )}
        </div>
    );
}
