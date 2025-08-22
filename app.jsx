import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const resDetail = await fetch(p.url);
          const detail = await resDetail.json();
          return {
            name: detail.name,
            image: detail.sprites.front_default,
            base_experience: detail.base_experience,
          };
        })
      );

      setPokemons(detailed);
    }

    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <h1>Pokémons</h1>
      <div className="pokemon-grid">
        {pokemons.map((p) => (
          <div key={p.name} className="pokemon-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>Exp: {p.base_experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

