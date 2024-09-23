export interface IPayloadUserJwt {
  id: string;
}

export interface IUserFromRequest {
  id: string;
  email: string;
}

export interface ISessionAuthToken {
  token: string;
  refreshToken: string;
}
