import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PORT } from "../../utils/auth/api";
import { deleteTodoHandler } from "../../utils/todo/api";

function Todo(token) {
  const [data, setData] = useState([]);

  async function getTodoByIdHandler() {
    await axios
      .get(`${PORT}/todos`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  const deleteHandler = (event, id) => {
    deleteTodoHandler(id, token);
    alert("삭제되었습니다.");
  };

  useEffect(() => {
    getTodoByIdHandler();
  }, []);

  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {data?.map((ele, index) => (
          // Enterprise card is full width at sm breakpoint
          <Grid
            item
            key={ele.title}
            xs={12}
            //sm={tier.title === 'Enterprise' ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={ele.title}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <ul>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={`${ele.id}${index}`}
                    >
                      {ele.content}
                    </Typography>
                  </ul>
                </Box>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained">
                  수정
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={(event) => deleteHandler(event, ele.id)}
                >
                  삭제
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Todo;
