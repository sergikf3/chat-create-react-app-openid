import { createUserManager } from 'redux-oidc';
import configuration from './configuration';

const userManagerConfig = {
  client_id: configuration.client_id,
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type: configuration.response_type,
  scope: configuration.scope,
  authority: configuration.authority,
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew`,
  automaticSilentRenew: configuration.automaticSilentRenew,
  filterProtocolClaims: configuration.filterProtocolClaims,
  loadUserInfo: configuration.loadUserInfo
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
