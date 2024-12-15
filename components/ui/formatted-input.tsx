"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

interface FormattedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  format: "card" | "expiry";
  onChange?: (value: string) => void;
}

export function FormattedInput({
  format,
  onChange,
  value,
  ...props
}: FormattedInputProps) {
  const [internalValue, setInternalValue] = React.useState("");

  const formatCardNumber = (input: string) => {
    const numbers = input.replace(/\D/g, "");
    const groups = numbers.match(/.{1,4}/g) || [];
    return groups.join(" ").substr(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiry = (input: string) => {
    const numbers = input.replace(/\D/g, "");

    // Handle backspace when there's a trailing slash
    if (input.endsWith(" / ") && internalValue.length > input.length) {
      return numbers.slice(0, -1);
    }

    // Format the date with proper spacing
    if (numbers.length >= 2) {
      const month = numbers.slice(0, 2);
      const year = numbers.slice(2, 4);
      if (year.length > 0) {
        return `${month} / ${year}`;
      }
      return `${month} / `;
    }

    return numbers;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    let formatted = input;

    if (format === "card") {
      formatted = formatCardNumber(input);
    } else if (format === "expiry") {
      formatted = formatExpiry(input);
    }

    setInternalValue(formatted);
    onChange?.(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers and specific control keys
    if (
      !/[\d\s]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      e.preventDefault();
    }

    // Handle backspace for expiry date
    if (format === "expiry" && e.key === "Backspace") {
      const input = e.currentTarget.value;
      if (input.endsWith(" / ")) {
        e.preventDefault();
        const newValue = input.slice(0, -3);
        setInternalValue(newValue);
        onChange?.(newValue);
      } else if (input.includes(" / ") && input.length > 5) {
        // When backspacing after the slash
        e.preventDefault();
        const numbers = input.replace(/\D/g, "");
        const newValue = `${numbers.slice(0, 2)} / ${numbers.slice(2, -1)}`;
        setInternalValue(newValue);
        onChange?.(newValue);
      }
    }
  };

  React.useEffect(() => {
    setInternalValue(value as string);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      inputMode="numeric"
      autoComplete={format === "card" ? "cc-number" : "cc-exp"}
    />
  );
}
