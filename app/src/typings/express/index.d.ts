declare namespace Express {
  export interface Request {
    userId?: string;
  }
}

import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    roles?: string[];
    loggedIn?: boolean;
  }
}