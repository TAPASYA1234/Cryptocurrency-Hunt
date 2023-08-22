import React, { useEffect, useState } from "react";
import { CryptoState } from "../utils/CryptoContext";
import { HistoricalChart } from "../config/api";
import axios from "axios";
import Chart from "chart.js/auto";
import {
  CircularProgress,
  Container,
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);
  const classes = useStyles();

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency), {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    setflag(true);
    setHistoricData(data.prices);
  };

  console.log("historic data", historicData);

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData.length | (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          ></CircularProgress>
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  selected={day.value === days}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;