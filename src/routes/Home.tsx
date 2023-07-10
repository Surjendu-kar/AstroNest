import { Box, TextField, Grid, Button, Typography } from "@mui/material";
import React, { startTransition, useState } from "react";
import { useNavigate } from "react-router-dom";


const random = "https://api.nasa.gov/neo/rest/v1/neo/browse";
const singleUserApi = "https://api.nasa.gov/neo/rest/v1/neo/";
const key = import.meta.env.VITE_NASA_API_KEY;

const CONSTRANTS = {
  LOADING_TEXT: "Loading...",
  NO_RESULT: "No Astro Found",
};

function Home() {
  const [userVal, setuserVal] = useState("");
  const [status, setStatus] = useState("");
  const [apicall, setApiCall] = useState(false);

  const navigate = useNavigate();

  const randomApi = async () => {
    setApiCall(true);
    try {
      setStatus(CONSTRANTS.LOADING_TEXT);
      const res = await fetch(`${random}?api_key=${key}`);
      const data = await res.json();
      if (res.ok) {
        navigate("/details", {
          state:
            data.near_earth_objects[
              Math.round(Math.random() * data.near_earth_objects.length + 1)
            ],
        });
      } else {
        setStatus(CONSTRANTS.NO_RESULT);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setApiCall(false);
    }
  };

  const singleApi = async (id: string) => {
    setApiCall(true);
    try {
      setStatus(CONSTRANTS.LOADING_TEXT);
      const res = await fetch(`${singleUserApi}${id}?api_key=${key}`);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        navigate("/details", { state: data });
      }
    } catch (error) {
      setStatus(CONSTRANTS.NO_RESULT);
      // console.log(error);
    } finally {
      setApiCall(false);
    }
  };

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (status) setStatus("");

    const userInput = e.target.value;
    const alphabeticRegex = /^[0-9\s]*$/;

    if (alphabeticRegex.test(userInput)) {
      setuserVal(userInput);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" && userVal.trim() !== "") {
      singleApi(userVal);
    }
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Grid container justifyContent="center">
        <TextField
          id="outlined-basic"
          label="Enter id"
          variant="outlined"
          onChange={inputHandler}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          value={userVal}
        />
      </Grid>
      <Button
        sx={{ mt: 1 }}
        onClick={() => singleApi(userVal)}
        variant="outlined"
        disabled={userVal.trim().length === 0 || apicall}
      >
        Search
      </Button>

      <Button
        sx={{ mt: 4 }}
        onClick={randomApi}
        variant="contained"
        disabled={apicall}
      >
        RANDOM ASTRONAUT
      </Button>

      {status && (
        <Box mt={3}>
          <Typography
            color={status === CONSTRANTS.NO_RESULT ? "red" : ""}
            fontWeight={600}
          >
            {status}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Home;
