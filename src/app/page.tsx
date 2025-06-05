"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Preview from "./Preview";

const markdownShortcuts: Record<
  string,
  (selected: string) => string
> = {
  h1: (s) => `\n#${s}\n`,
  h2: (s) => `\n##${s}\n`,
  h3: (s) => `\n###${s}\n`,
  h4: (s) => `\n####${s}\n`,
  h5: (s) => `\n#####${s}\n`,
  h6: (s) => `\n######${s}\n`,
  b: (s) => `**${s}**`,
  i: (s) => `*${s}*`,
  highlight: (s) => `===${s}===`,
  hr: () => `\n---\n`,
  code: (s) => `\`${s}\``,
  braces: (s) => `\n\`\`\`\n${s}\n\`\`\`\n`,
  link: (s) => `[${s || "title"}](https://example.com)`,
  image: (s) => `![${s || "alt text"}](image.jpg)`,
  q: (s) => `>${s}`,
  ol: (s) => `1.${s}`,
  ul: (s) => `-${s}`,
};

export default function Home() {
    const InputRef = useRef(null);
    const [md, setMd] = useState("");
    const [previewToggle, setPreviewToggle] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.id;
    if (!inputRef.current) return;

    const textarea = inputRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected = md.slice(start, end);
    const formatter = markdownShortcuts[key];

    if (!formatter) return;

    const newMd =
      md.slice(0, start) +
      formatter(selected) +
      md.slice(end);

    setMd(newMd);

    // Optional: re-focus and reset cursor
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + formatter(selected).length;
    }, 0);
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
