# Delete

To delete an object from a CaSS Repository:

1. Construct a url to ```http(s)://<endpoint>/<type>/<id>/<version>```
    * **Endpoint:** Endpoint of the CaSS Repository
    * **Type:** Type of the object in semi-reversed notation
        * (ex: *schema.eduworks.com.cass.0.1.framework*)
    * **Id:** GUID for the object
        * This identifier may differ from the value stored in the object’s @id field. This is used when registering data stored on another server.
        * For registering data retrieved from another server, a typical identifier for storage in CaSS is the MD5 hash of the @id field.
    * **Version:** Numerical indicator of the version, typically a last modified time in unix format.

2. You must include a signatureSheet entry with a valid signature of one of the owners in order to authorize the deletion of the object. This must be stored in the ```signatureSheet``` header field of the request. See the [Create](../create/) section for instructions to construct a valid signature.
```json
signatureSheet (as header):
[
    {
        "@owner" : "-----BEGIN PUBLIC KEY-----MIIBI...QAB-----END PUBLIC KEY-----",
        "@context" : "http://schema.eduworks.com/ebac/0.1/",
        "@signature" : "hE7H8vPa...==",
        "@type" : "http://schema.eduworks.com/ebac/0.1/timeLimitedSignature",
        "expiry" : 1463524950899,
        "server" : "http://sandbox.service.cassproject.org/"
    }
]
```

3. Submit an HTTP(S) DELETE with the above URL.
```http
DELETE /api/custom/data/schema.eduworks.com.cass.0.1.framework/63eae4f2-1f3b-46c0-8473-c6e4ed4404d0 HTTP/1.1
Host: demo.cassproject.org
Connection: keep-alive
Accept: */*
signatureSheet: [{"@owner":"-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi37h/zxQLcndtVHxknaNTRkHuZF+xCE3oQWfsSEjsBNag6J4bA3t6u6LT1Bu8nvNXXN5P7FN8c+/n7P1166MEQLHfgJ6v2Nkg/90ym/PTUhsF4e/D23qRiPrknjKlOSgASTYBmF2f75f6NEUDRmU4cxLtYCbq9Nts35ZYw1uszr/jRcyGWHoBW8F08fk6Oaj/IGURi3vv2G24pYmanp+MOVkjPDvyOJJGDFTWgIFwqCgNPw1y2foRdyoLeGlJlv0svr11vvRY28tg+TKI5GeQZhC/rFiX/nlCFr3rBL6Go7zm1X86GwSxfrqwRszKhSI7vvcuUMn3reoJ1f2N1fE7QIDAQAB-----END PUBLIC KEY-----","@context":"http://schema.eduworks.com/ebac/0.1/","@signature":"bkxuN4Tsu7pyYt8LduFehmgyAcJkHMwvpayKLKnbqBk1KU4naPgqEy1v+NfdVsMVTn1wz5Obn7XcegL8Mds8aNijz/fVGjZrGHu5Vp+VTJoXvAAA6SdeYI2RygegVBlwBemCT+NFqMM6kws6zHndrPvkOa5sIdwUtmoriWaO3p4pzNWRxl4x2ziO95Ko4u3MTQ/d87xMCJLE5LuXZiadRknhPgJSGmuK7WBzaxmOS+4YM9Ju9HF6ywIvMIYKQk8pzRw+Y/23KuPxAxhyk+8CCA1XvVlUkUJaIu8Al24nQVO77MgeHzB1S9p0JaxodhqJgYD/DNri3tJ3uNQntpHhMQ==","@type":"http://schema.eduworks.com/ebac/0.1/timeLimitedSignature","expiry":1463528926960,"server":"https://demo.cassproject.org/api/custom/data/schema.eduworks.com.cass.0.1.framework/63eae4f2-1f3b-46c0-8473-c6e4ed4404d0/1463528860831"}]
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36
Origin: https://demo.cassproject.org
Referer: https://demo.cassproject.org/cass.example/framework.html
Accept-Encoding: gzip, deflate, sdch
Accept-Language: en-US,en;q=0.8

HTTP/1.1 200 OK
Date: Tue, 17 May 2016 23:48:00 GMT
Server: Apache-Coyote/1.1
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS
Access-Control-Allow-Headers: If-Modified-Since, Content-Type, Content-Range, Content-Disposition, Content-Description, signatureSheet
cache-control: private, no-cache, no-store
Content-Type: application/json
Set-Cookie: JSESSIONID=F3292AE7080994683219BD9256C3E787; Path=/cass-0.0.1/; HttpOnly
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
```