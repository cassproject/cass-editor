# xAPI Adapter

The xAPI Adapter reads an LRS and creates competency assertions about learners. It creates an assertion when there is a scored event that has both actor mailbox and an authority mailbox that match public individuals in the CaSS system. No verbs are filtered by default, but again, the statements must be scored. Also required is an alignment from the xAPI object ID to the competency.

```json
{
    "@type": "CreativeWork",
    "educationalAlignment": [
        {
            "@context": "http://schema.org/",
            "@type": "AlignmentObject",
            "alignmentType": "teaches",
            "targetUrl": "https://army.mil/task/081-831-0033"
        }
    ],
    "@id": "https://dev.cassproject.org/api/data/schema.org.CreativeWork/ca22e231-0dc9-4368-85c7-4e37e96c710d/1525956177976",
    "@context": "http://schema.org/",
    "url": "http://www.medtrng.com/blackboard/field_medical_card.htm"
}
```

## xAPI Statement

The xAPI adapter requires the xapi statements have the following fields in order to create a competency assertion (where ```// OR``` represents that the two surrounding properties are mutually exclusive):
```json
{
    "actor": {
        "email": "<email of a Person within the CaSS system>",
        // OR
        "account": {
            "name": "<identifier of a Person within the CaSS system>"
        }
    },

    "authority": {
        "email": "<email of a Person within the CaSS system>",
        // OR
        "account": {
            "name": "<identifier of a Person within the CaSS system>"
        }
    },

    "id": <GUID>,

    "result": {
        "success": <true or false>,
        // OR
        "score": {
            "scaled": <number between 0-1>
        },
    },

    "object": {
        "id": <URI found in "url" of the above Alignment Object>
    }
}
```

## Configuration

There are two ways to configure the xAPI adapter:
* *Forward* statements to CaSS
* Tell CaSS to *poll* the xAPI endpoint for statements

### Forwarding-Based

Forward entire statements to

```<CaSS endpoint>/api/xapi/statement```
or
```<CaSS endpoint>/api/xapi/statements```

for example:

```https://dev.cassproject.org/api/xapi/statement```

Depending on the LRS, /statements may be appended to the endpoint you provide. Check individual LRS documentation and logs.

### Polling-Based

If you have only one endpoint to connect, you can just edit ```/etc/adapter.xapi.json```
```json
{
    "enabled": false,
    "xapiAuth": "Basic ...",
    "xapiEndpoint": "https://xapi.endpoint/xapi/",
    "xapiHostName": "https://xapi.endpoint/"
}
```

If you wish to connect to multiple endpoints, you can pass in environment variables with the necessary information:
```json
"XAPI_CONFIG_1": {
    "xapiAuth": "Basic ...",
    "xapiEndpoint": "https://xapi.endpoint/xapi/",
    "xapiHostName": "https://xapi.endpoint/"
},
"XAPI_CONFIG_2": {
    "xapiAuth": "Basic ...",
    "xapiEndpoint": "https://xapi.endpoint2/xapi/",
    "xapiHostName": "https://xapi.endpoint2/"
}
```

**Endpoints**
```hs
GET  /api/xapi/tick
    -- Process any unprocessed xAPI statements. Intended to be used with a cron job
```