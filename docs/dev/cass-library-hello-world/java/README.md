# Java

:::danger
Currently, there are no Java libraries that deploy the CaSS APIs in Java directly. If you would like to contribute or begin developing one, see the [contributor section](/dev/contributing/) of this guide.
:::

To use the CaSS Javascript Libraries, **Nashorn** (a javascript environment) can be employed. The following configuration requires use of Java 8 and CaSS Library version 4 or under.

## Gradle Configuration

```java
ext {
   ewVersion = '5.16.2'
   ecVersion = '2.11.6'
}

dependencies {
   compile "com.eduworks:ew.levr.base:${ewVersion}"
   compile "com.eduworks:ew.levr.net:${ewVersion}"
   compile "com.eduworks:ew.levr.security:${ewVersion}"
   compile "com.eduworks:ew.levr.rdf:${ewVersion}"
   compile "com.eduworks:forge:${ecVersion}"
   compile "com.eduworks:cass.competency:${ecVersion}"
   compile "com.eduworks:ebac.identity:${ecVersion}"
   compile "com.eduworks:cass.adapter:${ecVersion}"
   compile "com.eduworks:cass.rollup:${ecVersion}"
   compile "javax.servlet:javax.servlet-api:3.1.0"
}
```

## Java Adapter

```java
import com.eduworks.lang.EwList;
import com.eduworks.lang.EwMap;
import com.eduworks.levr.servlet.impl.LevrResolverServlet;
import com.eduworks.resolver.Context;
import com.eduworks.resolver.CruncherJavascriptBinder;
import com.eduworks.resolver.Resolvable;
import com.eduworks.util.io.EwFileSystem;

import org.json.JSONException;
import org.json.JSONArray;

import java.io.IOException;
import java.util.HashMap;

public class CassAdapter {
    static {
        try {
            LevrResolverServlet.resolvableWebServices = new EwMap<String, Resolvable>();
            LevrResolverServlet.resolvableFunctions = new EwMap<String, Resolvable>();
            LevrResolverServlet.codeFiles = new EwList<>();

            // Please note, you may need to incorporate the namespace path into the filename
            // E.g. src/main/my/namespace/cassLibrary.js
            LevrResolverServlet.loadAdditionalConfigFiles(
                EwFileSystem.findFile("cassLibrary.js", CassAdapter.class, false, false)
            );
            LevrResolverServlet.loadAdditionalConfigFiles(
                EwFileSystem.findFile("doSomething.js", CassAdapter.class, false, false)
            );
        } catch (JSONException ex) {
            ex.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Object callJs(String function) {
        Context c = new Context();

        CruncherJavascriptBinder cjb = new CruncherJavascriptBinder();
        cjb.build("function", function);
        try {
            return cjb.resolve(c, new HashMap<>(), new HashMap<>());
        } catch (JSONException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public JSONArray fetchFrameworks() {
        return (JSONArray) callJs("fetchFrameworks");
    }

    public static void main(String args[]) {
        try {
            System.out.println(new CassAdapter().fetchFrameworks().toString(2));
        } catch (JSONException ex) {}
    }
}
```

## Loading the CaSS Libraries (cassLibrary.js)

```js
var $ = null;
var document = null;
var window = {};
var localStorage = {};

var setTimeout = function (f, time) {
    if (f != null) f();
}

load("classpath:stjs.js");
load("classpath:blobHelper.js");
load("classpath:formdata.js");
load("classpath:random.js");
load("classpath:ec.base.js");
load("classpath:forge/forge.min.js");
load("classpath:ec.crypto.js");
load("classpath:org.json-ld.js");
load("classpath:org.cassproject.schema.general.js");
load("classpath:org.schema.js");
load("classpath:org.w3.skos.js");
load("classpath:org.cassproject.schema.ebac.js");
load("classpath:org.cassproject.schema.cass.js");
load("classpath:ebac.identity.js");
load("classpath:ebac.repository.js");
load("classpath:cass.competency.js");
load("classpath:cass.rollup.js");

EcRepository.caching = true;
EcRemote.async = false;
EcIdentityManager.async = false;

console = {
    log: function (s) {
        print(s);
    },

    error: function (s) {
        print("error:" + s);
    }
};

var repo = new EcRepository();
repo.selectedServer = "https://dev.cassproject.org/api/";
```

## Sample Javascript Code (doSomething.js)

```js
function fetchFrameworks(){
    var output = null;
    EcFramework.search(
        repo,
        "*",
        function(frameworks) {
            output = frameworks;
        },
        console.error,
        {size:50}
    );
    return output;
}
```

Now, complete use of the CaSS JS Library should be possible.

If you are only intending to consume CaSS data, the path is much simpler.

You will need a library for working with JSON and one for working with HTTP. In this example, we are using **Apache Commons**.



1. In this example, we’ll be using the following dependencies (articulated in Maven)
```xml
<!-- https://mvnrepository.com/artifact/org.json/json -->
<dependency>
    <groupId>org.json</groupId>
    <artifactId>json</artifactId>
    <version>20160810</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.apache.httpcomponents/httpclient -->
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
    <version>4.5.2</version>
</dependency>
```

2. The following code sample downloads and prints a framework
```java
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.charset.Charset;

public class App {
    public static void main(String[] args) throws IOException {
        CloseableHttpClient httpclient = HttpClients.createDefault();

        try {
            HttpGet httpget = new HttpGet(
                "https://sandbox.CaSSproject.org/api/custom/data/schema.CaSSproject.org.0.2.Framework/ce4c0e41-f24c-407d-95af-047bfee429bf"
            );
            System.out.println("Executing request " + httpget.getRequestLine());

            // Create a custom response handler
            ResponseHandler<JSONObject> responseHandler = new ResponseHandler<JSONObject>() {
                public JSONObject handleResponse(final HttpResponse response) throws ClientProtocolException, IOException {
                    int status = response.getStatusLine().getStatusCode();
                    if (status >= 200 && status < 300) {
                        HttpEntity entity = response.getEntity();
                        JSONObject jsonObject = new JSONObject(
                            IOUtils.toString(entity.getContent(), Charset.forName("UTF-8"))
                        );
                        return jsonObject;
                    } else {
                        throw new ClientProtocolException("Unexpected response status: " + status);
                    }
                }
            };

            JSONObject response = httpclient.execute(httpget, responseHandler);
            System.out.println("----------------------------------------");
            System.out.println(response.toString(2));
        } finally {
            httpclient.close();
        }
    }
}
```

3. If you are implementing the Repository API, it may of benefit to view some compatible encryption examples. The following classes have been tested and are compatible with the Javascript Library:
   * AES Encryption
   * AES Decryption
   * RSA Key Generation
   * RSA Private Key to Public Key
   * PBKDF2 Hashing
   * RSA Encryption
   * RSA Decryption
   * RSA Sign
   * RSA Verify