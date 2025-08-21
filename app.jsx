import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=20') // você pode aumentar o limit se quiser
      .then((response) => setList(response.data.results));
  }, []);

  return (
    <>
      <h3>Listagem de Pokémons</h3>
      {list
        .sort((a, b) => a.name.localeCompare(b.name)) // ordena por nome
        .map((pokemon) => (
          <div key={pokemon.name}>
            <PokemonMoreDetails data={pokemon} />
          </div>
        ))}
    </>
  );
}

const PokemonMoreDetails = ({ data }) => {
  const [moreDetails, setMoreDetails] = useState(null);

  useEffect(() => {
    axios.get(data.url).then((response) => setMoreDetails(response.data));
  }, [data.url]);

  if (!moreDetails) {
    return <p>Carregando...</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center', // corrigido
        marginBottom: '8px',
      }}
    >
      <img
        src={moreDetails.sprites.front_default}
        alt="pokemon"
        style={{ width: 40, marginRight: 10 }}
      />
      <p>
        {moreDetails.name} - {moreDetails.base_experience} EXP
      </p>
    </div>
  );
};

export default App;
