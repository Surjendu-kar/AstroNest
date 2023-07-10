import { Grid, Card, CardContent, Typography } from "@mui/material";
import "./CustomeCard.css";
interface Props {
  astronaut: {
    name: string;
    id: string;
    designation: string;
    name_limited: string;
    absolute_magnitude_h: number;
  };
}

function CustomeCard(props: Props) {
  const { astronaut } = props;
  //   console.log(Astronaut.name);

  return (
    <Grid container justifyContent="center">
      <Card data-testid="card"
        sx={{ minWidth: 275, padding: 2, borderRadius: 5 }}
        style={{ backgroundColor: "#031f34" }}
      >
        <Typography variant="h6" color='white' fontWeight={600}>Details about {astronaut.name}</Typography>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
            component={"div"}
          >
            <Typography>Name - {astronaut.name}</Typography>
            <Typography>Id - {astronaut.id}</Typography>
            <Typography>Limited - {astronaut.name_limited}</Typography>
            <Typography>Designation - {astronaut.designation}</Typography>
            <Typography>Absolute_Magnitude_h - {astronaut.absolute_magnitude_h}</Typography>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CustomeCard;
