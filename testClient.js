const qs = require('qs');
const axios = require('axios');

const url = 'http://localhost:18080/internal/core/v2/chargers/f3d713a4-3171-452a-9a97-78ab02b73032/messages'
const token = '<token>'

const quotedQ = '""errorCode":"NoError"","Heartbeat", "test with , a comma", "how about "quoted" text", "and some text with \\ a backslash", "测试""';
const jsonQ = [
            JSON.stringify('"errorCode":"NoError"')
           , JSON.stringify('phrase with "," quoted comma')
            , JSON.stringify('phrase with a single , comma')
            , JSON.stringify('phrase with \\ backslash')
            ]

async function runTest() {
  try {

    const params = {
      scope: 'all',
      companyId: 'e8177235-9d0f-48ca-8b1f-72f98cabea54',
      filter: {
          receivedTimeUtc: {
            gte: '2023-02-15T10:00:00Z',
            lte: '2023-02-15T10:15:00Z'
          }
        },
      offset: 200,
      limit: 50,
      sort: '-receivedTimeUtc',
      q: [JSON.stringify('"errorCode":"NoError"')
          , JSON.stringify('phrase with "," quoted comma')
          , JSON.stringify('phrase with a single , comma')
          , JSON.stringify('phrase with \\ backslash')
      ]
    }

    const serializedParams = qs.stringify(params, { encode: true, arrayFormat: 'comma' });
    console.log("URL: " + url + "?" + serializedParams)

    const response = await axios.get(url + "?" + serializedParams, {
        headers: {
            Authorization: 'Bearer ' + token
        },
    });

    console.log("Status:" + response.status);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data);
  }
}

runTest();