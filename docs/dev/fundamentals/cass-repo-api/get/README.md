# Get

*aka '**READ**'*

1. Construct a url to  ```http(s)://<endpoint>/<type>/<id>/<version>```
    * **Endpoint:** Endpoint of the CaSS Repository
    * **Type *(Optional)*:** Type of the object in semi-reversed notation
        * (ex: schema.eduworks.com.cass.0.1.framework)
        * Including this field, when possible, increases retrieval speed.
    * **Id:** Identifier of the object.
        * This identifier may differ from the value stored in the object’s @id field. This is used when registering data retrieved from another server.
    * **Version *(Optional)*:** Numerical indicator of the version, typically a last modified time in unix format. If omitted, the latest version.

2. Should the object be defined in the schema as a protected type or have encrypted fields:
    * You must include a signatureSheet entry with a valid signature of one of the owners in order to authorize the retrieval of the object. This requires the method type of the HTTP request to be a POST. See the [SignatureSheet Section](TODOTODOTODO) for instructions to construct a valid signature.
        * Alternatively, you may keep the method type as GET and include the signature sheet in the signatureSheet header as JSON.
```json
signatureSheet (as multi part mime attachment or header):
[
    {
        "@owner" : "-----BEGIN PUBLIC KEY-----MIIBI ... QAB-----END PUBLIC KEY-----",
        "@context" : "http://schema.eduworks.com/ebac/0.1/",
        "@signature" : "hE7H8vPa...==",
        "@type" : "http://schema.eduworks.com/ebac/0.1/timeLimitedSignature",
        "expiry" : 1463524950899,
        "server" : "http://sandbox.service.cassproject.org/"
    }
]
```

3. Submit an HTTP(S) GET with the above URL.
```http
GET /data/schema.eduworks.com.cass.0.1.competency/758bebae-c12e-4be2-89db-1fad7854546e/1456271061920 HTTP/1.1
Host: sandbox.service.cassproject.org
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: en-US,en;q=0.8

HTTP/1.1 200 OK
Date: Tue, 17 May 2016 22:48:54 GMT
Server: Apache-Coyote/1.1
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS
Access-Control-Allow-Headers: If-Modified-Since, Content-Type, Content-Range, Content-Disposition, Content-Description, signatureSheet
cache-control: private, no-cache, no-store
Content-Type: application/json
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
```

::: tip
If the GET includes a signature as a multi-part POST, the method type must be POST.
```http
POST /data/schema.eduworks.com.cass.0.1.competency/93c19e2a-2306-45ac-86a6-67e73b8042a8 HTTP/1.1
Host: sandbox.service.cassproject.org
Connection: keep-alive
Content-Length: 1233
Accept: */*
Origin: https://sandbox.cassproject.org
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryzFvq2ZifKkR7nmQG
Referer: https://sandbox.cassproject.org/cass.example/framework.html
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.8

------WebKitFormBoundaryzFvq2ZifKkR7nmQG
Content-Disposition: form-data; name="signatureSheet"
[
    {
        "@owner" : "-----BEGIN PUBLIC KEY-----MIIBI...QAB-----END PUBLIC KEY-----",
        "@context" : "http://schema.eduworks.com/ebac/0.1/",
        "@signature" : "eQOJt9...==",
        "@type" : "http://schema.eduworks.com/ebac/0.1/timeLimitedSignature",
        "expiry" : 1463525567195,
        "server" : "http://sandbox.service.cassproject.org/data/schema.eduworks.com.cass.0.1.competency/93c19e2a-2306-45ac-86a6-67e73b8042a8"
    }
]
------WebKitFormBoundaryzFvq2ZifKkR7nmQG--
```
:::

4. Receive a single JSON-LD object as a reply.

5. (Optional) Validate the object by verifying the signatures.
    * Select a signature, iterate over all owners.
        * Decode the owner public key.
            * The format is X.509 SubjectPublicKeyInfo/OpenSSL PEM public key.
        * Decode the signature.
            * The format is Base64.
        * Create a copy of the object.
        * Remove ```@signature```, ```@owner```, ```@reader```, and ```@id``` keys (and values) from the object.
        * Serialize the object in JSON format (UTF-8) with the keys sorted in UTF-8 string sort order and with no whitespace.
        * Verify the serialized object using a SHA1 digest of the serialized object, and RSA-2048 bit encryption.
            * Note the signature is Base64 encoded. Most RSA libraries require raw byte streams.
            * Note that if insufficient permissions were provided to retrieve the entire object, the signature will fail.
```json
{
     "@id": "http://sandbox.service.cassproject.org/data/schema.eduworks.com.cass.0.1.competency/93c19e2a-2306-45ac-86a6-67e73b8042a8/1456271062644",
     "@owner": ["-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvheHGtT0Aw4d2xlHfWw5\r\nJq6VixsUoTMoF6P6v/wmNhO3TYpGfYYV6pP2t+wHRJXss8CANp0yjnd9GI0gxHGs\r\nBxEDj5ykRYu+iC1i4SKNRVPy3BR8AHaOkAnXZRhEKtK3yloHh/aDs/6xNgMyBiPB\r\nZ+msLuI/7B/ecIkA0qtITWZvx0V/qiApzTC+d60mYedI37rhfmqFNkJwz2aAkpbd\r\nsxsUvHB1bCUS3S1OC6DMCEWWCBY5V8UUbE/V8a5Bhwv6GJiA+u+LxvUCY6rsaEJs\r\nOFLuxfJWeAYlcq2DBkS3CUAzqJ/aJzJjG3l8+GfdUOfKVJAjKJXAUkrCAvJsJ4Bt\r\npwIDAQAB\r\n-----END PUBLIC KEY-----\r\n"],
     "@context": "http://schema.eduworks.com/cass/0.1",
     "@signature": ["SQFA2Ej14wK78/VS7buKtGwqeNkycYaQF/jJxXbFQcPBH9TjrimwHAON5P83sRyrMe3KnDI/EHUyzh2dnhy+clZzehMhJL+DHtA1lYfdBEC4wIYleIrRVsUslTtfmYz27ZvUX23jyzA2wLH55HxNxUqCAlSZVaLsm3f9i0JD+MVJohJQoJJqNnSSY9lS1JOpH07q4VdQWvU31t/AFTvLWY7Q6tCzKtEJYcH25fryEDY8cJ4uyGRgdNE8/a+2w31uYS9FKsCWzUY47neue807AlZk4JT0VppzxcI09PNKsHLOLaAVXexi2Vl8uWRztBBrES0CWw3br9cm7fQcxy9bWw=="],
     "@type": "http://schema.eduworks.com/cass/0.1/competency",
     "description": "The ability to combine pieces of information to form general rules or conclusions (includes finding a relationship among seemingly unrelated events).",
     "name": "Inductive Reasoning"
}
```