declare namespace Express {
  export interface Request {
    user?: {
      uid: string;
      email?: string;
      // ggf. weitere Felder aus decodedToken
    };
  }
}