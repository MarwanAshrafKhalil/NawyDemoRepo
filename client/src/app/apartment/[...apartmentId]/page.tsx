"use client";
import Image from "next/image";
import { IoCall, IoLogoWhatsapp } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { FaRegMap } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { PiMosque } from "react-icons/pi";
import { MdSportsTennis } from "react-icons/md";
import { useEffect, useState } from "react";
import { ApartsDataType } from "@/app/page";
import { fetchApartment } from "@/api/apartments";
import LoadingDiv from "@/components/LoadingDiv";

type PageProps = {
  params: {
    apartmentId: number;
  };
};

export default function page({ params: { apartmentId } }: PageProps) {
  const [apartData, setApartData] = useState<ApartsDataType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(apartmentId);
  useEffect(() => {
    const fetchAparts = async () => {
      setIsLoading(true);
      try {
        const result = await fetchApartment(apartmentId);
        setApartData(result);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAparts();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingDiv />
      ) : (
        <div className="flex flex-col m-10 ">
          <div className="flex  justify-center mx-auto w-full h-[450px] overflow-hidden ">
            <Image
              src={apartData?.Url || ""}
              alt={apartData?.apt_name || ""}
              className="object-cover rounded-lg"
              width={2000}
              height={200}
            />
          </div>
          <div className="flex flex-row gap-10 items-center w-full my-10 sm:sticky sm:top-20 bg-white border-b-2 py-3">
            <div>
              <Image
                src={"/nawy.svg"}
                className="rounded-full w-20 h-20 shadow-lg p-2"
                alt="compound_logo"
                width={200}
                height={200}
              />
            </div>
            <div className=" flex flex-col w-full items-start justify-start">
              <div className="flex flex-col ">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                  <h2 className="card-title text-primary text-3xl font-semibold">
                    {apartData?.apt_name}
                  </h2>
                  <span className="text-black font-medium bg-gray-100 rounded-lg w-auto h-auto p-2">
                    {apartData?.compound}
                  </span>
                </div>
                <span className="text-black text-md font-normal mt-5 sm:mt-1">
                  {apartData?.apt_city}, {apartData?.apt_country}
                </span>
              </div>

              <div className="flex flex-col w-full sm:flex-row gap-5 justify-between items-start sm:items-center mt-4">
                <div>
                  <span className="text-sm text-gray-500">
                    {apartData &&
                      Math.ceil(
                        apartData?.apt_price /
                          apartData?.installment_period /
                          12,
                      )}{" "}
                    Monthly / {apartData?.installment_period} years"
                  </span>
                  <p className="text-xl text-black font-bold">
                    {apartData && Math.ceil(apartData.apt_price)} EGP
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 ">
                  <button
                    type="button"
                    className="bg-slate-200 rounded-lg w-36 h-12 flex items-center justify-center gap-2  "
                  >
                    <IoCall className="h-8 w-8 text-primary m-2" />
                    <span className="text-primary font-medium text-lg">
                      Call Us
                    </span>
                  </button>
                  <button
                    type="button"
                    className="bg-green-500 rounded-lg w-36 h-12 flex items-center justify-center gap-2"
                  >
                    <IoLogoWhatsapp className="h-8 w-8 text-white " />
                    <span className="text-white text-lg font-medium ">
                      Whatsapp
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 my-2">
            <h1 className="text-primary text-xl font-bold">Details</h1>
            <div className="flex flex-row gap-4">
              <button
                type="button"
                className=" flex flex-col gap-1 w-32 h-20 border border-1 border-gray-300 rounded-lg items-center justify-center p-2"
              >
                <GrGallery className="w-10 h-10 text-gray-500" />
                <span>Gallery</span>
              </button>
              <button
                type="button"
                className=" flex flex-col gap-1 w-32 h-20 border border-1 border-gray-300 rounded-lg items-center justify-center p-2"
              >
                <FaRegMap className="w-10 h-10 text-gray-500" />
                <span>Master Plan</span>
              </button>
              <button
                type="button"
                className=" flex flex-col gap-1 w-32 h-20 border border-1 border-gray-300 rounded-lg items-center justify-center p-2"
              >
                <FaMapPin className="w-10 h-10 text-gray-500" />
                <span>View on Map</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col my-5">
            <h1 className="text-primary text-xl font-bold">Amenities</h1>

            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-gray-100 rounded-lg p-5 gap-5">
              <div className="flex flex-row gap-2">
                <IoBusinessOutline className="w-6 h-6 text-gray-900" />
                <span className="text-gray-900 font-medium text-lg">
                  Business Park
                </span>
              </div>

              <div className="flex flex-row gap-2">
                <FaSchool className="w-6 h-6 text-gray-900" />
                <span className="text-gray-900 font-medium text-lg">
                  {" "}
                  Schools
                </span>
              </div>

              <div className="flex flex-row gap-2">
                <PiMosque className="w-6 h-6 text-gray-900" />
                <span className="text-gray-900 font-medium text-lg">
                  {" "}
                  Mosque
                </span>
              </div>

              <div className="flex flex-row gap-2">
                <MdSportsTennis className="w-6 h-6 text-gray-900" />
                <span className="text-gray-900 font-medium text-lg">
                  Sports Clubs
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-primary text-xl font-bold">
              About Palm Hills New Cairo
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. At
              auctor urna nunc id cursus metus aliquam eleifend mi. Sed blandit
              libero volutpat sed cras ornare arcu. Gravida quis blandit turpis
              cursus in hac habitasse platea dictumst. Morbi tincidunt augue
              interdum velit. Vulputate enim nulla aliquet porttitor lacus.
              Tortor at auctor urna nunc id cursus metus aliquam. Sit amet justo
              donec enim diam vulputate ut pharetra sit. Egestas integer eget
              aliquet nibh praesent. A erat nam at lectus urna duis convallis.
              At imperdiet dui accumsan sit amet nulla facilisi. Lacus vel
              facilisis volutpat est velit egestas dui id. Pharetra et ultrices
              neque ornare. Vestibulum morbi blandit cursus risus at ultrices mi
              tempus. Quis varius quam quisque id diam. Nunc eget lorem dolor
              sed. In fermentum et sollicitudin ac orci phasellus egestas
              tellus. Sit amet nisl purus in mollis nunc sed. Netus et malesuada
              fames ac. Fermentum odio eu feugiat pretium nibh ipsum consequat.
              Sed adipiscing diam donec adipiscing tristique risus nec. Neque
              aliquam vestibulum morbi blandit cursus risus. Faucibus purus in
              massa tempor nec. Mattis vulputate enim nulla aliquet porttitor
              lacus.{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
