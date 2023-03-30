# Identities and Login

CASS is built upon [Open Data](http://opendefinition.org/od/2.1/en/) principles combined with a security and permissioning system built on Public Key Infrastructure.

Actors in the CASS ecosystem can be users, other systems, or applications acting on a user’s behalf. All of these actors use the same tool to identify themselves: A RSA public/private keypair.

## Identities and Identifiers

A PKCS#1 Private Key encoded in the same fashion as a PEM file.

```
-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEApcFdsnc3RfyHTcOyiLE6jOmqwa1ifr8ZstvO1X4pSfgWNMiLfGMozGRq5gzlRrCnUP5a4z/qQLZhMnMzFgjpak7PvOpmavRaoW8sJqYlANTCNQlaKXODdWPCs0Zj0DNRwW592BJ2m6iHWWoTUhted3+qlgqszH3JmeTxHwrRoNoThSSk+mKadTQ7K5SfmnXjzR/1PnEXN126x+QlZI2PChcYTOG8/wsgjaHNoBlW7cZDKHLfdZUK8Mvat4fSHygapIUpbX/bP32ninwnaa59UIQW7TI6Zf6cHLJv/JKGVoFG8pqg+8lN6YtcAjYJBp4qQii70tDiu/Yhm4592NUczQIDAQABAoIBAQCjiOK7mBlFiH+pvqFfcZP1wPiCu2DI8hwVtf4b7qwn2Yd3LkFISMDQ32YEcMaodtOs+jaLrNyeWhINZ1EItWQtSXJ1zcGcVlcwnPGvdA5gAolVMFPvP5N8dx96JsGFgYxwzmWEj7rLmntnQVusj2oldiTEgeW4n4YOuq0WVmM6UTdsmIqZgSmLgiQlrXEizfa7kjsAqVx5AuosoEDTj6IqMMZ/qVV7FPCAr0AYEIAoCF5aqXq9EcHGYDzIVS1W21jok+Mr5wDH7Fq2qAxwSNp0p+qDjvEYMWtvc7bmqaJEgY9+mFK+1++HXozfZmZd6xXbprFdVNBd/Q26pDQnc77BAoGBANTuss99B0N/2FNt1c/fuPcZwyDk0UJFCoeuyPmGREYhW1hym74/QZe1UIKgegO4kIjvjBQVe7BtR30jwi/YYuooQN3FF/hszyPLBJVgXpux4ZsAnOn9h5BV1BvGbQXALUWUe16RkGbYlFdDwk3Adv1IZ7oqdPAtgS/Pp/Jvnh3xAoGBAMdH6dZmbgj0dyhymMegvMCSp9GskJqlOa+Bw0ZNBjBTsj2WlEG2x0BwpmXFBPgy5kmxXqiaba6PTr66A68s7Pb7WNlR623Gx5sRWE3UUQnX7F7fllZCYAtZiJ8+0a1+BenXXs/KYKDI5AdyxC0XwMReqSPhk8kly/s/lexs6MCdAoGAP0Ft8z+0QbQgAqDVbLyMiTOpCQOQurwh5a7h22asr5zHMx5Q8BKAnN3rPfMIbESPA28OUQUUypOcMivGS0pgECnHI1qixVUlr/9mrC2FzYDpgY+MDeMYO6OTsHChAJ1XlZ0HjU9282aRot7pQQnVD2dMETz9okASaa6puNa5xTECgYEAwKC12wX19PgBunpTThwEeA0K5PVubd2qTgkbrffENLCiiT/lnUPFhHefkJ4KOLRSwAcQXd+wh9yEnH4IE6tUf0TkVGUIMnvD9BOnDMxfbSlnlSmBE25jknUASBYb7hz0MF57ilWwY5rsOHrqQEBGmEp8Km/hP70mWH3VOMzpi00CgYAdCs3i6JGIjST3CTKNF7PievnLz6ni9I1h0G2h6PRcKDJQRegrOCp1ZOhnSuCklw1LBZuZOF3Hninmc0kAOkoNkmaOuXShwD33trDY58e09KJgoHD9zxYUjMJfS7IkRYd9vJ/rvKE35c8Q6NuwzJ25avO3+6p+7hMKYEWf+XCodg==-----END RSA PRIVATE KEY-----
```

The corresponding PKCS#8 Public Key.

```
-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApcFdsnc3RfyHTcOyiLE6jOmqwa1ifr8ZstvO1X4pSfgWNMiLfGMozGRq5gzlRrCnUP5a4z/qQLZhMnMzFgjpak7PvOpmavRaoW8sJqYlANTCNQlaKXODdWPCs0Zj0DNRwW592BJ2m6iHWWoTUhted3+qlgqszH3JmeTxHwrRoNoThSSk+mKadTQ7K5SfmnXjzR/1PnEXN126x+QlZI2PChcYTOG8/wsgjaHNoBlW7cZDKHLfdZUK8Mvat4fSHygapIUpbX/bP32ninwnaa59UIQW7TI6Zf6cHLJv/JKGVoFG8pqg+8lN6YtcAjYJBp4qQii70tDiu/Yhm4592NUczQIDAQAB-----END PUBLIC KEY-----
```

Encodings of Private Keys include the Public Key and we denote by “**PPK**” (Public/Private Keypair). “**PK**” is used to denote just the Public Key. CASS refers to the PPK as an ‘*identity*’ and its PK portion is an ‘*identifier*’.

## Owners, Readers, Actions and Signature Sheets

All permissioned objects in CASS have an ```@owner``` field that contains the identifier of the identity that owns it. All compliant CASS repositories will validate the ```@owner``` field against a “Signature Sheet” before allowing a privileged action to occur.

A **Signature Sheet** is a token that a client sends to the repository to authorize the repository to perform a privileged action. It includes:
* An identifier
* A timestamp
* An expiration timestamp
* A cryptographic signature, that can be verified using a PK.

The authentication of the signature against the PK states that the person who sent it has the corresponding PPK. This authorizes the repository to act on that actor’s behalf.

Privileged actions are:
* (**@owner** or **@reader**) Returning data that is encrypted
    * *Note: the repository is not able to decrypt the data.*
* (**@owner** only) Updating data that is owned.
* (**@owner** or server admin) Deleting data
* (varies) Any custom API operation that includes any of these actions
* (coming soon, **@controller**) Changing the readers allowed to read data

Non-privileged actions are:
* Reading data
    * The repository will trim any encrypted data from the result
* Creating data
    * You can create data with @owners, and those owners can be identifiers that you do not have the identities for

## Individuals, Systems, and their relation to Identities

In most systems, an actor will have some credentials that tie in with an account that allow them to operate an application or use services. The desired outcome is that a user account on a system is strongly tied to an individual.

![Visual](~@img/identities-and-login-1.png)

This is also possible with PKI.

![Visual](~@img/identities-and-login-2.png)

However, individuals often act in different capacities throughout the day, and there is value in separating these identities. As an example, an individual may have been a student in more than one school, may have been employed in multiple locations, and may act in different capacities in an organization. Each one of those should be, for the sake of privacy, security, and compartmentalization, different identities.

![Visual](~@img/identities-and-login-3.png)

Additionally, there is often little value in disclosing user’s personal information as a user of the system. Similar to OAuth2, all real-world identifying information is, by default, not associated with an identity. This level of anonymity is intended to satisfy privacy law while allowing CASS Repositories to be publically federated.

As a result, individuals, systems, groups and other actors can operate and query across server boundaries with far fewer privacy concerns, but still retain strong security and permissioning practices.

## Login Requirements

> No-Knowledge (adj): Having the attribute of being able to store information without the ability to access that information. Often associated with cryptographically secure storage.

CASS comes with a no-knowledge keystore (called the **Remote Identity Manager**) that allows users to operate CASS with a username and password. It is typically not reasonable to require individuals to manage their own encryption keys. It does not have login recovery capabilities, and is generally not recommended.

CASS is compatible with any login or SSO system that can store or provide a place to hold a PPK. The individual’s keys  should be retrievable in case they wish to use other tools to operate on or view their data.

## Examples

### Login

1. Configure a remote identity manager.
    ```js
    var m = new EcRemoteIdentityManager();
    m.server = "https://dev.cassproject.org/api/"; //Sets the identity server endpoint
    m.configureFromServer(console.log, console.error); //Retrieves username and password salts from the server.
    ```

:::tip NOTE
*console.log* and *console.error* are the success and failure methods. If you are doing this in an async environment, such as a web browser, you will need to change console.log into a callback that does the below steps.
:::

2. Begin the login process.
    ```js
    m.startLogin("testUsername","testPassword"); //Creates the hashes for storage and retrieval of keys.
    m.fetch(console.log, console.error); //This retrieves the identities and encryption keys from the server.
    ```

3. Verify the identities and contacts are available.
    ```js
    EcIdentityManager.default.ids //Should show one EcIdentity in an array
    EcIdentityManager.default.contacts; //Probably will show no contacts.
    ```

### User Creation

1. Configure a remote identity manager.
    ```js
    m = new EcRemoteIdentityManager();
    m.server = "https://dev.cassproject.org/api/"; // Sets the identity server endpoint
    m.configureFromServer(console.log, console.error); // Retrieves username and password salts from the server.
    ```

:::tip NOTE
*console.log* and *console.error* are the success and failure methods. If you are doing this in an async environment, such as a web browser, you will need to change console.log into a callback that does the below steps.
:::

2. Ask the server to create the user, fetch the token for the account it created, generate a key, then commit the key back to the server.
    ```js
    m.clear();
    m.startLogin("testUsername2","testPassword2"); // Creates the hashes for storage and retrieval of keys.
    m.create( // Asks the server to create this account.
        function () {
            m.fetch( // Fetch the account (we need a token in there to commit)
                function () {
                    EcPpk.generateKeyAsync( // Generate a PPK
                        function (ppk) {
                            var identity = new EcIdentity(); // Create a new identity
                            identity.displayName = "Frank"; // Give the identity a local display name
                            identity.ppk = ppk; // Assign the ppk to the identity
                            EcIdentityManager.addIdentity(identity); // Add the identity to our list of identities
                            m.commit( // Save our information back to the server
                                function () {
                                    console.log("We did it."); // Declare victory
                                },
                                console.error
                            );
                        }
                    );
                },
                console.error
            )
        }
    );
    ```

3. Verify the identities and contacts are available for use.
    ```js
    EcIdentityManager.default.ids // Should show one EcIdentity in an array
    EcIdentityManager.default.contacts; // Probably will show no contacts
    ```

### EcIdentity

1. Identities are stored in the EcIdentityManager as EcIdentity objects.
    ```js
    EcIdentityManager.default.ids;
    ```

2. Identities have the following fields:
    * **displayName** - The name given to an identity. This is not authoritative.
        ```js
        EcIdentityManager.default.ids[0].displayName;
        ```
    * **ppk** - The EcPpk public/private keypair in object form.
        ```js
        EcIdentityManager.default.ids[0].ppk
        ```
    * **source** - The server endpoint that the identity is primarily associated with.
        ```js
        EcIdentityManager.default.ids[0].source
        ```

3. Identities have the following functions:
    * Convert the identity to an EcContact
        ```js
        EcIdentityManager.default.ids[0].toContact()
        ```
    * Convert the identity to or from a JSON serializable object
        ```js
        EcIdentityManager.default.ids[0].toCredential()
        EcIdentityManager.default.ids[0].fromCredential(credential)
        ```

### EcPpk

An EcPpk is a public/private keypair helper object that wraps an actor identity in CASS. The object can transform and serialize the key contained within.

1. EcPpks can serialize to:
    * **PEM String** (PKCS#1 by default)
        ```js
        EcIdentityManager.default.ids[0].ppk.toPem();
        ```
    * **PKCS#1 PEM**
        ```js
        EcIdentityManager.default.ids[0].ppk.toPkcs1Pem();
        ```
    * **PKCS#8 PEM**
        ```js
        EcIdentityManager.default.ids[0].ppk.toPkcs8Pem();
        ```

2. EcPpks can also extract the public key portion as a EcPk object.
    ```js
    EcIdentityManager.default.ids[0].ppk.toPk();
    ```

3. EcPpks are used in some cryptographic operations. See the following classes for details.
   * **EcRsaOaep**
   * **EcRsaOaepAsync**

4. EcPpks are also commonly used in cryptographic methods in securing objects. See Securing Objects for more details.

#### EcPk

An EcPk is a public key helper object that represents an actor identifier in CASS. The object can transform and serialize the key contained within.

1. EcPks can serialize to:
    * **PEM String** (PKCS#8 by default)
        ```js
        EcIdentityManager.default.ids[0].ppk.toPk().toPem();
        ```
    * **PKCS#1 PEM**
        ```js
        EcIdentityManager.default.ids[0].ppk.toPk().toPkcs1Pem();
        ```
    * **PKCS#8 PEM**
        ```js
        EcIdentityManager.default.ids[0].ppk.toPk().toPkcs8Pem();
        ```
2. EcPks are used in some cryptographic operations. See the following classes for details
   * **EcRsaOaep**
   * **EcRsaOaepAsync**
3. EcPks are also commonly used in cryptographic methods in securing objects.
<!-- "See 'Securing Objects' for more details" was here, but page was never implemented -->
