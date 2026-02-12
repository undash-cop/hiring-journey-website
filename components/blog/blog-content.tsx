"use client";

import React, { useEffect } from "react";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  useEffect(() => {
    // This component renders markdown-like content
    // In production, you'd use a markdown parser like react-markdown
  }, []);

  // Simple markdown-like rendering (for production, use a proper markdown parser)
  const formatContent = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactElement[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inList = false;

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("# ")) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-4">{currentParagraph.join(" ")}</p>);
          currentParagraph = [];
        }
        elements.push(
          <h1 key={`h1-${index}`} className="text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
            {trimmed.substring(2)}
          </h1>
        );
      } else if (trimmed.startsWith("## ")) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-4">{currentParagraph.join(" ")}</p>);
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} className="list-disc pl-6 mb-4 space-y-2">
              {listItems.map((item, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
              ))}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-4">{currentParagraph.join(" ")}</p>);
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} className="list-disc pl-6 mb-4 space-y-2">
              {listItems.map((item, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
              ))}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed.startsWith("- ")) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-4">{currentParagraph.join(" ")}</p>);
          currentParagraph = [];
        }
        inList = true;
        listItems.push(trimmed.substring(2));
      } else if (trimmed === "") {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-4 text-gray-600 dark:text-gray-300 leading-7">{currentParagraph.join(" ")}</p>);
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} className="list-disc pl-6 mb-4 space-y-2">
              {listItems.map((item, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
              ))}
            </ul>
          );
          listItems = [];
          inList = false;
        }
      } else {
        if (inList && listItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} className="list-disc pl-6 mb-4 space-y-2">
              {listItems.map((item, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
              ))}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        currentParagraph.push(trimmed);
      }
    });

    if (currentParagraph.length > 0) {
      elements.push(<p key="final-p" className="mb-4 text-gray-600 dark:text-gray-300 leading-7">{currentParagraph.join(" ")}</p>);
    }
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key="final-ul" className="list-disc pl-6 mb-4 space-y-2">
          {listItems.map((item, i) => (
            <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  return <div>{formatContent(content)}</div>;
}
