# Search

To search for one or more objects in a CaSS Repository:

1. Construct a search query according to the [Simple Query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html) format of ElasticSearch. ```(@type:"http://schema.eduworks.com/cass/0.1/framework") AND ("O*NET")```

2. Construct a url to ```http(s)://<endpoint>/sky/repo/search?q=<query>```
    * **Endpoint:** Endpoint of the CaSS Repository
    * **q:** Search query (URL encoded).
```
https://sandbox.service.cassproject.org/sky/repo/search?q=(@type:%22http://schema.eduworks.com/cass/0.1/framework%22)
```

3. Should the desired objects be defined in the schema as a protected type or have encrypted fields:
    * You must include a signatureSheet entry with a valid signature of one of the owners in order to authorize the retrieval of the object. This may be done in one of two ways:
        * Include the signature sheet as a Multi Part Mime attachment of the HTTP request, this requires the request be a POST.
        * Alternatively, you may include the signature sheet in a header and use the **q** URL parameter.
        * See the Put section for instructions to construct a valid signatureSheet signature.

4. Submit a HTTP(S) GET with the above URL.

```http
GET /sky/repo/search?q=(@type:%22http://schema.eduworks.com/cass/0.1/framework%22) HTTP/1.1
Host: sandbox.service.cassproject.org
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: en-US,en;q=0.8
```

::: tip
Should the GET include a signatureSheet, the method type must be POST.
```http
POST /sky/repo/search HTTP/1.1
Host: sandbox.service.cassproject.org
Connection: keep-alive
Content-Length: 293
Accept: */*
Origin: https://sandbox.cassproject.org
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryYUvs9MBlv0jPr3Lp
Referer: https://sandbox.cassproject.org/cass.example/framework.html
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.8

------WebKitFormBoundaryYUvs9MBlv0jPr3Lp
Content-Disposition: form-data; name="data"

(@type:"http://schema.eduworks.com/cass/0.1/framework")
------WebKitFormBoundaryYUvs9MBlv0jPr3Lp
Content-Disposition: form-data; name="signatureSheet"

[]
------WebKitFormBoundaryYUvs9MBlv0jPr3Lp--
```
:::

5. Receive a JSON Array with zero or more JSON-LD objects representing search results, up to 50.
::: tip
To retrieve additional objects, use the URL Parameter **size** to increase the size of the search results or **start** to perform paging.
:::
```json
[
    {
      "@id": "http://sandbox.service.cassproject.org/data/schema.eduworks.com.cass.0.1.framework/007c67a2-c3a1-4b38-b222-a47e3c6cef39/1461770282857",
      "@owner": ["-----BEGIN PUBLIC KEY-----MIIBI...-----END PUBLIC KEY-----"],
      "@context": "http://schema.eduworks.com/cass/0.1",
      "@signature": ["Nj4vGM...=="],
      "@type": "http://schema.eduworks.com/cass/0.1/framework",
      "description": "Test framework for SoarTech",
      "name": "SoarTech Test"
    }
]
```