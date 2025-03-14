import {
  Header_1,
  Header_2,
  Header_3,
  Tea_Export,
  Tea_Exports,
  Tea_Production,
} from "../assets";
import { Footer, SubHeader } from "../components";

const Card = ({
  image,
  title,
  link,
}: {
  image: string;
  title: string;
  link: string;
}) => (
  <a
    href={link}
    className="block bg-white border rounded-lg overflow-hidden transition-transform transform hover:scale-105"
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-gray-700 text-lg font-semibold">{title}</h2>
    </div>
  </a>
);

const ForexPortal = () => {
  const image = Header_1;
  const title = "Tea Information Forex Portal";
  const description =
    "Stay ahead with our tea production and forex forecasting tools, powered by machine learning. Get forecasted insights on production volumes, and foreign exchange earnings.";

  const cards = [
    {
      image: Tea_Export,
      title: "FEE Prediction",
      link: "/portal/forex/fee",
    },
    {
      image: Header_1,
      title: "Low Grown Forecast",
      link: "/portal/forex/low-grown-forecast",
    },
    {
      image: Header_2,
      title: "Mid Grown Forecast",
      link: "/portal/forex/mid-grown-forecast",
    },
    {
      image: Header_3,
      title: "High Grown Forecast",
      link: "/portal/forex/high-grown-forecast",
    },
    {
      image: Tea_Exports,
      title: "National Production Forecast",
      link: "/portal/forex/national-production-forecast",
    },
    {
      image: Tea_Production,
      title: "FEE Forecast",
      link: "/portal/forex/fee-forecast",
    },
  ];

  return (
    <>
      <SubHeader image={image} title={title} description={description} />
      <div className="wrapper flex flex-col items-center pt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              link={card.link}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForexPortal;
