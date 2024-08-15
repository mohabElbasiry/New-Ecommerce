import { LocationForm } from "./components/locationForm";

export default async function LocationsPage({ params }) {
  let LocationsData = [];
  try {
    const fetChAllLocation = await fetch("https://restcountries.com/v3.1/all");
    const locations = await fetChAllLocation.json();
    if (locations?.length) {
      LocationsData = locations;
    }
  } catch (err) {}

  const { location } = params;
  let locationO = "new";

  if (location !== "new") {
  }
  console.log(LocationsData,'LocationsData');

  return <LocationForm locationsData={LocationsData} location={{}} />;
}
