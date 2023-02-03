# Search

## Basics

CASS uses [ElasticSearch Simple Query String](https://logz.io/blog/elasticsearch-queries/) with several optional parameters as its search mechanism.

The best way to experience this is via a web browser. Optionally, an HTTP request tool like PostMan or curl would also be sufficient.

The search endpoint is typically at the following URL:

```http(s?)://<your server endpoint>/api/data```

e.g.

```https://dev.cassproject.org/api/data```

The search allows two forms of querying and providing data: a URL query string and via an HTTP POST request.
1. The query string basic form is show below (the search is ‘*’, or everything):
    ```https://dev.cassproject.org/api/data?q=*```
    * Optional parameters include:
        * Size, the size of the response.
            ```https://dev.cassproject.org/api/data?size=100&q=*```
        * Start, used for paging.
            ```https://dev.cassproject.org/api/data?start=50&q=*```
    * *Note: This may be used as part of a GET or POST when including a signature sheet.*

2. The POST method requires a multi part post containing a JSON Object named ‘searchParams’. This can be useful to avoid issues with URL query string encoding.
    * General format:
        ```http
        https://dev.cassproject.org/api/data
        {
            "key": val,
            ...
        }
        ```
    * The query appears in the ‘q’ field of the ‘searchParams’ object.
        ```json
        {
            "q": "*"
        }
        ```
    * Optional parameters include:
        * Size, the size of the response.
        ```json
        {
            "q": "*",
            "size": 100
        }
        ```
    * Start, used for paging.
        ```json
        {
            "q": "*",
            "start": 50
        }
        ```

## Common Queries

There are a number of common queries that are useful in the practice of using CASS.

### Search everything

This query searches all fields for any distinct word ‘tool’. Note that plural forms will also be returned.

```https://dev.cassproject.org/api/data?q=tool```

### Search by a field.

This query searches for a string inside a field.

```https://dev.cassproject.org/api/data?q=name:tool```

### Search by a partial field.

This query searches for a string inside a field.

```https://dev.cassproject.org/api/data?q=name:"Workplace Readiness Skills"```

### Search for records of a certain type.

This query searches for competencies.

```https://dev.cassproject.org/api/data?q=@type:Competency```

or

```https://dev.cassproject.org/api/data/schema.cassproject.org.0.2.Competency?q=*```

### Search for records by owner identifier.

This query searches for records owned by a particular individual.

```
https://dev.cassproject.org/api/data?q=@owner:"-----BEGIN%20PUBLIC%20KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl5Zsr3KlThU%2BOGbkT%2BLd24j0u2AUMnh7YU7%2B%2FPiKzJaR%2Fzv06RFALl%2Bm2kmNXFgnsIZQeE4OvHWXptJsghIlrL36NbQwrpknXglqQ9dPHIKrdlvnSvvPvWSBcs%2BO2eKJg4A2wSjx5Ls6lJRijRLlIwRC%2FSD8tx%2FUeaakQ5b%2FkyyaDsL3ScyT5yUzICBR0xIp%2B0HRLVkxG9t2BW1%2FGnw78SYUZKZT2a0c01d5rzvXDH9VFfYDANG6oep%2FAmDOhVLI3qG8MYVKnyVKK2%2F3VIl%2BEOIYPxbGasJWp7vredxtCEQfbzQI8D9DfbizYxSRuxmcU%2B%2BmLhGWdyD7YgrOSQvFkwIDAQAB-----END%20PUBLIC%20KEY-----"
```

Note: This type of query becomes more difficult to perform as URL encoding and particular use of quotes becomes more important. Particularly advanced queries almost necessitate the use of the POST form.

### Combining Search Criteria

This query searches for frameworks with “Skills” in the name.

```https://dev.cassproject.org/api/data?q=@type:Framework AND name:Skills```

Also allowed are **Parentheses** and the **OR** keyword.