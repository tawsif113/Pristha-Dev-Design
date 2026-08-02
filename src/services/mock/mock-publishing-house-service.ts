import {
  catalogueItems,
  submissions,
  teamMembers,
} from "@/src/mocks/publishing-house";
import type { PublishingHouseService } from "@/src/services/contracts/publishing-house-service";

export const mockPublishingHouseService: PublishingHouseService = {
  async getCatalogue() {
    return catalogueItems;
  },
  async getSubmissions() {
    return submissions;
  },
  async getTeam() {
    return teamMembers;
  },
};
