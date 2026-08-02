import type {
  CatalogueItem,
  Submission,
  TeamMember,
} from "@/src/types/domain";

export interface PublishingHouseService {
  getCatalogue(): Promise<CatalogueItem[]>;
  getSubmissions(): Promise<Submission[]>;
  getTeam(): Promise<TeamMember[]>;
}
