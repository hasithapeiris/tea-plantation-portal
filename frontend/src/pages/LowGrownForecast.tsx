import { useEffect, useState } from "react";
import { Tea_Export } from "../assets";
import { ChartGrid, Footer, ForecastChart, SubHeader } from "../components";
import { charts } from "../demoData";
import axios from "axios";

const LowGrownForecast = () => {
  const [data, setData] = useState([]);
  const title = "Forecasted Low Grown Production";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sitamet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius.";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/forex-forecast"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <SubHeader image={Tea_Export} title={title} description={description} />
      <div className="wrapper mt-14">
        <ForecastChart data={data} label="Forecasted_Forex_Earnings" />
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

export default LowGrownForecast;
