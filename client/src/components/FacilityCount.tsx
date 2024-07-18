import React from "react";
import { IconType } from "react-icons";

type FacilityCountProps = {
  count: number;
  children: React.ReactElement;
};
const FacilityCount: React.FC<FacilityCountProps> = ({ count, children }) => {
  return (
    <div className="flex gap-1 ">
      <div className="text-gray-700 rounded-lg bg-gray-200 p-2 relative w-9 h-9">
        {React.cloneElement(children, {
          className: "w-full h-full text-gray-700",
        })}
      </div>

      <div className=" absolute">
        <span className="text-black  font-medium text-sm absolute top-0">
          {count}
        </span>
      </div>
    </div>
  );
};

export default FacilityCount;
