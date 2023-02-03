# JavaScript

Here, we'll demo some of the CaSS Javascript Library features. To do this easily, we'll use the Developer Console in your web browser.

## Browser

1. Navigate [here](https://sandbox.cassproject.org/cass.example/framework.html). Chrome is what this was built under, but any Javascript console should work. This sample page has the CaSS library loaded, meaning you'll be able to use it directly within the browser's console.
2. Open the Developer Tools (F12) and switch to the Console.
3. Clear the console using something resembling 🚫.
4. Type the following:
```js
await EcRepository.get(
    "https://sandbox.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Framework/ce4c0e41-f24c-407d-95af-047bfee429bf"
);
```

5. After a few seconds, an object should appear on the console with the framework data. Browse the data a bit before continuing.

Now let’s do something a bit more interesting, and Create, Update, Read, then Delete a new competency.

1. First, we need an identity to work under. Type the following:
```js
EcIdentityManager.default.ids
```

2. If the array has identities in it, you’re good to go (skip to step 5). If not, you need to log in.
```js
m = new EcRemoteIdentityManager();
m.server = repo.selectedServer; //Sets the identity server endpoint to the repository endpoint
m.configureFromServer(console.log,console.log); //This retrieves username and password salts from the server.
```

3. We can now begin the login process.
```js
m.startLogin("test","test"); //Creates the hashes for storage and retrieval of keys.
m.fetch(console.log,console.log); //This retrieves the identities and encryption keys from the server.
```

4. Now check again to make sure the identity is available for use.
```js
EcIdentityManager.default.ids
```

5. Now let’s instantiate a new competency.
```js
c = new EcCompetency();
```

6. Viewing the competency, we can see it has no owner, no id, nothing except for a type. This object is not ready to be saved. Let’s make it so.
```js
c.generateId(repo.selectedServer); //This generates a new ID that sets the object’s home to sandbox.
c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk()); //This adds us as the owner.
c;
```

7. An object isn’t useful without data, so let’s populate it with some useful data.
```js
c.name = "Creating Competencies by hand using CASS.";
c.description = "Subject can create competencies using CASS in the Javascript Console.";
```

8. Lets examine our object one more time and then save it.
```js
c;
c.save(console.log,console.log);
```

9. Now navigate to your new object’s URL (in a new tab!)
```js
window.open(c.shortId());
```

10. Finally, delete the object.
```js
c._delete(console.log,console.log);
```

11. Refreshing the tab, the object has been deleted. However, the object is versioned, so if you perform the following, it will continue to exist. Examine the difference between the IDs. Note that the version portion of the URL will update automatically upon save. (compare it to the ID in step 6)
```js
c.id; // Refers to the the immutable version of the object at that version.
c.shortId(); // Refers to the latest version of the object.
window.open(c.id);
```

12. Examine some of the other functions that exist and see how they operate.
```js
f = new EcFramework();
f.addCompetency(c.shortId());
f;
```

## JavaScript Library

If you'd like to use the JavaScript library, there are several ways of obtaining (or linking to) it:
* [GitHub](https://github.com/cassproject/CaSS/tree/master/src/main/js)
* A [CDN](https://cdn.jsdelivr.net/gh/cassproject/cass@master/src/main/js/cass.js)
* NPM: npm install [cassproject](https://www.npmjs.com/package/cassproject)

Check out the Links page for a compilation of all relevant links in one location.

If you’re just looking to retrieve competencies or frameworks, here are some examples:

```js
EcFramework.get("https://sandbox.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Framework/ce4c0e41-f24c-407d-95af-047bfee429bf",
  function(framework){
    alert(JSON.stringify(framework.name));
  },

  function(error){
    console.log(error);
  }
);

EcCompetency.get("https://sandbox.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Competency/onet:1.A.1",
  function(competency){
    alert(JSON.stringify(competency.name));
  },

  function(error){
    console.log(error);
  }
);
```

If you see the alert, you’re ready to go. Check out the other guides for more information.