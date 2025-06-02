import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';

export default function RecipeCard(props) {
//   const [random, setRandom] = React.useState([]);
  const navigate = useNavigate();
  const handleSelection = () => {
    navigate(`/recipe-detail/${props.id}`);
  };

  return (
    <Card sx={{ minWidth: 240 }} >
      <CardActionArea onClick={handleSelection}>
        <CardMedia
          component="img"
          height="180"
          image={props.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {props.area}
        </Button>
      </CardActions>
    </Card>
  );
}