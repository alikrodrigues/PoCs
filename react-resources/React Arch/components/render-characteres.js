import useFetch from "../hooks/useFetch.js";
import { createElement, useEffect, useState } from "../modules/react/index.js";

function Characteres(props) {
  const { doRequest: fetchCharacters } = useFetch(
    "https://rickandmortyapi.com/api/character",
  );
  const [characteres, setChars] = useState([]);

  useEffect(() => {
    fetchCharacters().then((response) => {
      setChars(response.results);
    });
  }, []);

  return createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxHeight: "50vh",
        overflow: "auto",
      },
    },
    createElement("div", {}, "Rick and Morty Characters"),
    createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
        },
      },
      characteres.map((char) =>
        createElement(
          "div",
          {
            style: { border: "1px solid black", padding: "10px" },
          },
          createElement("img", {
            src: char.image,
            width: "80px",
            height: "60px",
          }),

          createElement("p", {}, "Nome: "),
          createElement(
            "span",
            { style: { fontWeight: "600", fontSize: "16px" } },
            char.name,
          ),
          createElement("p", {}, "Status: "),
          createElement("span", {}, char.status),
          createElement("p", {}, "Especie: "),
          createElement("span", {}, char.species),
          createElement("p", {}, "Genero: "),
          createElement("span", {}, char.gender),
        ),
      ),
    ),
  );
}

export default Characteres;
