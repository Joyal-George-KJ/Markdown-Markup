import { JSX, useEffect, useState } from "react";
import { DataType, Direction, FlakeShape } from "./EffectTypes";

type ControlBarProps = {
    data: DataType;
    setData: (data: DataType) => void;
    toggler: () => void;
};

interface DirectionSVG {
    [key: string]: JSX.Element;
}

const directionSVG: DirectionSVG = {
    up: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-up"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
            />
        </svg>
    ),
    upright: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-up-right"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
            />
        </svg>
    ),

    right: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
        </svg>
    ),

    downright: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down-right"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0z"
            />
        </svg>
    ),

    down: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
            />
        </svg>
    ),

    downleft: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down-left"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0z"
            />
        </svg>
    ),

    left: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
        </svg>
    ),

    upleft: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-up-left"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M2 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H3.707l10.147 10.146a.5.5 0 0 1-.708.708L3 3.707V8.5a.5.5 0 0 1-1 0z"
            />
        </svg>
    ),

    random: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrows-move"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"
            />
        </svg>
    ),

    none: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-ban"
            viewBox="0 0 16 16"
        >
            <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
        </svg>
    ),
};

export default function ControlBar({
    data,
    setData,
    toggler,
}: ControlBarProps) {
    const [tempData, setTempData] = useState<DataType>(data);

    useEffect(() => {
        setTempData(data);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setData(tempData);
    };

    return (
        <form className="panel" onSubmit={handleSubmit}>
            <div className="form-group heading">
                <h2>Particle Controls</h2>
                <button type="button" onClick={toggler}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </button>
            </div>
            <div className="form-group">
                <label htmlFor="bgColor">Background</label>
                <input
                    type="color"
                    id="bgColor"
                    value={tempData.bgColor}
                    onChange={(e) =>
                        setTempData({ ...tempData, bgColor: e.target.value })
                    }
                />
            </div>

            <div className="form-group">
                <label htmlFor="flakeColor">Flake</label>
                <input
                    type="color"
                    id="flakeColor"
                    value={tempData.flakeColor}
                    onChange={(e) =>
                        setTempData({ ...tempData, flakeColor: e.target.value })
                    }
                />
            </div>

            <div className="form-group">
                <label htmlFor="direction">Direction</label>
                <div className="direction">
                    {[
                        "none",
                        "random",
                        "left",
                        "right",
                        "up",
                        "down",
                        "upleft",
                        "upright",
                        "downleft",
                        "downright",
                    ].map((dir) => (
                        <button
                            type="button"
                            className="direction"
                            id="direction"
                            key={dir}
                            onClick={(e) =>
                                setTempData({
                                    ...tempData,
                                    direction: dir as Direction,
                                })
                            }
                        >
                            {directionSVG[dir]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="count">Count</label>
                <div>
                    <input
                        type="range"
                        id="count"
                        min={0}
                        max={100}
                        value={tempData.count}
                        onChange={(e) =>
                            setTempData({
                                ...tempData,
                                count: Number(e.target.value),
                            })
                        }
                    />
                    <input
                        type="number"
                        min={1}
                        max={100}
                        name="count"
                        onChange={(e) =>
                            setTempData({
                                ...tempData,
                                count: Number(e.target.value),
                            })
                        }
                        value={tempData.count}
                    ></input>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="speed">Speed</label>
                <div>
                    <input
                        type="range"
                        id="speed"
                        step="any"
                        min="0"
                        max="100"
                        value={tempData.speed}
                        onChange={(e) =>
                            setTempData({
                                ...tempData,
                                speed: Number(e.target.value),
                            })
                        }
                    />
                    <input
                        type="number"
                        step="any"
                        name="speed"
                        onChange={(e) =>
                            setTempData({
                                ...tempData,
                                speed: Number(e.target.value),
                            })
                        }
                        value={tempData.speed.toFixed(2)}
                    ></input>
                </div>
            </div>

            <button type="submit" className="submit-btn">
                Apply
            </button>
        </form>
    );
}
