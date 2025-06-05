"use client";

import { useEffect, useRef } from "react";

export default function Preview({
    md,
    setPreviewToggle,
    previewToggle,
}: {
    md: string;
    setPreviewToggle: React.Dispatch<React.SetStateAction<boolean>>;
    previewToggle: boolean;
}) {
    const pageRef = useRef<HTMLDivElement>(null);

    function customMarkdownToHTML(md: string): string {
        let html = md;

        // Code block (triple backticks)
        html = html.replace(
            /```[\s\n]?([\s\S]*?)```/gim,
            "<pre><code>$1</code></pre>"
        );

        // Inline code
        html = html.replace(/`([^`]+)`/gim, "<code>$1</code>");

        // Horizontal rule
        html = html.replace(/^\s*---\s*$/gim, "<hr>");

        // Headings (h6 to h1)
        html = html.replace(/^###### (.*)$/gim, "<h6>$1</h6>");
        html = html.replace(/^##### (.*)$/gim, "<h5>$1</h5>");
        html = html.replace(/^#### (.*)$/gim, "<h4>$1</h4>");
        html = html.replace(/^### (.*)$/gim, "<h3>$1</h3>");
        html = html.replace(/^## (.*)$/gim, "<h2>$1</h2>");
        html = html.replace(/^# (.*)$/gim, "<h1>$1</h1>");

        // Highlight (custom ===highlight===)
        html = html.replace(/===(.*?)===/gim, "<mark>$1</mark>");

        // Bold and Italic
        html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
        html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");

        // Blockquote
        html = html.replace(/^> ?(.*)$/gim, "<blockquote>$1</blockquote>");

        // Ordered list (1. item)
        html = html.replace(/^\d+\.+(.*)/gim, "<ol><li>$1</li></ol>");

        // Unordered list (- item)
        html = html.replace(/^\-+(.*)/gim, "<ul><li>$1</li></ul>");

        // Links
        html = html.replace(
            /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gim,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // Images
        html = html.replace(
            /\!\[([^\]]*)\]\(([^)]+)\)/gim,
            '<img src="$2" alt="$1" />'
        );

        // Line breaks
        html = html.replace(/\n{2,}/g, "</p><p>");
        html = `<p>${html}</p>`;
        html = html.replace(/<p><\/p>/g, ""); // Clean up empty <p> blocks

        return html.trim();
    }

    useEffect(() => {
        const converted = customMarkdownToHTML(md);
        if (pageRef.current) {
            pageRef.current.innerHTML = converted;
        }
    }, [md]);

    return (
        <div className="absolute w-full h-screen bg-white p-4 overflow-auto z-50">
            <i
                className="absolute top-0 right-0 p-2 cursor-pointer"
                onClick={() => setPreviewToggle(!previewToggle)}
            >
                X
            </i>
            <div
                ref={pageRef}
                className="prose max-w-none text-neutral-900"
            ></div>
        </div>
    );
}
