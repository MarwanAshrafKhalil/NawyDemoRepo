import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col h-22 bg-white p-2 w-full border-0 mt-5">
      <Image src={"/nawy.svg"} alt="nawy_logo" width={100} height={50} />
      <span className="text-primary"> Real Estate Company</span>
    </div>
  );
}
