# Deployment

Here, we'll go into detail about everything to do with deploying for production.

CASS is both horizontally and vertically scalable, as well as highly resilient. It can be deployed on Windows or Linux platforms in single server environments, behind multiple load balanced servers or Virtual Machines.

## Application Server

CASS may be deployed with any Node.js process manager. **PM2** is the default process manager provided with an installation. CASS Application Servers are mostly stateless, with the exception of security credentials, which must be reachable from the working directory of the servlet container.

CASS generates several files upon startup and first use of adapters and features. As such, it is recommended that the user running the servlet container be allowed to modify the working directory of the servlet container.

:::warning
Version of CaSS before 0.4 have certain compromises in place that prevent horizontal scaling. This is resolved in version 0.4.
:::

## Database Scalability

CASS uses ElasticSearch as a search engine and object store.

ElasticSearch is **Vertically Scalable** with
* Processors
* Memory
* I/O

ElasticSearch is **Horizontally Scalable** by defining clusters. Consult the [ElasticSearch Documentation](https://www.elastic.co/guide/index.html) to perform these operations.

:::warning
Do not configure ElasticSearch to accept connections from the outside web, as this may expose encrypted information that is intended to be private.
:::

## Web Server Proxy/Load Balancing

By default, the CASS Installation installs a web server (*Apache2 or HTTPD*), an application server (*PM2/Node*), and a database (*ElasticSearch*). The web server may be moved to another machine and scaled horizontally/vertically without issue.

## General Security

CASS uses two major layers of security:
1. **Per-Object Security** - The application that creates the data uses encryption to protect data from use by anyone, including the server owner
2. **Server Security** - Signed requests must be provided for the server to return encrypted information

This two-layer strategy is called "**No Knowledge**" Security or Privacy. It ensures the protection of a user’s data by having the server require both authentic requests to return data and mechanisms to decrypt the data that are not available on the server. This means that, by design, your server may store data that you cannot access.