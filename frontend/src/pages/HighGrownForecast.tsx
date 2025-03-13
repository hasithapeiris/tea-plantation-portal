import { Tea_Export } from "../assets";
import { Footer, ForecastChart, SubHeader } from "../components";

const HighGrownForecast = () => {
  const title = "Forecasted High Grown Production";
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

export default HighGrownForecast;
