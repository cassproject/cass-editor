# Moodle

The Moodle Adapter reads and writes competency frameworks to Moodle from CaSS.

**Configuration**
```json
{
    "enabled": false,
    "moodleToken": "token of api permissioned user",
    "moodleEndpoint": "https://moodle.endpoint/api/"
}
```

**Endpoints**
```hs
GET  /api/moodle/cassToMoodle
    -- Copy frameworks from CaSS to Moodle
GET  /api/moodle/moodleToCass
    -- Copy frameworks from Moodle to CaSS
```