# Create

*aka '**PUT**'*

To store an object in a CaSS Repository:
```json
{
    "@context": "http://schema.eduworks.com/cass/0.1",
    "@type": "http://schema.eduworks.com/cass/0.1/framework",
    "name": "SoarTech Test",
    "description": "I changed this value."
}
```

1. Sign the object
    * Create a copy of the object.
    * Remove ```@signature```, ```@owner```, ```@reader```, and ```@id``` keys (and values) from the object.
    ```json
    {
        "@context": "http://schema.eduworks.com/cass/0.1",
        "@type": "http://schema.eduworks.com/cass/0.1/framework",
        "name": "SoarTech Test",
        "description": "I changed this value."
    }
    ```
    * Serialize the copy of the object in JSON format with the keys sorted in ASCII order and with no whitespace.
    ```json
    [{"@context":"http://schema.eduworks.com/cass/0.1","@type":"http://schema.eduworks.com/cass/0.1/framework","description":"I changed this value.","name":"SoarTech Test"}]
    ```
    * Sign the serialized copy of the object using a SHA1 digest of the serialized data and RSA-2048 bit encryption with the user’s private key.
    ```
    6>/Ê€o")_Ì
    Öà±òj”´¼¬ùò<È(_êª«ÙTr³ßãÖxpbÚŽW        #’ü¡ Ö8uµÔ×_pÀ:èûŸÛu38n·I8ùwo‹>^#ü Y”ÍS7ÇÍ=˜—ýÛ˜ñù:¹qûÎEÍRªõ1qkÄ¹ù^Äö-àËG9Ç‰>ÿDr^“båØŠd3ç´ð¡›Ïžõ”7CÀ÷U3~+µ<ÏÃAÒ2Ï8Ø<k§¨—Äf)s™è~Ó¿œ•Ó1âU>³;¾XÁ‚‘
    ¼­ç®Úwxá2T_.ÌðoÇ°'vè)#‘w…ŠíVŒÅ¾€â uü±¡‚2ì
    (...or something like that)
    ```
    * Encode the signature using Base64.
    ```
    Nj4vGMqAbyIpX4HMC9bgsfJqlLS8rPnyPMgoX+qqEKvZVHKz3+PWeHBi2o5XCSOS/KEgEtYFOHW11BbXXwZwwDro+5/bdTM4brdJOPl3B2+LPl4jDhj8IFmUzVM3x809mJf925gM8fk6uXH7zkXNUqr1MXFrxBy5+V7E9i0B4MuQFhpHOceJPv8YRHJeHZNi5dgZimQz57TwoZvPnvWUgRA3Q8D3VTN+K7U8z8NB0hkyzzjYPGunqJfEZh0pc5noftO/nBOV0zHiVT6zO75YwYKRBwq8reeu2nd44TJUXy7MD/Bvx7AndugpI5F3hYrtVowGxb6A4iB1/LGhggEy7A==
    ```
    * Store the signature in the original object’s ```@signature``` array (create it if it does not exist).
    ```json
    {
        "@context": "http://schema.eduworks.com/cass/0.1",
        "@signature": ["Nj4vGMq...=="],
        "@type": "http://schema.eduworks.com/cass/0.1/framework",
        "description": "I changed this value.",
        "name": "SoarTech Test"
    }
    ```

2.  Add the owner to the object
    * Encode the owner’s public key (used to sign the object) in PEM format.
        * Specifically: X.509 SubjectPublicKeyInfo/OpenSSL PEM public key
        * This will begin with ```-----BEGIN PUBLIC KEY-----```
    * Remove whitespace from the PEM encoded public key.
    * Add the owner to the object’s ```@owner``` array.
        * Create the array if it does not exist.
    ```json
    {
        "@owner": ["-----BEGIN PUBLIC KEY-----MIIBI...-----END PUBLIC KEY-----"],
        "@context": "http://schema.eduworks.com/cass/0.1",
        "@signature": ["Nj4vGMq...=="],
        "@type": "http://schema.eduworks.com/cass/0.1/framework",
        "description": "I changed this value.",
        "name": "SoarTech Test"
    }
    ```

3. To store the object, construct a url to ```http(s)://<endpoint>/<type>/<id>/<version>```
    * **Endpoint:** Endpoint of the CaSS Repository
    * **Type:** Type of the object in semi-reversed notation
    * **Id:** Identifier of the object. Randomly generate it if it does not exist.
        * This identifier may differ from the value stored in the object’s ```@id``` field. This is used when registering data stored on another server.
        * For registering data retrieved from another server, a typical identifier for storage in CaSS is the MD5 hash of the ```@id``` field.
    * **Version:** Numerical indicator of the version, typically a last modified time in unix format.

4. Assign the object’s ```@id``` to the url.
    * Update any version indicators to the last modified date, if necessary.
    ```json
    {
        "@id": "http://sandbox.service.cassproject.org/data/schema.eduworks.com.cass.0.1.framework/007c67a2-c3a1-4b38-b222-a47e3c6cef39/1461770282857",
        "@owner": ["-----BEGIN PUBLIC KEY-----MIIBI...-----END PUBLIC KEY-----"],
        "@context": "http://schema.eduworks.com/cass/0.1",
        "@signature": ["Nj4vGMq...=="],
        "@type": "http://schema.eduworks.com/cass/0.1/framework",
        "description": "I changed this value.",
        "name": "SoarTech Test"
    }
    ```

5. Add the signed, owned object to the ```data``` part of a multi-part POST package.

6. Create a signature.
    * Create an empty JSON object.
    * Set ```@context``` to ```http://schema.eduworks.com/ebac/0.2/```
    * Set ```@type``` to ```http://schema.eduworks.com/ebac/0.2/timeLimitedSignature```
    * Set ```expiry``` to current unix time + time in milliseconds to allow the transaction to complete.
        * 5 seconds should suffice
    * Set ```server``` to ```http(s)://<endpoint>```
    * Set ```@signature``` to:
        * Serialize the copy of the object in JSON format with the keys sorted in ASCII order and with no whitespace.
        * Sign the serialized copy of the object using a SHA1 digest and RSA-2048 bit encryption with the user’s private key.
        * Encode the signature using Base64.
        * Store the signature in the original object’s ```@signature``` array.
            * Create the array if it does not exist.
    * Set ```@owner``` to the PEM of the user.
        * Specifically: X.509 SubjectPublicKeyInfo/OpenSSL PEM public key

7. Add the signature to an array, and set the “signatureSheet” part of the multi-part POST package to the array.
```json
[
    {
        "@owner" : "-----BEGIN PUBLIC KEY-----MIIBI...QAB-----END PUBLIC KEY-----",
        "@context" : "http://schema.eduworks.com/ebac/0.1/",
        "@signature" : "eQOJt9...==",
        "@type" : "http://schema.eduworks.com/ebac/0.1/timeLimitedSignature",
        "expiry" : 1463525567195,
        "server" : "http://sandbox.service.cassproject.org"
    }
]
```

8. POST the signatureSheet and data multi part mime files to the location in ```@id```.
```http
POST /data/schema.eduworks.com.cass.0.1.framework/a930b85b-7850-403e-9e05-2b23494236c4/1463528404979 HTTP/1.1
Host: sandbox.service.cassproject.org
Connection: keep-alive
Content-Length: 2485
Accept: */*
Origin: https://sandbox.cassproject.org
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryHPC2mTo2nsUWwL7V
Referer: https://sandbox.cassproject.org/cass.example/framework.html
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.8

------WebKitFormBoundaryHPC2mTo2nsUWwL7V
Content-Disposition: form-data; name="data"

{"@id":"http://sandbox.service.cassproject.org/data/schema.eduworks.com.cass.0.1.framework/a930b85b-7850-403e-9e05-2b23494236c4/1463528404979","@owner":["-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhFIqjxOuV2UsVqqmknsjdSX5UOdjsCMHjXCRQ/CN+6W3p403AjewJiwacNyyosSWzzDc0w60GMMMY6ubSm0/hITlEgFmiA2g/26nCrHuSSMzoRIiql3apGnzxJsPkbHnn/uKXKlsWONMM4GYijQRNeXrFv+xNsl/Qzxdo4ND3FeTKXdWEu8JJXfKRXDo34RJYt/aSIUby0HYFVp/gUxXSBfYXU4rFLlSd4YwBfqNSiyEjCQUuXqko8FndAUbciMOxY+ko9IVM8R+k4gRlBhh5TR2a8B6o8ir38CGBvBkQZ635Nw/Ds+L6g5NbvUJofRC9gvfN5PD9Gr7GrQX//60eQIDAQAB-----END PUBLIC KEY-----"],"@context":"http://schema.eduworks.com/cass/0.1","@signature":["Uf/gevysprqTSsKUu5Oy/g+Ua6cSpkuZ3GDnUvq2PKBa4ucOR06XTq9GPBG21Q6AiNtqFPk+l635OpwkH3MlSR6jFJxGn+UYgC4XoKHSxkBaPX7Bzk1bVgE5EerI8MsVSfp6NmDkKKesoBcdnZa+JrZllfknZte4z2Zuu7OrEUZwI9L7b7mXfZJ62Isp4YIQI/cbhRnGHqN6noCZHXkdXwD3L1bNU7knLm6bM2+FOTVV9AO2y0IEAR3RKnWtF0tODBRbmkjGih2Ec68C1ZplIg2GmSz6iWZDqfk3/ZEvcGRkgEP7GhFk7wUw7oEuIOOecdWZI0uF/y04kN9435fSJg=="],"@type":"http://schema.eduworks.com/cass/0.1/framework","description":"This is an example of POSTing a new object.","name":"New Framework"}
------WebKitFormBoundaryHPC2mTo2nsUWwL7V
Content-Disposition: form-data; name="signatureSheet"

[{"@owner":"-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhFIqjxOuV2UsVqqmknsjdSX5UOdjsCMHjXCRQ/CN+6W3p403AjewJiwacNyyosSWzzDc0w60GMMMY6ubSm0/hITlEgFmiA2g/26nCrHuSSMzoRIiql3apGnzxJsPkbHnn/uKXKlsWONMM4GYijQRNeXrFv+xNsl/Qzxdo4ND3FeTKXdWEu8JJXfKRXDo34RJYt/aSIUby0HYFVp/gUxXSBfYXU4rFLlSd4YwBfqNSiyEjCQUuXqko8FndAUbciMOxY+ko9IVM8R+k4gRlBhh5TR2a8B6o8ir38CGBvBkQZ635Nw/Ds+L6g5NbvUJofRC9gvfN5PD9Gr7GrQX//60eQIDAQAB-----END PUBLIC KEY-----","@context":"http://schema.eduworks.com/ebac/0.1/","@signature":"OPdnoFJNpAdJ2tovbA57WSXlL7/jwXFBywkwaNW8fZa+cgGMC2f7GuBVYExbWyd2HIBEYDQT8vj1EevdhE3axA6gFamzei27kjfiVoJt83t17V0tihLP8zk4ajHS04Y8lf2/tn5KHnwuJOGdcXrMdyT0CRpEHkF7raiA0aQbNPK9XG5hwphIlyszFlnpGX1UEYhDJ3+4qAk/F1gTJGaAm4oqh1wpz/cYq7WcSA921u4u76squrENa3u0+f7u0P0hD1bwN+/kGeAe/vZdSn41nziVp9kwv1g2tZDTdbIlKjX6OqHl/+tHBUeEJRL+N1/tRgUfyoKF2LMqTl+TkQSvUw==","@type":"http://schema.eduworks.com/ebac/0.1/timeLimitedSignature","expiry":1463528464980,"server":"http://sandbox.service.cassproject.org/data/schema.eduworks.com.cass.0.1.framework/a930b85b-7850-403e-9e05-2b23494236c4/1463528404979"}]
------WebKitFormBoundaryHPC2mTo2nsUWwL7V--

HTTP/1.1 200 OK
Date: Tue, 17 May 2016 23:40:16 GMT
Server: Apache-Coyote/1.1
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS
Access-Control-Allow-Headers: If-Modified-Since, Content-Type, Content-Range, Content-Disposition, Content-Description, signatureSheet
cache-control: private, no-cache, no-store
Content-Type: application/json
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked

{
    "@id": "http://sandbox.service.cassproject.org/data/schema.eduworks.com.cass.0.1.framework/a930b85b-7850-403e-9e05-2b23494236c4/1463528404979",
    "@owner": ["-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhFIqjxOuV2UsVqqmknsjdSX5UOdjsCMHjXCRQ/CN+6W3p403AjewJiwacNyyosSWzzDc0w60GMMMY6ubSm0/hITlEgFmiA2g/26nCrHuSSMzoRIiql3apGnzxJsPkbHnn/uKXKlsWONMM4GYijQRNeXrFv+xNsl/Qzxdo4ND3FeTKXdWEu8JJXfKRXDo34RJYt/aSIUby0HYFVp/gUxXSBfYXU4rFLlSd4YwBfqNSiyEjCQUuXqko8FndAUbciMOxY+ko9IVM8R+k4gRlBhh5TR2a8B6o8ir38CGBvBkQZ635Nw/Ds+L6g5NbvUJofRC9gvfN5PD9Gr7GrQX//60eQIDAQAB-----END PUBLIC KEY-----"],
    "@context": "http://schema.eduworks.com/cass/0.1",
    "@signature": ["Uf/gevysprqTSsKUu5Oy/g+Ua6cSpkuZ3GDnUvq2PKBa4ucOR06XTq9GPBG21Q6AiNtqFPk+l635OpwkH3MlSR6jFJxGn+UYgC4XoKHSxkBaPX7Bzk1bVgE5EerI8MsVSfp6NmDkKKesoBcdnZa+JrZllfknZte4z2Zuu7OrEUZwI9L7b7mXfZJ62Isp4YIQI/cbhRnGHqN6noCZHXkdXwD3L1bNU7knLm6bM2+FOTVV9AO2y0IEAR3RKnWtF0tODBRbmkjGih2Ec68C1ZplIg2GmSz6iWZDqfk3/ZEvcGRkgEP7GhFk7wUw7oEuIOOecdWZI0uF/y04kN9435fSJg=="],
    "@type": "http://schema.eduworks.com/cass/0.1/framework",
    "description": "This is an example of POSTing a new object.",
    "name": "New Framework"
}
```