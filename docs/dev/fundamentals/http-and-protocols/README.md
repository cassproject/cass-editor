# HTTP(s), Protocols

It is recommended that CASS repositories serve resources in a secure fashion using SSL certificates.

## Default Installation Configuration

CASS has the following endpoints exposed by default:

| **Port** | **Service**       | **Notes**                                             |
|----------|-------------------|-------------------------------------------------------|
| 80       | Apache2/HTTPD/... | Uses proxy_http to send requests to PM2 @port 8080    |
| 8080     | PM2/Node          | Runs the CaSS Repo                                    |
| 9200     | ElasticSearch     | Only responds to localhost                            |

## HTTPS

The default installation method of CASS is compatible with [LetsEncrypt](https://letsencrypt.org/), a project to provide SSL certificates to anyone. *It is recommended to create a cron job to renew your LetsEncrypt certificate.*

Other certificate providers are also supported. Configuration of the server should be done according to the certificate provider instructions.

:::tip NOTE
Use the ```--apache``` option to ensure the configuration of apache instead of other HTTP servers
:::

## WebSockets

CASS allows for websocket connections. When connected, CASS will echo the identifier for any object that has been updated to all connected websockets.

This allows for
* Smarter applications that can update themselves when new data has been saved to the repository
* Software that monitors CASS and performs some operation when data is updated, such as search aggregators