const columnHeaders = [
  "First Name",
  "City",
  "Degree",
  "Years of Experience",
  "Phone Number",
];
export const AdvocateHeading = () => {
  return (
    <div className="advocate-heading">
      {columnHeaders.map((header) => (
        <div className="flex-1" key={header}>
          {header}
        </div>
      ))}
    </div>
  );
};
