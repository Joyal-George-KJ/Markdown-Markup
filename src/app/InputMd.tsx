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

export default function InputMd() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [md, setMd] = useState("Something on progress and is going well");
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
      <div className="relative border-4 border-neutral-300">
        <div className="absolute top-0 flex justify-between w-full bg-white px-2 py-1">
          <div className="flex flex-wrap gap-1">
            {Object.keys(markdownShortcuts).map((val, ind) => (
              <button
                key={ind}
                onClick={handleClick}
                className="hover:bg-neutral-200 p-1 rounded"
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
            <button
              onClick={() => setPreviewToggle(!previewToggle)}
              className="preview hover:bg-neutral-200 p-1 rounded"
            >
              <Image
                src={require(`../public/Image/play-fill.svg`)}
                alt="Preview"
              />
            </button>
          </div>
        </div>

        {previewToggle && (
          <Preview
            setPreviewToggle={setPreviewToggle}
            previewToggle={previewToggle}
            md={md}
          />
        )}

        <textarea
          ref={inputRef}
          value={md}
          onChange={(e) => setMd(e.target.value)}
          className="rounded-md text-neutral-800 resize-none outline-0 p-4 pt-14 w-full"
          name="markdown-input"
          id="markdown-input"
          aria-label="markdown input"
          spellCheck="false"
          placeholder="Write what you want here!"
          rows={10}
          cols={100}
        ></textarea>
      </div>
    </div>
  );
}
