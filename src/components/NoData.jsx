import Button from "./form/Button";

const NoData = () => {
  return (
    <section className="flex flex-col items-center justify-center container mx-auto p-6 md:px-14 text-center space-y-4">
      <h1 className="text-2xl font-bold">Oops! No Results Found.</h1>
      <p className="max-w-xl text-gray-600">
        We couldn't find any data matching your request. Please check your
        search criteria and try again. If you believe this is an error or need
        assistance, feel free to reach out to our support team. We're here to help!
      </p>
      <div className="flex items-center gap-4">
        <Button title="Retry Search" path="/" />
        <Button title="Contact Support" path="/contact" />
      </div>
    </section>
  );
};

export default NoData;
