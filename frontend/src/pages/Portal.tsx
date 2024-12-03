import {
  Header_1,
  Tea_Disease,
  Tea_Export,
  Tea_Exports,
  Tea_Price,
} from "../assets";
import { Footer, SubHeader } from "../components";

const Card = ({
  image,
  title,
  description,
  link,
}: {
  image: string;
  title: string;
  description: string;
  link: string;
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white border rounded-lg overflow-hidden transition-transform transform hover:scale-105"
  >
    <img src={image} alt={description} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-gray-700 text-lg font-semibold mb-1">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  </a>
);

const Portal = () => {
  const image = Header_1;
  const title = "Tea Information Portal";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sitamet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius.";

  const cards = [
    {
      image: Tea_Export,
      title: "FEE Information",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "/portal/forex",
    },
    {
      image: Tea_Exports,
      title: "Demand Information",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "/portal/demand",
    },
    {
      image: Tea_Disease,
      title: "Disease Information",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "/portal/disease",
    },
    {
      image: Tea_Price,
      title: "Price Information",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "/portal/price",
    },
  ];

  return (
    <>
      <SubHeader image={image} title={title} description={description} />
      <div className="wrapper flex flex-col items-center pt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Portal;
