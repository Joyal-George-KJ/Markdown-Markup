"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Preview from "./Preview";

export default function Home() {
    const InputRef = useRef(null);
    const [md, setMd] = useState("");
    const [previewToggle, setPreviewToggle] = useState(false);

    const createMd = (key: string, start: number, end: number): string => {
        let val: string = "";
        if (start !== end) {
            switch (key) {
                case "h1":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "\n# " +
                        md.slice(start, end) +
                        " \n";
                    break;
                case "h2":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "\n## " +
                        md.slice(start, end) +
                        " \n";
                    break;
                case "h3":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "\n### " +
                        md.slice(start, end) +
                        " \n";
                    break;
                case "h4":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "\n#### " +
                        md.slice(start, end) +
                        " \n";
                    break;
                case "h5":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "\n##### " +
                        md.slice(start, end) +
                        " \n";
                    break;
                case "h6":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "\n###### " +
                        md.slice(start, end) +
                        " \n";
                    break;
                case "i":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "* " +
                        md.slice(start, end) +
                        " *";
                    break;
                case "b":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "** " +
                        md.slice(start, end) +
                        " **";
                    break;
                case "highlight":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "=== " +
                        md.slice(start, end) +
                        " ===";
                    break;
                case "hr":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "\n---\n" +
                        md.slice(start, end);
                    break;
                case "code":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "\n` " +
                        md.slice(start, end) +
                        " `\n";
                    break;
                case "braces":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "\n``` " +
                        md.slice(start, end) +
                        " ```\n";
                    break;
                case "link":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        md.slice(start, end) +
                        "![title](link)";
                    break;
                case "q":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        "> " +
                        md.slice(start, end);
                    break;
                case "image":
                    val =
                        md.slice(0, start !== 0 ? start - 1 : 0) +
                        md.slice(start, end) +
                        "\n![alt text](image.jpg)\n";
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
        console.log(val + md.slice(end, val.length + (md.length - end)));
        

        return val + md.slice(end, val.length + (md.length - end));
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (InputRef.current) {
            let textArea = InputRef.current as HTMLTextAreaElement;
            let start = textArea.selectionStart;
            let end = textArea.selectionEnd;
            setMd(createMd(e.currentTarget.id, start, end));
        }
    };

    return (
        <div className="w-screen h-fit p-4">
            {/* Markdown Buttons  */}
            <div className="relative border-4 border-neutral-300">
                <div className="absolute top-0 flex justify-between w-full">
                    <div>
                        {[
                            "h1",
                            "h2",
                            "h3",
                            "h4",
                            "h5",
                            "h6",
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
                        <button onClick={() => setPreviewToggle(!previewToggle)} className="preview">
                            <Image
                                src={require(`../public/Image/play-fill.svg`)}
                                alt={`Icon preview`}
                            />
                        </button>
                    </div>
                </div>

                {
                    previewToggle && <Preview setPreviewToggle={setPreviewToggle} previewToggle={previewToggle} md={md} />
                }

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
