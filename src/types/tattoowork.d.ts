export type TattooWorkType = "tattoo" | "piercing";

export interface TattooWork {
  id: number;
  description: string;
  imageUrl: string;
  tattooistId: number;
  tattooist: User;
  type: TattooWorkType;
  createdAt: Date;
  updatedAt: Date;
}
