const axios = require('axios');

export async function doGoogleSearch(keyword) {
  const data = {'country': 'us','query':{'q':keyword,num:100},num:100,"brd_json":"json" };
  const url = 'https://api.brightdata.com/serp/req?customer=hl_9c85b7f3&zone=rank_tracker';
  const headers = {
   'Content-Type': 'application/json',
    'Authorization': 'Bearer a8a15764-4b07-4c18-a0d4-939364903c12'
  };
  const response = await axios.post(url, data, {headers});
  console.log(keyword);
  if (!response?.headers) {
    console.error('no header in response '+url);
    console.error(data);
    return null;
  } else {
    console.log('responseId:'+response?.headers.get('x-response-id'));
    return response?.headers.get('x-response-id');
  }
}

