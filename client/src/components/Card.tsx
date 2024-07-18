import { IoCall, IoBedOutline, IoLogoWhatsapp } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import Image from "next/image";
import FacilityCount from "./FacilityCount";
import { ApartsDataType } from "@/app/page";
import Link from "next/link";
export default function Card({ data: apartment }: { data: ApartsDataType }) {
  return (
    <div className="mx-2">
      <div className="card  bg-white max-w-xl w-full h-auto shadow-md rounded-md border boreder-1 border-gray-500">
        <Link href={`/apartment/${apartment.id}`}>
          <figure className="overflow-hidden h-48">
            <Image
              className="object-cover"
              src={apartment.Url}
              alt={apartment.imagename}
              width={1000}
              height={1000}
              loading="lazy"
            />
          </figure>
          <div className="card-body gap-4 p-3">
            <div className="gap-1">
              <h2 className="card-title text-black">{apartment.apt_name}</h2>
              <span className="text-black">
                {apartment.apt_city}, {apartment.apt_country}
              </span>
            </div>

            <div className="flex flex-row  gap-5">
              <FacilityCount count={apartment.bedrooms_count}>
                <IoBedOutline />
              </FacilityCount>
              <FacilityCount count={apartment.bathrooms_count}>
                <LuBath />
              </FacilityCount>

              <div className="flex gap-1 items-center justify-center ">
                <BiArea className="text-gray-700 w-8 h-8" />
                <span className="text-black text-lg font-semibold">
                  {apartment.area_m2} m&sup2;
                </span>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center ">
              <div>
                <span className="text-sm text-gray-500">
                  {Math.ceil(
                    apartment.apt_price / apartment.installment_period / 12,
                  )}{" "}
                  Monthly / {apartment.installment_period} years"
                </span>
                <p className="text-xl text-black font-bold">
                  {Math.ceil(apartment.apt_price)} EGP
                </p>
              </div>

              <div className="flex flex-row gap-1">
                <button
                  type="button"
                  className="bg-slate-200 rounded-full w-10 h-10 flex items-center justify-center  "
                >
                  <IoCall className="h-8 w-8 text-primary m-2" />
                </button>
                <button
                  type="button"
                  className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center  "
                >
                  <IoLogoWhatsapp className="h-8 w-8 text-white m-2" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
