const columnHeaders = [
  "First Name",
  "Last Name",
  "City",
  "Degree",
  "Years of Experience",
  "Phone Number",
];
export const AdvocateHeading = () => {
  return (
    <div>
      {columnHeaders.map((header) => (
        <div key={header}>{header}</div>
      ))}
    </div>
  );
};
