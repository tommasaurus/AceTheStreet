"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const banks = [
  { value: "all", label: "All Banks" },
  { value: "gs", label: "Goldman Sachs" },
  { value: "ms", label: "Morgan Stanley" },
  { value: "jpm", label: "JP Morgan" },
  { value: "bofa", label: "Bank of America" },
  { value: "citi", label: "Citigroup" },
  { value: "ubs", label: "UBS" },
  { value: "barclays", label: "Barclays" },
  { value: "evercore", label: "Evercore" },
  { value: "lazard", label: "Lazard" },
];

export function BankFilter({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("all");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? banks.find((bank) => bank.value === value)?.label
            : "Select bank..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search bank..." />
          <CommandEmpty>No bank found.</CommandEmpty>
          <CommandGroup>
            {banks.map((bank) => (
              <CommandItem
                key={bank.value}
                value={bank.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  onSelect(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === bank.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {bank.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
