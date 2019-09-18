export default async function(data, uri) {
  let result = await fetch(uri, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  }).then(response => {
    return response.json();
  });
  return result;
}
