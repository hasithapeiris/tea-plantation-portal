import { Header_1, Tea_Export } from "../assets";

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
  const cards = [
    {
      image: Tea_Export,
      title: "FEE Prediction",
      link: "/portal/forex/fee",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Link to Resource 2",
      link: "https://example.com/resource2",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Link to Resource 3",
      link: "https://example.com/resource3",
    },
    {
      image: Header_1,
      title: "FEE Prediction",
      link: "/portal/forex/fee",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Link to Resource 2",
      link: "https://example.com/resource2",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Link to Resource 3",
      link: "https://example.com/resource3",
    },
  ];

  return (
    <>
      <div className="relative h-96">
        <img
          src={Header_1}
          alt="cover-image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70" />
        <div className="wrapper-header absolute inset-0 flex flex-col justify-center items-center text-center text-white py-12">
          <h1 className="font-heading text-3xl font-extrabold mb-4 animate-fade-in md:text-5xl">
            Tea Information Forex Portal
          </h1>
          <p className="text-base md:text-lg font-normal mb-4 animate-fade-in-delay">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit
            amet nisl non urna fringilla cursus vitae nec metus. Suspendisse
            malesuada sodales varius.
          </p>
        </div>
      </div>
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
    </>
  );
};

export default ForexPortal;