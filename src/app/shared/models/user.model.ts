export interface Roles {
  editor?: boolean;
  admin?: boolean;
}

export interface UserInterface {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  rol?: Roles;
}
