export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export interface AdvocatesApiResponse {
  results: Advocate[];
}

export interface Database {
  insert<T>(table: unknown): InsertQuery<T>;
}

export interface InsertQuery<T> {
  values(data: T[]): {
    returning(): Promise<T[]>;
  };
}
