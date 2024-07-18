"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postApartment } from "@/api/apartments";
import { useState } from "react";
import LoadingDiv from "@/components/LoadingDiv";

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const SellSchema = z.object({
  apt_name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Few words are enough please"),
  apt_city: z
    .string()
    .min(1, "Mobile number must be 11 digits")
    .max(15, "Mobile number is not valid"),
  bedrooms_count: z
    .string()
    .min(1, "Enter a valid number")
    .max(2, "Enter valid number")
    .regex(/^\d+$/, "Enter a valid number"),
  bathrooms_count: z
    .string()
    .min(1, "Enter a valid number")
    .max(2, "Enter valid number")
    .regex(/^\d+$/, "Enter a valid number"),
  area_m2: z
    .string()
    .min(1, "Enter a valid number")
    .max(6, "Enter valid number")
    .regex(/^\d+$/, "Enter a valid number"),
  installment_plan: z
    .string()
    .min(1, "Enter a valid number")
    .max(2, "Enter valid number")
    .regex(/^\d+$/, "Enter a valid number"),
  apt_price: z
    .string()
    .min(1, "Enter a valid number")
    .max(10, "Enter valid number")
    .regex(/^\d+$/, "Enter a valid number"),
  apt_delivery_date: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => date >= getToday(), {
      message: "Date must not be older than today",
    }),
  compound: z.string().min(1, "Select a Compound"),
  image_file: z
    .any()
    .refine((file) => {
      if (file && file[0] && file[0].size) {
        console.log("Image size:", file[0].size);
        return file[0].size <= 500000; // 5MB in bytes
      }
      return true;
    }, `Max image size is 5MB.`)
    .refine(
      (file) => file && file[0] && ACCEPTED_IMAGE_TYPES.includes(file[0].type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

type SellFormValues = z.infer<typeof SellSchema>;

const city_test = ["Cairo", "Giza"];

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellFormValues>({
    resolver: zodResolver(SellSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: SellFormValues) => {
    console.log("data:", data);
    const formData = new FormData();
    formData.append("apt_name", data.apt_name);
    formData.append("apt_city", data.apt_city);
    formData.append("bedrooms_count", data.bedrooms_count);
    formData.append("bathrooms_count", data.bathrooms_count);
    formData.append("area_m2", data.area_m2);
    formData.append("installment_plan", data.installment_plan);
    formData.append("apt_price", data.apt_price);
    formData.append("apt_delivery_date", data.apt_delivery_date.toISOString());
    formData.append("compound", data.compound);
    formData.append("image", data.image_file[0]);

    setIsLoading(true);

    await postApartment(formData)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error posting apartment:", error);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <LoadingDiv />
      ) : (
        <div className=" flex flex-col mx-5 items-center justify-center ">
          <div className="flex flex-col max-w-6xl w-full bg-slate-300 px-5 rounded-lg  ">
            <h1 className="mt-4 text-center"> Complete The Form</h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-5 w-full my-5"
            >
              <div className="flex flex-col  h-24 justify-around ">
                <label className="">Apartment Title</label>
                <input className="input" {...register("apt_name")} />
                {errors.apt_name && <span>{errors.apt_name.message}</span>}
              </div>

              <div className="flex flex-col  h-24 justify-around">
                <label className="">City</label>
                <select
                  id=""
                  {...register("apt_city")}
                  className="cursor-pointer select h-10"
                  defaultValue={""}
                >
                  <option value="" disabled hidden>
                    --Select City--
                  </option>
                  {city_test.map((item: any, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {errors.apt_city && <span>{errors.apt_city.message}</span>}
              </div>

              <div className="flex flex-col  h-24 justify-around">
                <label className="">Number of Bedrooms</label>
                <input
                  type="number"
                  className="input  "
                  {...register("bedrooms_count")}
                />
                {errors.bedrooms_count && (
                  <span>{errors.bedrooms_count.message}</span>
                )}
              </div>

              <div className="flex flex-col  h-24 justify-around ">
                <label className="">Number of Bathrooms</label>
                <input
                  type="number"
                  className="input  "
                  {...register("bathrooms_count")}
                />
                {errors.bathrooms_count && (
                  <span>{errors.bathrooms_count.message}</span>
                )}
              </div>

              <div className="flex flex-col  h-24 justify-around">
                <label className="">Apartment Area </label>
                <input
                  type="number"
                  className="input  "
                  {...register("area_m2")}
                />
                {errors.area_m2 && <span>{errors.area_m2.message}</span>}
              </div>

              <div className="flex flex-col  h-24 justify-around ">
                <label className="">Installment Plan </label>

                <input className="input  " {...register("installment_plan")} />
                {errors.installment_plan && (
                  <span>{errors.installment_plan.message}</span>
                )}
              </div>

              <div className="flex flex-col   h-24 justify-around">
                <label className="">Apartment Price</label>
                <input
                  type="number"
                  className="input  "
                  {...register("apt_price")}
                />
                {errors.apt_price && <span>{errors.apt_price.message}</span>}
              </div>

              <div className="flex flex-col  h-24 justify-around">
                <label className="">Delivery Date</label>
                <input
                  type="date"
                  className="input  "
                  {...register("apt_delivery_date")}
                />
                {errors.apt_delivery_date && (
                  <span>{errors.apt_delivery_date.message}</span>
                )}
              </div>

              <div className="flex flex-col  h-24 justify-around ">
                <label className="">Compound</label>
                <select
                  id=""
                  {...register("compound")}
                  className="cursor-pointer select"
                  defaultValue={""}
                >
                  <option value="" disabled hidden>
                    --Select compund--
                  </option>
                  {city_test.map((item: any, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {errors.compound && <span>{errors.compound.message}</span>}
              </div>

              <div className="flex flex-col  h-24 justify-around ">
                <label className="">Images</label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  {...register("image_file")}
                />
                {errors.image_file && (
                  <span>{errors.image_file.message as string}</span>
                )}
              </div>
              <button
                type="submit"
                className="flex my-5 mx-auto items-center justify-center max-w-32 max-h-10 rounded-3xl bg-secondary px-4 py-3 text-primary text-lg font-bold shadow-md hover:bg-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
