function doRequest(path, options) {
  return fetch("https://pokeapi.co/api/v2/" + path, options);
}

function main() {
  const startTime = Date.now();
  let count = 0;
  while (count < 5) {
    doRequest("pokemon?limit=100&offset=0")
      .then((response) => response.json())
      .then(
        (json) => Date.now(),
        //  console.log(json)
      )
      .catch((error) => console.log(error))
      .finally(() =>
        console.log("finally", " in " + (Date.now() - startTime), "ms"),
      );
    count++;
  }
}

main();
