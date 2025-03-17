import { useEffect, useState } from "react";
import { Tea_Export } from "../assets";
import { ChartGrid, Footer, ForecastChart, SubHeader } from "../components";
import axios from "axios";

const NationalProdForecast = () => {
  const [data, setData] = useState([]);
  const [charts, setCharts] = useState([]);
  const title = "Forecasted National Tea Production";
  const description =
    "View Sri Lanka’s overall tea production forecast, integrating data from all elevations. Use these insights to anticipate industry trends and market fluctuations.";

  useEffect(() => {
    fetchData();
    fetchCharts("nationalProduction");
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/national-prod"
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
        <ForecastChart data={data} label="nationalProduction" />
        <div className="mt-8">
          <ChartGrid charts={charts} />
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

export default NationalProdForecast;
