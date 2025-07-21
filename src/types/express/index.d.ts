declare namespace Express {
  export interface Request {
    /** JWT-authenticated user payload */
    user?: {
      id: number;
      role: string;
    };
  }
}
