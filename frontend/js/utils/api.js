async function sendApi(api, params){
  const res = await fetch("/"+api,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
  return await res.json();
}

export default {
  install: (app, options) => {
    app.config.globalProperties.$api = sendApi;
  }
}