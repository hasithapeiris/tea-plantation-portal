import { Tea_Export } from "../assets";
import { Footer, ForecastChart, SubHeader } from "../components";

const MidGrownForecast = () => {
  const title = "Forecasted Mid Grown Production";
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

export default MidGrownForecast;
