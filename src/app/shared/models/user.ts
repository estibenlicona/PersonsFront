export class User {
  name?: string | null;
  username!: string | null;
  password!: string | null;
  scopes?: Array<string> | null;
  accessToken?: string | null;
}
