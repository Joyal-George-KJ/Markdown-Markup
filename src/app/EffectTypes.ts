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
    direction: Direction;
    speed: number;
    flakeColor: string;
    bgColor: string;
}

export interface EffectProp {
    height: number;
    width: number;
    count: number;
    flakeObject: any;
    direction?: Direction;
    speed?: number;
    bgColor?: string;
    flakeColor?: string;
}

export interface Flake {
    x: number;
    y: number;
    r: number;
    direction: Direction;
}