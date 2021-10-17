export default function DisplayPokemon({ pokeObj }) {
  return (
    <div>
      <p key={pokeObj.id}>
        #{pokeObj.num} | {pokeObj.name} | {pokeObj.type[0]} {pokeObj.type[1]} |
        Weaknesses - {pokeObj.weaknesses}
        <img src={pokeObj.img} alt="Pokemon Images"></img>
      </p>
    </div>
  );
}
