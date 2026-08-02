import { publishingHouseService } from "@/src/services";
import {
  HouseExperience,
  type HouseSection,
} from "./house-experience";

export async function HouseRoute({
  section,
}: {
  section: HouseSection;
}) {
  const [catalogue, submissions, team] = await Promise.all([
    publishingHouseService.getCatalogue(),
    publishingHouseService.getSubmissions(),
    publishingHouseService.getTeam(),
  ]);
  return (
    <HouseExperience
      section={section}
      catalogue={catalogue}
      submissions={submissions}
      team={team}
    />
  );
}
