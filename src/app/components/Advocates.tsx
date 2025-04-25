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
              className="advocate-card"
            >
              <div className="advocate-row">
                <div>
                  {advocate.lastName},{" "}
                  {advocate.firstName}
                </div>
                <div>{advocate.city}</div>
                <div>{advocate.degree}</div>
                <div>
                  {advocate.yearsOfExperience}
                </div>
                <div>{advocate.phoneNumber}</div>
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
