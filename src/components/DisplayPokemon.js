import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function DisplayPokemon({ pokeObj }) {
  return (
    <Card sx={{ minWidth: 400, m: 1, backgroundColor: "#b3e5fc" }}>
      <CardContent>
        <Typography variant="h5" component="div">
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
    </Card>
  );
}
