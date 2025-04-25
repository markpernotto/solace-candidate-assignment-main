import {
  Advocate,
  AdvocatesData,
} from "../utilities/types";
import { AdvocateHeading } from "./AdvocateHeader";
import { AdvocateSpecialties } from "./AdvocateSpecialties";

export const Advocates = ({
  data,
}: AdvocatesData) => {
  return (
    <>
      <AdvocateHeading />
      <div className="flex flex-col gap-4 ">
        {data.map((advocate: Advocate) => {
          return (
            <div
              key={advocate.id}
              className="flex flex-col w-full gap-4 justify-between"
            >
              <div className="flex w-full justify-between">
                <div className="flex-1">
                  {advocate.lastName},{" "}
                  {advocate.firstName}
                </div>
                <div className="flex-1">
                  {advocate.city}
                </div>
                <div className="flex-1">
                  {advocate.degree}
                </div>
                <div className="flex-1">
                  {advocate.yearsOfExperience}
                </div>
                <div className="flex-1">
                  {advocate.phoneNumber}
                </div>
              </div>
              <AdvocateSpecialties
                specialties={advocate.specialties}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
