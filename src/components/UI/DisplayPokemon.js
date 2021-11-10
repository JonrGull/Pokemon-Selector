import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import GetPokemonCries from "../API Call/GetPokemonCries";

export default function DisplayPokemon({ pokeObj, selectPoke, pokemonData }) {
  return (
    <Card sx={{ minWidth: 300, m: 1, backgroundColor: "#b3e5fc" }}>
      <CardActionArea
        onClick={() => {
          if (pokemonData !== undefined) {
            selectPoke(pokeObj);
            GetPokemonCries(pokeObj.id);
          } else {
            GetPokemonCries(pokeObj.id);
          }
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" id={pokeObj.name}>
            #{pokeObj.num} {pokeObj.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {pokeObj.type[0]} {pokeObj.type[1]}
          </Typography>
          <img src={pokeObj.img} alt="Pokemon Images"></img>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {pokeObj.japanese_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

/* 
pokemonData becomes undefined after selecting a pokemon. So we can use that to run selectPoke only once time.
*/
