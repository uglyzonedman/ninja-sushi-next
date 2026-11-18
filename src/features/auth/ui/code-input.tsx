"use client";
import { useRef } from "react";

interface CodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export const CodeInput = ({ length = 4, value, onChange }: CodeInputProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focusAt = (index: number) => {
    const clamped = Math.max(0, Math.min(index, length - 1));
    inputsRef.current[clamped]?.focus();
  };

  const setDigit = (index: number, digit: string) => {
    const chars = value.padEnd(length, " ").split("");
    chars[index] = digit || " ";
    onChange(chars.join("").trimEnd());
  };

  const handleChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return;

    // Несколько цифр сразу (автозаполнение из СМС или вставка)
    if (digits.length > 1) {
      const next = (value.slice(0, index) + digits).slice(0, length);
      onChange(next);
      focusAt(next.length);
      return;
    }

    setDigit(index, digits);
    focusAt(index + 1);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (value[index] && value[index] !== " ") {
        setDigit(index, "");
      } else if (index > 0) {
        setDigit(index - 1, "");
        focusAt(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusAt(index - 1);
    } else if (e.key === "ArrowRight") {
      focusAt(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!digits) return;
    const next = digits.slice(0, length);
    onChange(next);
    focusAt(next.length);
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }, (_, index) => {
        const char = value[index];
        return (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            autoFocus={index === 0}
            maxLength={length}
            value={char && char !== " " ? char : ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            aria-label={`Цифра ${index + 1}`}
            className="size-16 bg-[#F5F5F7] rounded-xl text-center text-2xl font-bold text-[#1D1D1F] outline-none ring-primary transition-shadow focus:ring-2"
          />
        );
      })}
    </div>
  );
};
