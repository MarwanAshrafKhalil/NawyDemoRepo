import Image from "next/image";
import Link from "next/link";
import { FaHandHoldingDollar } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="bg-white  border-b-2 h-20 fixed w-full top-0 z-10">
      <div className="flex flex-row mx-auto p-4 justify-center items-center gap-10 min-w-full ">
        <Link href={"/"}>
          <Image src={"/nawy.svg"} alt="nawy_logo" width={100} height={50} />
        </Link>
        <Link
          href={"/sell"}
          className=" flex gap-2 btn bg-secondary  text-white rounded-full hover:bg-primary  text-xl font-semibold"
        >
          <FaHandHoldingDollar className="w-7 h-7" /> Sell Your Property
        </Link>
      </div>
    </nav>
  );
}
