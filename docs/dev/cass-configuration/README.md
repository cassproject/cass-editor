# CaSS Configuration

There are a number of environment variables that can be configured to change the ways that CaSS behaves.

## `HTTPS`
Should CaSS use HTTPS. Defaults to `false`.

## `ELASTICSEARCH_ENDPOINT`
URL for the elastic search service. Defaults to `http://localhost:9200`.

## `CASS_LOOPBACK`
URL for the CaSS API. Defaults to `http://localhost/api/` or `https://localhost/api/`, depending on if https is enabled.

## `CASS_LOOPBACK_PROXY`
Optional URL for the loopback proxy. Used when the endpoint that CaSS uses to talk to itself is different than how it represents itself, for example the loopback proxy may be on localhost.

## `CASS_OIDC_ENABLED`
Should CaSS use OpenID Connect. Defaults to `false`.

## `CASS_OIDC_ISSUER_BASE_URL`
URL for the OpenID Connect issuer, e.g. Keycloak. Defaults to `https://dev.keycloak.eduworks.com/auth/realms/test-realm/`.

## `CASS_OIDC_CLIENT_ID`
ID of the client being used in OpenID Connect. Defaults to `cass`.

## `CASS_OIDC_SECRET`
Secret key for the above client.

## `CASS_OIDC_BASE_URL`
Base URL for login and logout API when using OpenID Connect. Defaults to `http://localhost/`.

## `CASS_JWT_ENABLED`
Should CaSS use JWT for authentication. Defaults to `false`.

## `CASS_JWT_SECRET`
Secet key for JWT. Defaults to `cass`.

## `CASS_JWT_ALGORITHM`
JWT Algorithm to use. Defaults to `HS256`.

## `CASS_BANNER_MESSAGE`
Optional message to display in banners along the top and bottom of the CaSS Editor.

## `CASS_BANNER_TEXT_COLOR`
Optional color for the banner message text. Defaults to the CaSS Editor theme colors.

## `CASS_BANNER_BACKGROUND_COLOR`
Optional color for banner background. Defaults to the CaSS Editor theme colors.

## `CASS_EXTERNAL_ENDPOINT`
Optional URL for a CaSS instance to use as the endpoint for creating alignments/relations, instead of this CaSS instance.

## `CASS_REPLICATION_ENDPOINT`
Optional URL of another CaSS instance to replicate data to.

## `CASS_REPLICATION_PPK`
The key for the above replication endpoint.

## `PROFILE_REPOSITORY_CACHE`
Should CaSS cache computed profiles in a repository. Defaults to `false`.

## `PROFILE_CACHE`
Should CaSS cache computed profiles in memory. Defaults to `false`.

## `PROFILE_PPK`
Optional private key for CaSS to use when querying for a profile.

## `DEFAULT_PLUGINS`
Optional array of URLs to plugins to be made available within the CaSS Editor. If deployed at the same URL as CaSS, the base of the URL can be omitted: `["/my-feature"]` is transformed to `"https://my-cass-instance/my-feature"`. Available in 1.5.6+.

## `MOTD_MESSAGE`
Optional message to display as a popup when users open the CaSS Editor.

## `MOTD_TITLE`
Optional title for the above message.

## `DISABLED_ADAPTERS`
Optional comma separated list of adapters to disable in CaSS. Valid options include: `asn, case, ceasn, jsonld, badge, xapi, profile`.

## `MAX_CONNECTIONS`
Optional limit on the number of concurrent connections to the CaSS server. Should be an integer value.

## `LOG_FILTERED_CATEGORIES`
Optional comma separated list of logging categories to disable. Valid options include: `sys, auth, msg, fs, net, stor, adap, prof`.

## `LOG_FILTERED_SEVERITIES`
Optional comma separated list of logging severities to disable. Valid options include: `EMERGENCY, ALERT, CRITICAL, ERROR, WARNING, NOTICE, INFO, DEBUG`.

## `LOG_FILTERED_MESSAGES`
Optional comma separated list of specific log messages to disable.

## `SMTP_HOST`
Optional SMTP server to use in order to send emergency email warnings regarding the CaSS instance.

## `SMTP_PORT`
Optional SMTP port for the above SMTP server. Defaults to `587`.

## `SMTP_USER`
Optional username for the above SMTP server.

## `SMTP_PASS`
Optional password for the above SMTP server.

## `SMTP_RECIPIENTS`
Optional comma separated list of email addresses which should receive email notifications from the above SMTP server.

