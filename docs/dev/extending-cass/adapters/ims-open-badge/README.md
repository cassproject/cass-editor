# IMS Open Badge 2.0

The IMS Open Badge Adapter converts assertions that have been shared with the adapter into IMS Open Badge assertions.

**Endpoints**
```hs
GET  /api/badge/assertion/<assertion id>
    -- Generate Open Badge Assertion for a competency assertion
GET  /api/badge/class/<competency id>
    -- Generate Open Badge Class for a competency
GET  /api/badge/profile/<public key fingerprint>
    -- Generate Open Badge Profile for an identifier and Person object
GET  /api/badge/cryptographicKey/<public key fingerprint>
    -- Generate Open Badge Cryptographic Key for an identifier and Person object
GET  /api/badge/pk
    -- Get public key of the Open Badge Adapter
```