import { Tea_Export } from "../assets";
import { ChartGrid, Footer, ForecastChart, SubHeader } from "../components";
import { charts } from "../demoData";

const ForexForecast = () => {
  const title = "Forecasted Foreign Exchange Earnings";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sitamet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius.";

  return (
    <>
      <SubHeader image={Tea_Export} title={title} description={description} />
      <div className="wrapper mt-14">
        <ForecastChart />
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

export default ForexForecast;
