import { Configuration } from "@azure/msal-browser";

const TENANT =
  "https://setmatchlogin.onmicrosoft.com/1bd5ae76-3c20-4ebd-a211-b09041bd5ba9";

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_setmatch_auth_v1",
    profileEdit: "B2C_1_setmatch_auth_edit",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://setmatchlogin.b2clogin.com/setmatchlogin.onmicrosoft.com/B2C_1_setmatch_auth_v1",
    },
    profileEdit: {
      authority:
        "https://setmatchlogin.b2clogin.com/setmatchlogin.onmicrosoft.com/B2C_1_setmatch_auth_edit",
    },
  },
  authorityDomain: "setmatchlogin.b2clogin.com",
};

export const msalConfig: Configuration = {
  auth: {
    clientId: "0e2be501-1bee-4c1b-bced-bed16e0b2001",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    `${TENANT}/access_as_user`,
    `${TENANT}/matches.write`,
    `${TENANT}/users.read`,
  ],
};
