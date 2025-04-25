import { AdvocateSpecialtiesProps } from "../utilities/types";
export const AdvocateSpecialties = ({
  specialties,
}: AdvocateSpecialtiesProps) => {
  return (
    <>
      <h3>Specialties:</h3>
      <div className="flex gap-1 w-full flex-wrap">
        {specialties.map((s, i) => (
          <div
            className={"advocate-specialty"}
            key={i}
          >
            {s}
          </div>
        ))}
      </div>
    </>
  );
};
