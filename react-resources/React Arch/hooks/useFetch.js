function useFetch(path, options = {}) {
  const doRequest = async () => {
    try {
      const response = await fetch(path, options);

      return await response.json();
    } catch (error) {
      console.log("Observability error in useFetch path:", path, "starts...");
      console.log(error);
      console.log("Observability error in useFetch path:", path, "end...");
      return error;
    }
  };

  return { doRequest };
}

export default useFetch;
