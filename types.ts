
export interface Peak {
  id: string;
  name: string;
  height: number;
  location: string;
  difficulty: string;
  rank: number;
  lat: number;
  lng: number;
  mountainRange: string;
  notes?: string;
}

export interface UserStats {
  climbedIds: string[];
}
