import { useEffect, useState } from "react";
import { Tea_Export } from "../assets";
import {
  Footer,
  RegionalChart,
  RegionalMiniChart,
  SubHeader,
} from "../components";
import axios from "axios";
import { RegionalChartType } from "../types";

const RegionalProdForecast = () => {
  const [data, setData] = useState([]);
  const [charts, setCharts] = useState<RegionalChartType[]>([]);
  const title = "Forecasted Low Grown Production";
  const description =
    "Forecast the production of low-grown tea region, known for its strong flavor and high demand, from 2024 to 2028. Use ARIMA-based insights to plan cultivation and exports effectively.";

  useEffect(() => {
    fetchData();
    fetchCharts("regionalProduction");
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/regional-prod"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCharts = async (label = "") => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/mini-charts`,
        {
          params: label ? { label } : {},
        }
      );
      setCharts(response.data);
    } catch (error) {
      console.error("Error fetching charts:", error);
    }
  };

  return (
    <>
      <SubHeader image={Tea_Export} title={title} description={description} />
      <div className="wrapper mt-14">
        <RegionalChart
          data={data}
          label1="lowGrownProduction"
          label2="midGrownProduction"
          label3="highGrownProduction"
        />
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {charts.map((chart, index) => (
              <div key={index} className="bg-white border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">{chart.title}</h2>
                <p className="text-gray-600 mb-4">{chart.description}</p>
                <RegionalMiniChart
                  data={chart.data}
                  label1="lowGrownProduction"
                  label2="midGrownProduction"
                  label3="highGrownProduction"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="wrapper-header mt-14 text-center text-gray-600 space-y-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eum
            cum odio explicabo corporis quibusdam possimus, voluptas fugiat,
            deserunt modi eius optio vitae commodi pariatur sapiente consectetur
            soluta architecto labore.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eum
            cum odio explicabo corporis quibusdam possimus, voluptas fugiat,
            deserunt modi eius optio vitae commodi pariatur sapiente consectetur
            soluta architecto labore. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Natus eum cum odio explicabo corporis quibusdam
            possimus, voluptas fugiat, deserunt modi eius optio vitae commodi
            pariatur sapiente consectetur soluta architecto labore.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegionalProdForecast;
