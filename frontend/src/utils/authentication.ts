import { UserManager } from "oidc-client-ts";

const FRONTEND_URL = window.location.origin;

export const mgr = new UserManager({
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: `${FRONTEND_URL}/auth/callback`,
  silent_redirect_uri: `${FRONTEND_URL}`,
  post_logout_redirect_uri: `${FRONTEND_URL}`,
  response_type: "code",
  scope: "openid profile email",
  disablePKCE: true,
});
