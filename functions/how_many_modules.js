process.env.GCLOUD_PROJECT = "project";

const functions = require('firebase-functions');

let data = {
  "oldValue": {
    "createTime": "2021-05-17T18:45:45.316415Z",
    "fields": {
      "array_field": {
        "arrayValue": {
          "values": [
            {
              "stringValue": "string_element2"
            }
          ]
        }
      },
      "boolean_field": {
        "booleanValue": true
      },
      "geopoint_field": {
        "geoPointValue": {
          "latitude": 42,
          "longitude": 64
        }
      },
      "map_field": {
        "mapValue": {
          "fields": {
            "string_key": {
              "stringValue": "string_value"
            }
          }
        }
      },
      "null_field": {
        "nullValue": null
      },
      "number_field": {
        "integerValue": "42"
      },
      "reference": {
        "referenceValue": "projects/inlined-junkdrawer/databases/(default)/documents/users/userId"
      },
      "string_field": {
        "stringValue": "string_value"
      },
      "timestamp": {
        "timestampValue": "2021-05-17T08:02:00Z"
      }
    },
    "name": "projects/inlined-junkdrawer/databases/(default)/documents/collection/documentID",
    "updateTime": "2021-05-17T18:49:46.247615Z"
  },
  "updateMask": {
    "fieldPaths": [
      "boolean_field"
    ]
  },
  "value": {
    "createTime": "2021-05-17T18:45:45.316415Z",
    "fields": {
      "array_field": {
        "arrayValue": {
          "values": [
            {
              "stringValue": "string_element2"
            }
          ]
        }
      },
      "boolean_field": {
        "booleanValue": false
      },
      "geopoint_field": {
        "geoPointValue": {
          "latitude": 42,
          "longitude": 64
        }
      },
      "map_field": {
        "mapValue": {
          "fields": {
            "string_key": {
              "stringValue": "string_value"
            }
          }
        }
      },
      "null_field": {
        "nullValue": null
      },
      "number_field": {
        "integerValue": "42"
      },
      "reference": {
        "referenceValue": "projects/inlined-junkdrawer/databases/(default)/documents/users/userId"
      },
      "string_field": {
        "stringValue": "string_value"
      },
      "timestamp": {
        "timestampValue": "2021-05-17T08:02:00Z"
      }
    },
    "name": "projects/inlined-junkdrawer/databases/(default)/documents/collection/documentID",
    "updateTime": "2021-05-17T18:49:46.247615Z"
  }
};

let context = {
  eventId: "b818b6e1-363c-4b34-b823-ab17d0328da5-0",
  eventType: "providers/cloud.firestore/eventTypes/document.write",
  notSupported: {},
  params: {
    "document": "documentID"
  },
  resource: "projects/inlined-junkdrawer/databases/(default)/documents/collection/documentID",
  timestamp: "2021-05-17T18:49:46.247615Z"
}

console.log(`Loaded ${Object.keys(require.cache).length} keys with functions SDK`);
functions.firestore.document('abc/123').onWrite(() => Promise.resolve())(data, context);
console.log(`Loaded ${Object.keys(require.cache).length} keys with function execution`);
