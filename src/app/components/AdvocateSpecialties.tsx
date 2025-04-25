import { AdvocateSpecialtiesProps } from "../utilities/types";
export const AdvocateSpecialties = ({
  specialties,
}: AdvocateSpecialtiesProps) => {
  return (
    <>
      <h3 className="advocate-specialties-header">
        Advocate Specialties:
      </h3>
      <div className="flex gap-1 w-full flex-wrap">
        {specialties
          .sort((a, b) => a.localeCompare(b))
          .map(
            (
              specialty,
              indexOfSpecialtyInArray,
            ) => (
              <div
                className={"advocate-specialty"}
                key={indexOfSpecialtyInArray}
              >
                {specialty}
              </div>
            ),
          )}
      </div>
    </>
  );
};
