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
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sitamet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius.";

  const cards = [
    {
      image: Tea_Export,
      title: "FEE Prediction",
      link: "/portal/forex/fee",
    },
    {
      image: Header_1,
      title: "Production Plan (Low Grown)",
      link: "https://example.com/resource2",
    },
    {
      image: Header_2,
      title: "Production Plan (Mid Grown)",
      link: "https://example.com/resource3",
    },
    {
      image: Header_3,
      title: "Production Plan (High Grown)",
      link: "#",
    },
    {
      image: Tea_Exports,
      title: "Tea Exports Data",
      link: "https://example.com/resource2",
    },
    {
      image: Tea_Production,
      title: "Tea Production Data",
      link: "https://example.com/resource3",
    },
  ];

  return (
    <>
      <SubHeader image={image} title={title} description={description} />
      <div className="wrapper flex flex-col items-center py-12">
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
