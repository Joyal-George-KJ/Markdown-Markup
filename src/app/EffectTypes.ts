export type FlakeShape = "circle" | "square" | "star" | "image";
export type Direction =
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

export interface DataType {
    count: number;
    speed: number;
    flakeObject: any;
    direction?: Direction;
    bgColor?: string;
    flakeColor?: string;

    // ✅ New Options
    mouseRepel?: boolean;
    customShape?: FlakeShape;
    customImageSrc?: string; // Required if shape === "image"
    edgeBehavior?: EdgeBehavior;
    zIndex?: LayerPosition;
    interactive?: boolean;
    bgOpacity?: number; // For trails or blending effects
    layer?: number; // For controlling stacking in DOM
    gravity?: boolean;
    opacity?: number; // Particle base opacity (0–1)
    maxSize?: number;
    minSize?: number;
    fps?: number;
    hoverColor?: string;
}
}

export interface Flake {
    x: number;
    y: number;
    r: number;
    direction: Direction;
}