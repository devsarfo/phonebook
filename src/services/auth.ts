import { User, UserManager } from "oidc-client-ts";

export default class AuthService {

  private userManager: UserManager;

  constructor() {

    const settings = {
      authority: import.meta.env.VITE_AUTHORITY,
      client_id: import.meta.env.VITE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      post_logout_redirect_uri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,
      response_type: import.meta.env.VITE_RESPONSE_TYPE,
      scope: import.meta.env.VITE_SCOPE,
      filterProtocolClaims: import.meta.env.VITE_FILTER_PROTOCOL_CLAIMS,
      loadUserInfo: import.meta.env.VITE_LOAD_USER_INFO,
      automaticSilentRenew: true,
      silent_redirect_uri: import.meta.env.VITE_SILENT_REDIRECT_URI,
    };

    this.userManager = new UserManager(settings);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public static async token()
  {
    const auth = new AuthService();
    const user = await auth.getUser();
    
    return user?.access_token;
  }
}