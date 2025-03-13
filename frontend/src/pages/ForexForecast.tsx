import { Tea_Export } from "../assets";
import { Footer, ForecastChart, SubHeader } from "../components";

const ForexForecast = () => {
  const title = "Forecasted Foreign Exchange Earnings";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sitamet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius.";

  return (
    <>
      <SubHeader image={Tea_Export} title={title} description={description} />
      <div className="wrapper mt-14">
        <ForecastChart />
      </div>

      <Footer />
    </>
  );
};

export default ForexForecast;
