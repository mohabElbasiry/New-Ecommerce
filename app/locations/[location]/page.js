import { LocationForm } from "./components/locationForm";
import countries from '@/lib/countries.json'
export default async function LocationsPage({ params }) {
  let LocationsData = [];
  try {
     const locations =   countries ;
    if (locations?.length) {
      LocationsData = locations;
    }
  } catch (err) {}

  const { location } = params;
  let locationO = "new";

  if (location !== "new") {
  }
 
  return <LocationForm locationsData={LocationsData} location={{}} />;
}
