"use client";

import { useEffect, useState } from "react";
import EffectProvider from "./EffectProvider";
import ControlBar from "./ControlBar";
import { DataType } from "./EffectTypes";
import { Spear } from "./Flakes/Spear";

function page() {
    const [sendProps, setSendProps] = useState({ height: 0, width: 0 });
    const [toggle, setToggle] = useState<boolean>(false);
    const [data, setData] = useState<DataType>({
        count: 50,
        direction: "left",
        speed: 0.1,
        flakeColor: "#000000",
        bgColor: "#ffffff",
        flakeObject: Spear,
    });

    useEffect(() => {
        let handleResizing = () => {
            setSendProps((val) => {
                return { ...val, height: innerHeight, width: innerWidth };
            });
        };

        handleResizing();

        console.log(data);
        

        window.addEventListener("resize", handleResizing);

        return window.removeEventListener("resize", handleResizing);
    }, [data]);

    return (
        <div style={{ position: "relative" }}>
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
                count={data.count}
                direction={data.direction}
                speed={data.speed}
                bgColor={data.bgColor}
                flakeColor={data.flakeColor}
                flakeObject={data.flakeObject}
            ></EffectProvider>
        </div>
    );
}

export default page;
