# Credential Engine ASN

The CEASN Adapter converts CaSS Frameworks to and from [CTDL-ASN](https://credreg.net/ctdlasn/handbook).

**Endpoints**
```hs
GET  /api/ceasn/<framework id>
    -- Retrieve CTDL-ASN version of framework
POST /api/ceasn
    -- Convert CTDL-ASN framework to CaSS Framework
```