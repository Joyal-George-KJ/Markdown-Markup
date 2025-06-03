"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
    const InputRef = useRef(null);
    const [md, setMd] = useState("");

    const createMd = (
        key: string,
        start: number,
        end: number,
        both: boolean
    ): string => {
        let val: string = "";
        if (both && start !== end) {
            switch (key) {
                case "p":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "####### " +
                        md.slice(start, end) +
                        " #######\n";
                    break;
                case "h1":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "# " +
                        md.slice(start, end) +
                        " #\n";
                    break;
                case "h2":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "## " +
                        md.slice(start, end) +
                        " ##\n";
                    break;
                case "h3":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "### " +
                        md.slice(start, end) +
                        " ###\n";
                    break;
                case "h4":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "#### " +
                        md.slice(start, end) +
                        " ####\n";
                    break;
                case "h5":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "##### " +
                        md.slice(start, end) +
                        " #####\n";
                    break;
                case "h6":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "###### " +
                        md.slice(start, end) +
                        " ######\n";
                    break;
                case "q":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        '" ' +
                        md.slice(start, end) +
                        ` "\n`;
                    break;
                case "i":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "~ " +
                        md.slice(start, end) +
                        " ~\n";
                    break;
                case "b":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "* " +
                        md.slice(start, end) +
                        " *\n";
                    break;
                case "highlight":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "=== " +
                        md.slice(start, end) +
                        " ===\n";
                    break;
                case "hr":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "_ " +
                        md.slice(start, end) +
                        " _\n";
                    break;
                case "code":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "` " +
                        md.slice(start, end) +
                        " `\n";
                    break;
                case "braces":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "``` " +
                        md.slice(start, end) +
                        " ```\n";
                    break;
                default:
                    break;
            }
        } else if (!both && start !== end) {
            switch (key) {
                case "link":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "a: " +
                        md.slice(start, end) +
                        " (link)[alt text]\n";
                    break;
                case "image":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "img: " +
                        md.slice(start, end) +
                        " (Image Link)[alt text]\n";
                    break;
                case "ol":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "> " +
                        md.slice(start, end) +
                        " \n";
                    break;
                case "ul":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "- " +
                        md.slice(start, end) +
                        " \n";
                    break;

                default:
                    break;
            }
        } else {
            return md;
        }

        return val;
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (InputRef.current) {
            let textArea = InputRef.current as HTMLTextAreaElement;
            let start = textArea.selectionStart;
            let end = textArea.selectionEnd;
            setMd(
                createMd(
                    e.currentTarget.id,
                    start,
                    end,
                    [
                        "p",
                        "i",
                        "b",
                        "highlight",
                        "q",
                        "braces",
                        "code",
                        "hr",
                    ].includes(e.currentTarget.id)
                )
            );
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
                            <button
                                key={ind}
                                onClick={handleClick}
                                className={val}
                                id={val}
                            >
                                <Image
                                    src={require(`../public/Image/${val}.svg`)}
                                    alt={`Icon ${val}`}
                                />
                            </button>
                        ))}
                    </div>
                    <div>
                        <button onClick={handleClick} className="preview">
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
