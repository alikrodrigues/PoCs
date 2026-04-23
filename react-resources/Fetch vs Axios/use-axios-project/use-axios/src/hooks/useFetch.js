function useFetch() {
  const baseURL = "https://pokeapi.co/api/v2/";
  function doRequest(path, options = {}) {
    return fetch(baseURL + path, options);
  }

  return { doRequest };
}

export default useFetch;
