import Button from "./form/Button";
const NoData = () => {
  return (
    <div className="flex flex-col justify-center items-center p-2 container mx-auto px-6 md:px-14">
      <h1 className="text-2xl font-bold">Oops! No Results Found.</h1>
      <p>
        We couldn't find any data matching your request. Please check your
        search criteria and try again. If you believe this is an error, or if
        you need assistance, feel free to reach out to our support team. We're
        here to help!
      </p>
      <div className="flex items-center gap-3">
        <Button title={`Retry Search `} path="/" />
        <Button title={`Contact Support `} path="/contact" />
      </div>
    </div>
  );
};

export default NoData;
