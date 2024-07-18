import { ClipLoader } from "react-spinners";

type LoadingDivProps = {
  caption?: string;
};

export default function LoadingDiv({ caption }: LoadingDivProps) {
  return (
    <div className="flex flex-col gap-y-5 mx-auto items-center justify-center mb-10 py-5">
      <ClipLoader
        color={"#1f4163"}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h1 className="text-center text-2xl text-gray-600 font-semibold">
        {caption}
      </h1>
    </div>
  );
}
