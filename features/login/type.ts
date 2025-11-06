// types.ts
export type UserType = "user" | "partner";
export interface AuthPayload {
  mobile: string;    // expected 10-digit Indian mobile
  password: string;  // plain text here; send over HTTPS only
  type: UserType;
}
