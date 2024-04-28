"use client";
import React, { useState, useEffect } from "react";
import Progressbar from "@/components/Progressbar";
import { toast } from "sonner";
import Link from "next/link";

type PartyDict = { [key: string]: number };

const Page = () => {
  const [partyDict, setPartyDict] = useState<PartyDict>({});
  const [isLoading, setIsLoading] = useState(false);

  const parseInputString = (inputString: string) => {
    const partyEntries = inputString.split(",");
    const newPartyDict: PartyDict = {};
    partyEntries.forEach((entry) => {
      const parts = entry.split(":");
      const partyName = parts[0];
      let partyNumber = 0;

      if (!parts[1]) {
        partyNumber = 1;
      } else {
        partyNumber = parseInt(parts[1]);
      }

      newPartyDict[partyName] = partyNumber;
    });
    setPartyDict(newPartyDict);
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://iexec-chainsight.vercel.app/us");
        const data = await response.json();

        parseInputString(data.text);
      } catch (err) {
        toast.error("Something went wrong");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchdata();
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen  flex items-center justify-center text-xs">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 items-center my-8">
      <div className="flex w-[500px] border-slate-200 border-2 mx-auto p-8 rounded-lg flex-col gap-7">
        {Object.entries(partyDict).map(([key, value]) => {
          return (
            <div
              key={key}
              className="flex gap-5 font-extrabold text-sm items-center"
            >
              <div className=" flex w-full items-center gap-3">
                <Progressbar progess={value} />
                <span>{value}%</span>
              </div>
              <span>{key}</span>
            </div>
          );
        })}
      </div>
      <p className="text-sm my-5">
        USA Election Predictions accoring to last 24hr news data
      </p>
      <p>
        See India prections{" "}
        <Link
          className="text-blue-800 hover:underline "
          href="/elections/india"
        >
          here
        </Link>{" "}
      </p>
    </div>
  );
};

export default Page;
