

import { User } from 'oidc-client';
import { createOidcAuth, SignInType, LogLevel } from 'vue-oidc-client/vue3';

const AuthService = createOidcAuth(
  'auth',
  SignInType.Window,
  import.meta.env.VITE_REDIRECT_URI,
  {
    authority: import.meta.env.VITE_AUTHORITY,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    client_id: import.meta.env.VITE_CLIENT_ID, 
    response_type: import.meta.env.VITE_RESPONSE_TYPE,
    scope: import.meta.env.VITE_SCOPE,
    prompt: 'none',
    filterProtocolClaims: import.meta.env.VITE_FILTER_PROTOCOL_CLAIMS,
    automaticSilentRenew: import.meta.env.VITE_AUTOMATIC_SILENT_RENEW,
    loadUserInfo: import.meta.env.VITE_LOAD_USER_INFO,
    post_logout_redirect_uri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,

  },
  console,
  LogLevel.Debug
)

// handle events
AuthService.events.addAccessTokenExpiring(function() {
  // eslint-disable-next-line no-console
  console.log('access token expiring')
})

AuthService.events.addAccessTokenExpired(function() {
  // eslint-disable-next-line no-console
  console.log('access token expired')
})

AuthService.events.addSilentRenewError(function(err: Error) {
  // eslint-disable-next-line no-console
  console.error('silent renew error', err)
})

AuthService.events.addUserLoaded(function(user: User) {
  // eslint-disable-next-line no-console
  console.log('user loaded', user)
})

AuthService.events.addUserUnloaded(function() {
  // eslint-disable-next-line no-console
  console.log('user unloaded')
})

AuthService.events.addUserSignedOut(function() {
  // eslint-disable-next-line no-console
  console.log('user signed out')
})

AuthService.events.addUserSessionChanged(function() {
  // eslint-disable-next-line no-console
  console.log('user session changed')
})

export default AuthService