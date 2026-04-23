import { useState } from 'react';
import './App.css';
import useAxios from './hooks/useAxios';
import useFetch from './hooks/useFetch';

function App() {
  const { fetch: axios } = useAxios();
  const { doRequest } = useFetch();
  const [pokemons, setPokemons] = useState()

  // useEffect(() => {
  //   const startTime = Date.now();
  //   fetch("pokemon?limit=100&offset=0")
  //     .then((res) => setPokemons(res.data))
  //     .finally(() => console.log("finally in " + (Date.now() - startTime), "ms"))
  // }, [fetch])

  return (
    <>
      <div className="App">
        <div style={{ border: "1px red solid", padding: "10px" }}>
          <button onClick={() => {
            const startTime = Date.now();
            axios("pokemon?limit=100&offset=0")
              .then((res) => setPokemons(res.data))
              .finally(() => console.log("axios finally in " + (Date.now() - startTime), "ms"))
          }}>Refresh Axios</button>

          <button onClick={() => {
            const startTime = Date.now();
            doRequest("pokemon?limit=100&offset=0")
              .then((res) => setPokemons(res.data))
              .finally(() => console.log("fetch finally in " + (Date.now() - startTime), "ms"))
          }}>Refresh Fetch</button>
          {pokemons?.results?.map((pokemon, index) => {
            return (
              <div>
                <p key={index}>{pokemon.name}</p>
              </div>
            )
          })}

        </div>
      </div>
    </>
  )
}


export default App
