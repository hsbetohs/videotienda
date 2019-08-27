export interface MovieInterface {
  id?: number;
  name?: string;
  description?: string;
  actors?: Array<string>;
  director?: string;
  rentalCost?: number;
  quantity?: number;
}
