import * as functions from "firebase-functions";
import * as axios from 'axios';

function clearCache() {
  for (const key of Object.keys(require.cache)) {
    delete require.cache[key];
  }
}

const rawData = {
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
}
const rawContext = {
  eventId: "b818b6e1-363c-4b34-b823-ab17d0328da5-0",
  eventType: "providers/cloud.firestore/eventTypes/document.write",
  notSupported: {},
  params: {
    "document": "documentID"
  },
  resource: "projects/inlined-junkdrawer/databases/(default)/documents/collection/documentID",
  timestamp: "2021-05-17T18:49:46.247615Z"
};

export const measureLatency = functions.https.onRequest(async (req, res) => {
  const url = `https://${req.hostname}/measureOnce`;
  let timings: number[] = [];
  for (let i = 0; i < 10; i++) {
    try {
      const results = await axios.default.get(url);
      functions.logger.log("Batch results:", results.data);
      timings.push(...(results.data.raw as number[]));
    } catch (err) {
      functions.logger.error("batch", i, "failed with err. Retrying", err);
      i--;
    } finally {
      // Kill function to work around memory leak
      try {
        await axios.default.get(url + "?kill=true");
      } catch (err) {
        // noop
      }
    }
  }

  let stats = require('simple-statistics') as {quantile: (x: number[], p: number) => number};
  res.json({
    p50: stats.quantile(timings, 0.5),
    p90: stats.quantile(timings, .9),
    p95: stats.quantile(timings, 0.95),
    raw: timings,
  });
})

export const measureOnce = functions.runWith({maxInstances: 1, memory: "256MB"}).https.onRequest(async (req, res) => {
  if (req.query.kill) {
    console.log("Killing");
    throw new Error("Intentional death");
  }
  const times = Number(req.body.times || 20);
  console.log("Running", times, "times");
  let timings: number[] = [];
  try {
    for (let time = 0; time < times; time++) {
      clearCache();
      const start = new Date();
      let sdk = require('firebase-functions');
      let stop: Date | undefined;
      const func = sdk.firestore.document("collection/{documentId}").onWrite(() => {
        stop = new Date(); 
      });
      await func(rawData, rawContext);
      timings.push(stop!.getTime() - start.getTime());
    }
  } catch(err) {
    console.error("Got error", err);
    throw err;
  }

  console.log("Done with all iterations");
  let stats = require('simple-statistics') as {quantile: (x: number[], p: number) => number};
  res.json({
    p50: stats.quantile(timings, 0.5),
    p90: stats.quantile(timings, .9),
    p95: stats.quantile(timings, 0.95),
    raw: timings,
  });
});