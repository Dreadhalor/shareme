export interface SanityUniversalSchema {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface User extends SanityUniversalSchema {
  userName: string;
  image: string;
  googleLoginResponse: string;
}
