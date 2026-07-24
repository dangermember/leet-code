"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent, ClipboardEvent } from "react";
import { X, Plus, Tag } from "lucide-react";

interface TopicTagInputProps {
    initialTopics?: string[];
    existingTopics?: string[];
    name?: string;
    id?: string;
    label?: string;
}

export default function TopicTagInput({
    initialTopics = [],
    existingTopics = [],
    name = "topics",
    id = "topics-input",
    label = "Topics",
}: Readonly<TopicTagInputProps>) {
    const [tags, setTags] = useState<string[]>(initialTopics);
    const [inputValue, setInputValue] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter autocomplete suggestions based on current input and exclude already selected tags
    const filteredSuggestions = existingTopics.filter((topic) => {
        const isNotSelected = !tags.some((t) => t.toLowerCase() === topic.toLowerCase());
        const matchesInput = topic.toLowerCase().includes(inputValue.toLowerCase().trim());
        return isNotSelected && matchesInput;
    });

    const addTag = (tagText: string) => {
        const trimmed = tagText.trim().replace(/^,+|,+$/g, "");
        if (!trimmed) return;
        
        // Prevent duplicate tags (case-insensitive)
        if (!tags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
            setTags((prev) => [...prev, trimmed]);
        }
        setInputValue("");
        setIsOpen(false);
    };

    const removeTag = (indexToRemove: number) => {
        setTags((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.includes(",")) {
            const parts = val.split(",");
            parts.slice(0, -1).forEach((part) => addTag(part));
            setInputValue(parts[parts.length - 1]);
        } else {
            setInputValue(val);
            setIsOpen(val.trim().length > 0);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (inputValue.trim()) {
                addTag(inputValue);
            }
        } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData("text");
        if (pasteData.includes(",")) {
            e.preventDefault();
            const parts = pasteData.split(",");
            parts.forEach((part) => addTag(part));
        }
    };

    return (
        <div className="relative space-y-1.5" ref={containerRef}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-slate-200">
                    {label}
                </label>
            )}
            
            {/* Hidden field for form submission */}
            <input type="hidden" name={name} value={tags.join(",")} />

            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-slate-950 p-2.5 transition focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                {tags.map((tag, index) => (
                    <span
                        key={`${tag}-${index}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300"
                    >
                        <Tag className="size-3 text-sky-400" />
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="rounded-full p-0.5 text-sky-400 hover:bg-sky-500/20 hover:text-white"
                            aria-label={`Remove topic ${tag}`}
                        >
                            <X className="size-3" />
                        </button>
                    </span>
                ))}

                <div className="relative flex-1 min-w-[140px]">
                    <input
                        id={id}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        onFocus={() => setIsOpen(inputValue.trim().length > 0 || filteredSuggestions.length > 0)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                        placeholder={tags.length === 0 ? "Type a topic (e.g. Array, Hash Table) separated by comma..." : "Add topic..."}
                        className="w-full bg-transparent px-2 py-1 text-sm text-white placeholder-slate-500 outline-none"
                    />
                </div>
            </div>

            {/* Autocomplete Suggestions Dropdown */}
            {isOpen && filteredSuggestions.length > 0 && (
                <div className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 py-2 shadow-2xl backdrop-blur-xl">
                    <p className="px-4 py-1.5 text-xs font-medium text-slate-400">Existing Topics</p>
                    {filteredSuggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                addTag(suggestion);
                            }}
                            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-slate-200 transition hover:bg-slate-800 hover:text-white"
                        >
                            <span className="flex items-center gap-2">
                                <Tag className="size-3.5 text-sky-400" />
                                {suggestion}
                            </span>
                            <Plus className="size-3.5 text-slate-500" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
