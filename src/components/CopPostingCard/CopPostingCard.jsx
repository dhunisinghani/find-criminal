import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from '@mui/material/Avatar';
import Divider from "@mui/material/Divider";


const LINES_TO_SHOW = 4;

const CopPostingCard = ({ cop, city, vehicle }) => {
    console.log({city, cop, vehicle})
    return (
        <Box margin={2}>
            <Card sx={{ maxWidth: 345 }}>

                <CardMedia
                    sx={{ height: 140 }}
                    image={city.image}
                    title={city.name}
                />
                <CardContent>
                    <Box marginBottom={2}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Box>
                            <Typography gutterBottom variant="h5" component="div">
                                {city.name} {`(${city.distance}km)`}
                            </Typography>
                        </Box>
                    </Stack>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {city.description}
                    </Typography>
                    </Box>

                    <Divider orientation="horizontal" flexItem />
                    <Stack marginTop={2} marginBottom={2} direction="row" alignItems={'center'} gap={10}>
                        <Avatar alt={cop.name} src={`/${cop.image}`} />
                        {cop.name}
                    </Stack>

                    <Divider orientation="horizontal" flexItem />
                    <Stack marginTop={2} direction="row" alignItems={'center'} gap={10}>
                        <Avatar alt={vehicle.name} src={`/${vehicle.image}`} />
                        {vehicle.name} {`(${vehicle.range}km)`}
                    </Stack>
                </CardContent>

            </Card>
        </Box>
    );
};

export default CopPostingCard;
