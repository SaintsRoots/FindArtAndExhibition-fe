import mission from "../assets/paints.jpg";
import Story from "../assets/bg-5.jpg";
const About = () => {
  return (
    <div className="container mx-auto px-6 md:px-14 min-h-screen pt-14 pb-14 mt-14  flex flex-col gap-12 justify-center">
      <div className="flex flex-col gap-3 items-center justify-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="w-full md:w-2/3 text-center  mx-auto ">
          Our mission is to connect talented artists with art enthusiasts who
          appreciate the beauty and craftsmanship of unique creations.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-start   gap-6 ">
        <div className="flex flex-col w-full md:w-8/12 pr-0 md:pr-4  gap-4">
          <h1 className="text-2xl font-bold">Our Story</h1>
          <p>
            Our story started with a deep admiration for the artists who pour
            their heart and soul into their creations. We noticed that many
            talented artists struggled to find a platform that truly showcased
            their work and reached a wider audience. This observation sparked
            the idea of Online Art Finder and exhibition, an online marketplace
            dedicated to connecting these artists with people who appreciate the
            uniqueness and beauty of handmade art.
          </p>
          <p className="border-l-8 border-gray-600 italic pl-2 ">
            As we continue to grow, our commitment to these principles remains
            steadfast. We are dedicated to supporting our artists, inspiring
            creativity, and bringing beautiful, meaningful art into homes around
            the world. Thank you for being a part of our story. Together, we can
            make a difference in the art world and beyond.
          </p>
          <p>
            Any questions? Let us know in store or call us on{" "}
            <span className="text-primary">(+250) 784 404 173</span>
          </p>
        </div>
        <div className="w-full relative md:w-5/12 ">
          <div className="absolute w-full h-full border-4 border-gray-500 right-3 md:right-6 top-4 -z-10 "></div>

          <img
            src={Story}
            className=" aspect-square hover:scale-95 md:hover:scale-105 duration-100  "
            alt="Our Story"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-start  gap-6 ">
        <div className="w-full relative md:w-5/12 ">
          <div className="absolute w-full h-full border-4 border-gray-500 left-3 md:left-6 top-4 -z-10 "></div>

          <img
            src={mission}
            className=" aspect-square hover:scale-95 md:hover:scale-105 duration-100  "
            alt="Our Story"
          />
        </div>

        <div className="flex flex-col w-full md:w-8/12 p-0 md:pl-4  gap-4">
          <h1 className="text-2xl font-bold">Our Mission</h1>
          <p>
            <b>1. Empower Artists:</b> We strive to provide a platform where
            artists from around the world can showcase their work and reach a
            global audience. By offering a space for their creations, we aim to
            support their passion and help them achieve financial independence.
          </p>
          <p>
            <b>2. Foster Creativity:</b> Online Art Finder and exhibition, we
            celebrate creativity in all its forms. Our mission is to inspire and
            nurture artistic expression by curating a diverse collection of art
            pieces that cater to various tastes and styles.
          </p>
          <p>
            <b>4. Enhance Accessibility:</b> We believe that art should be
            accessible to everyone. Our platform offers a wide range of art
            pieces at different price points, making it easy for art lovers to
            find something that fits their budget and style.
          </p>
          <p>
            <b>5. Create Community:</b> Online Art Finder and exhibition is more
            than just an eCommerce platform; it's a community of art lovers. We
            aim to create a space where artists and buyers can connect, share
            stories, and celebrate the joy of art together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
