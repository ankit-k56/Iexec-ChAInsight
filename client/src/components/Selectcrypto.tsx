import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Selectcrypto() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a crypto" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select the crypto</SelectLabel>
          <SelectItem value="Ethereum">Etherium</SelectItem>
          <SelectItem value="Bitcoin">Bitcoin</SelectItem>
          <SelectItem value="Dogecoin">Dogecoin</SelectItem>
          <SelectItem value="Solana">Solana</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
