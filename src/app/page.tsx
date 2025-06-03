"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
    const InputRef = useRef(null);
    const [md, setMd] = useState("");

    useEffect(() => {
      console.log(InputRef)
    }, [])
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (InputRef.current) {
            let textArea = InputRef.current as HTMLTextAreaElement;
            let start = textArea.selectionStart;
            let end = textArea.selectionEnd;
            setMd(createMd(e.currentTarget.id, start, end, true));
            console.log(e.currentTarget.id);
        }
    };

    return (
        <div className="w-screen h-fit p-4">
            {/* Markdown Buttons  */}
            <div className="relative border-4 border-neutral-300">
                <div className="absolute top-0 flex justify-between w-full">
                    <div>
                        {[
                            "p",
                            "i",
                            "b",
                            "link",
                            "image",
                            "highlight",
                            "q",
                            "braces",
                            "code",
                            "hr",
                            "ol",
                            "ul",
                        ].map((val, ind) => (
                            <button key={ind} onClick={handleClick} className={val} id={val}>
                                <Image
                                    src={require(`../public/Image/${val}.svg`)}
                                    alt={`Icon ${val}`}
                                />
                            </button>
                        ))}
                    </div>
                    <div>
                        <button onClick={handleClick} className='preview'>
                                <Image
                                    src={require(`../public/Image/play-fill.svg`)}
                                    alt={`Icon preview`}
                                />
                            </button>
                    </div>
                </div>

                {/* Markdown Input */}
                <textarea
                    className="rounded-md text-neutral-800 resize-none outline-0 p-4 pt-14 w-full"
                    name="markdown-input"
                    id="markdown-input"
                    aria-label="markdown input"
                    spellCheck="false"
                    placeholder="Write What you want here!"
                    rows={10}
                    cols={100}
                    ref={InputRef}
                    value={md}
                    onChange={(e) => {
                        setMd(e.target.value);
                    }}
                ></textarea>
            </div>
        </div>
    );
}
