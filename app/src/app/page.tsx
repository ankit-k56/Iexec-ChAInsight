"use client";
import Image from "next/image";
import ReactSpeedometer from "react-d3-speedometer";
import { Selectcrypto } from "@/components/Selectcrypto";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [crypto, setCrypto] = useState<string>("Ethereum");
  const [val, setVal] = useState<number>(0);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("https://iexec-chainsight.vercel.app/eth");

        const data = await response.json();

        setVal(parseInt(data.text));
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  const handleChange = (value: string) => {
    setCrypto(value);
    console.log(crypto);
  };
  if (crypto !== "Ethereum") {
    return (
      <div className="w-screen text-center">
        <h1 className="text-xl">This page is under development</h1>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-20 py-12 items-center">
      {/* <Selectcrypto /> */}
      <Select value={crypto} onValueChange={handleChange}>
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

      <div className="text-center hidden md:flex flex-col gap-5">
        <ReactSpeedometer
          maxValue={100}
          value={val}
          width={500}
          minValue={-100}
          needleColor="red"
          startColor="blue"
          segments={2}
          customSegmentLabels={[
            {
              text: "Bearish",
              // position: "INSIDE",

              color: "#fff",
            },
            {
              text: "Bullish",

              color: "#fff",
            },
          ]}
          endColor="green"
        />
        <p className="text-sm text-stone-700">
          This data is based of past 24 hr trends of the cryto
        </p>
      </div>
      <div className="text-center md:hidden  flex flex-col gap-3">
        <ReactSpeedometer
          maxValue={100}
          value={0}
          width={350}
          minValue={-100}
          // ringWidth={0}
          needleColor="red"
          startColor="blue"
          segments={2}
          customSegmentLabels={[
            {
              text: "Bearish",
              // position: "INSIDE",

              color: "#fff",
            },
            {
              text: "Bullish",

              color: "#fff",
            },
          ]}
          endColor="green"
        />
        <p className="text-sm text-stone-700">
          This data is based of past 24 hr trends of the cryto
        </p>
      </div>
    </div>
  );
}
