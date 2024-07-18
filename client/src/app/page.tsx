"use client";
import { fetchData } from "@/api/apartments";
import Card from "@/components/Card";
import LoadingDiv from "@/components/LoadingDiv";

import Image from "next/image";
import { useEffect, useState } from "react";

export type ApartsDataType = {
  id: number;
  apt_name: string;
  apt_city: string;
  apt_country: string;
  bedrooms_count: number;
  bathrooms_count: number;
  area_m2: number;
  installment_period: number;
  apt_price: number;
  apt_delivery_date: Date;
  compound: string;
  imagename: string;
  Url: string;
};

export default function Home() {
  const [apartsData, setApartsData] = useState<ApartsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAparts = async () => {
      setIsLoading(true);
      try {
        const result = await fetchData();
        setApartsData(result);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAparts();
  }, []);
  return (
    <div className="flex flex-col  items-center gap-10 mx-auto min-h-screen bg-white">
      <h1 className="text-2xl my-2 font-bold text-secondary">
        Explore Properties
      </h1>

      {isLoading ? (
        <LoadingDiv />
      ) : (
        apartsData && (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-5">
            {apartsData.map((apartment) => (
              <div key={apartment.id}>
                <Card data={apartment} />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
