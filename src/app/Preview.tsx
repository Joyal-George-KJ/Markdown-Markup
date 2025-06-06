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
        function escapeHTML(str: string): string {
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        }

        let html = md;

        // Code block (triple backticks)
        html = html.replace(
            /```[\s\n]?([\s\S]*?)```/gim, (_, code) =>
            `<pre><code>${escapeHTML(code)}</code></pre>`
        );

        // Inline code
        html = html.replace(/`([^`]+)`/gim, (_, code) => `<code>${escapeHTML(code)}</code>`);

        // Horizontal rule
        html = html.replace(/^\s*---\s*$/gim, "<hr>");

        // Headings (h6 to h1)
        html = html.replace(/^###### (.*)$/gim, (_, code) => `<h6>${escapeHTML(code)}</h6>`);
        html = html.replace(/^##### (.*)$/gim, (_, code) => `<h5>${escapeHTML(code)}</h5>`);
        html = html.replace(/^#### (.*)$/gim, (_, code) => `<h4>${escapeHTML(code)}</h4>`);
        html = html.replace(/^### (.*)$/gim, (_, code) => `<h3>${escapeHTML(code)}</h3>`);
        html = html.replace(/^## (.*)$/gim, (_, code) => `<h2>${escapeHTML(code)}</h2>`);
        html = html.replace(/^# (.*)$/gim, (_, code) => `<h1>${escapeHTML(code)}</h1>`);

        // Highlight (custom ===highlight===)
        html = html.replace(/===(.*?)===/gim, (_, code) => `<mark>${escapeHTML(code)}</mark>`);

        // Bold and Italic
        html = html.replace(/\*\*(.*?)\*\*/gim, (_, code) => `<strong>${escapeHTML(code)}</strong>`);
        html = html.replace(/\*(.*?)\*/gim, (_, code) => `<em>${escapeHTML(code)}</em>`);

        // Blockquote
        html = html.replace(/^> ?(.*)$/gim, (_, code) => `<blockquote>${escapeHTML(code)}</blockquote>`);

        // Ordered list (1. item)
        html = html.replace(/^\d+\.+(.*)/gim, (_, code) => `<ol><li>${escapeHTML(code)}</li></ol>`);

        // Unordered list (- item)
        html = html.replace(/^\-+(.*)/gim, (_, code) => `<ul><li>${escapeHTML(code)}</li></ul>`);

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
        html = html.replace(/\n{2,}/g, (_, code) => `<p>${escapeHTML(code)}</p>`);
        html = `<p>${escapeHTML(html)}</p>`;
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
