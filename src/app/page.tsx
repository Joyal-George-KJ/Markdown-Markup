"use client";

import { useEffect, useState } from "react";
import EffectProvider from "./EffectProvider";

function page() {
    let [sendProps, setSendProps] = useState({ height: 0, width: 0 });

    useEffect(() => {
        let handleResizing = () => {
            setSendProps((val) => {
                return { ...val, height: innerHeight, width: innerWidth };
            });
        };

        handleResizing();

        window.addEventListener("resize", handleResizing);

        return window.removeEventListener("resize", handleResizing);
    }, []);

    return (
        <div>
            <EffectProvider {...sendProps} count={50} direction="left" speed={1} />
        </div>
    );
}

export default page;
