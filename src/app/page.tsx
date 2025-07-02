"use client";

import { useEffect, useState } from "react";
import EffectProvider from "./EffectProvider";
import { Spear } from "./Flakes";
import ControlBar from "./ControlBar";
import { DataType } from "./EffectTypes";

function page() {
    const [sendProps, setSendProps] = useState({ height: 0, width: 0 });
    const [toggle, setToggle] = useState<boolean>(false);
    const [data, setData] = useState<DataType>({
        count: 50,
        direction: "left",
        speed: 0.1,
        flakeColor: "#ffffff",
        bgColor: "#000000",
        flakeObject: Spear,
        radious: Number((Math.random() * 3 + 1).toFixed(2))
    });

    useEffect(() => {
        let handleResizing = () => {
            setSendProps((val) => {
                return { ...val, height: innerHeight, width: innerWidth };
            });
        };

        handleResizing();

        window.addEventListener("resize", handleResizing);

        return window.removeEventListener("resize", handleResizing);
    }, [data]);

    return (
        <div style={{ position: "relative", width: sendProps.width, height: sendProps.height }}>
            {toggle ? (
                <ControlBar toggler={() => {setToggle(false)}} data={data} setData={setData} />
            ) : (
                <button className="panel" onClick={() => {setToggle(true)}}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-list"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                        />
                    </svg>
                </button>
            )}
            <EffectProvider
                height={sendProps.height}
                width={sendProps.width}
                direction={data.direction}
                bgColor={data.bgColor}
                flakeColor={data.flakeColor}
                {...data}
            ></EffectProvider>
        </div>
    );
}

export default page;
