# C#

:::danger
Currently, there is no formal CASS library for C#. If you would like to contribute or begin developing one, see the [contributor section](/dev/contributing/) of this guide.
:::

## JavaScript Interpreter

Several JavaScript interpreters have been written for C#, however, it is unclear whether appropriate bindings exist. In theory, the CASS Libraries are compatible with any JavaScript environment, given access to functions like JQuery’s ```$.ajax``` call.

This type of integration is desirable for continued expansion of supported languages for CASS.

**If this is something you would like to pursue, please get in touch with the lead developer: fritz.ray@eduworks.com**

## Consuming Data

If you are only intending to consume CASS data, the path is much simpler.

1. Create a helper method and fetch resources
```csharp
public async Task<JsonObject> httpGetJsonObject(String url) {
    System.Net.Http.HttpClient hc = new System.Net.Http.HttpClient();
    String s = await hc.GetStringAsync(url);
    JsonObject root = Windows.Data.Json.JsonValue.Parse(s).GetObject();
    return root;
}
```

2. Retrieve frameworks and competencies
```csharp
JsonObject obj = await c.httpGetJsonObject("https://sandbox.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Framework/ce4c0e41-f24c-407d-95af-047bfee429bf");
String foo = obj.GetNamedString("name");
JsonObject obj2 = await c.httpGetJsonObject(obj.GetNamedArray("competency")[0].GetString());
foo += "\n" + obj2.GetNamedString("name");
```

1. If you need to generate an RSA public/private keypair in C#, use NuGet to download a package called BouncyCastle
```csharp
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;

// ...

RsaKeyPairGenerator r = new RsaKeyPairGenerator();
r.Init(new KeyGenerationParameters(new SecureRandom(), 2048));
AsymmetricCipherKeyPair keys = r.GenerateKeyPair();
TextWriter textWriter = new StringWriter();
PemWriter pemWriter = new PemWriter(textWriter);
pemWriter.WriteObject(keys.Private);
pemWriter.Writer.Flush();

string privateKey = textWriter.ToString();
```