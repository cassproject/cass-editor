# Installation


## System Requirements

- 4 GB of ram (Can work with 2 GB with additional configuration)
  - Tomcat: 512 MB (can be reduced to 256 MB)
  - ElasticSearch: 2 GB (can be reduced to 1 GB)
- At least 8 GB of hard drive space.


## CaSS Version Requirements

Minimum CaSS version selection for inclusion of CaSS Authoring Tools should be **1.3**

## CAT/CaSS Installation

### Linux (Debian, Ubuntu, Amazon and other Fedora derivatives)

Install and Upgrade

```
wget https://raw.githubusercontent.com/cassproject/CASS/master/scripts/cassInstall.sh
 chmod +x cassInstall.sh
 sudo ./cassInstall.sh 
```

## Docker

Images for CASS are kept in Docker Hub under [cassproject/cass](https://hub.docker.com/r/cassproject/cass).

The following command will run the CaSS Standalone server with an interactive prompt and expose it on port 80 on the local machine.

```
docker run -it -p80:80 cassproject/cass 
```

Additionally, if you wish to use docker-compose or some other means of deploying CaSS in a constellation of servers, see [this docker-compose file](https://github.com/cassproject/CASS/blob/master/docker-compose.yml).

## Windows

Windows installation uses &quot;[Chocolatey](https://chocolatey.org/)&quot; as a package manager. Chocolatey will be used to install all required CASS dependencies (maven, git, and elasticsearch).

If you would like to install these packages by hand or using another tool, please feel free.

[CASS Package on Chocolatey](https://chocolatey.org/packages/cass)

### Once

From an elevated command line:

```
@powershell -NoProfile -ExecutionPolicy Bypass -Command &quot;iex ((New-Object System.Net.WebClient).DownloadString(&#39;https://chocolatey.org/install.ps1&#39;))&quot; &amp;&amp; SET &quot;PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin&quot;

 refreshenv

 choco install -y cass

 refreshenv 
```

Go to services, start _elasticsearch-service-x64_ and set it to start automatically.

### Install/Upgrade

From an elevated command line:

```
choco install -y cass 

```


## Setup

- Set up DNS endpoint
- Set up HTTPS certificate
- Set up [IIS Reverse Proxy](https://weblogs.asp.net/owscott/creating-a-reverse-proxy-with-url-rewrite-for-iis)
  - Reverse Proxy Endpoint: https://\&lt;your cass domain\&gt;/ -\&gt; http://localhost:8080/cass/
- In your firewall, deny access to ports 9200, 8080 to all machines except localhost.


## Post-Installation Checklist

1. Ensure API is started and reachable through a desired endpoint
  1. (ex: http://cass.\&lt;your\_organization\&gt;.org/api/custom/).
  2. Note that all objects created will use this endpoint in their permanent locator, so make sure!
2. Ensure Website is reachable through a desired endpoint
  1. (ex: http://cass.\&lt;your\_organization\&gt;.org/).
  2. CASS attempts to auto-detect the endpoint for the Tomcat server automatically. XSS or obscure endpoints may require additional configuration.
3. Check your character encoding
  1. Look at the logfile (\&lt;tomcat\&gt;/logs/\*.log) of when the server starts up, if the character set is not UTF-8, follow the FAQ instructions to force Tomcat/Java to use file.encoding=UTF-8

## Testing, upgrade, and installation FAQ

1. Most errors will occur due to a lack of connectivity with the appropriate endpoint. Use the Browser Development Tools to ensure that requests are going to the correct location.
  1. Check to ensure the environment variable CASS\_LOOPBACK is set to the endpoint of the server.
2. Apache requires proxy\_http to function. If Apache fails to start up, the proxy\_http module may not be enabled. In HTTPD, this is called mod\_proxy\_http.
3. The installer will not modify a current install of the Apache/HTTPD Web Server if proxy settings are being used (even from a previous install).
4. When upgrading from 0.1.0 -- If you get the error `HTTP Status 404 - /cass-0.0.1/`
  1. Alter the apache conf files to use ProxyPass / http://localhost:8080/cass/, not ProxyPass / [http://localhost:8080/cass-0.0.1/](http://localhost:8080/cass-0.0.1/)
5. On windows machines or machines where the default character encoding is not UTF-8, you will need to set a Tomcat Java parameter: -Dfile.encoding=UTF-8 to avoid character encoding errors when dealing with unicode characters.
6. After an upgrade, database incompatibilities may occur. You may export and import data before upgrades using the following web services:
  1. http://\&lt;endpoint\&gt;/skyrepo/util/backup?secret=[contents of skyId.secret in tomcat folder]
  2. http://\&lt;endpoint\&gt;/skyrepo/util/restore?secret=[contents of skyId.secret in tomcat folder]
