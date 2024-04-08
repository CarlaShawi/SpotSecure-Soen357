export interface User {
  uid: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface UserDTO {
  FirstName: string;
  LastName: string;
  ID: string;
  Authority: Authority;
  Email: string;
  ProfilePicture: string;
  PhoneNumber: string;
  UserName: string;
}

export enum Authority {
  Public = 'Public',
}
