import Button from "./components/form/Button";
const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen container mx-auto px-6 md:px-14 mt-32 ">
      <h1 className="text-2xl font-bold">Oops! We Can't Find That Page.</h1>
      <p>
        Sorry, the page you're looking for doesn't exist or may have been moved.
        But don't worry! You can return to our homepage or use the search bar to
        find what you need. If you need more assistance, we're just a click away
        to help you!
      </p>
      <div className="flex items-center gap-3">
        <Button title={`Go Back Home `} path="/" />
        <Button title={`Contact Us `} path="/contact" />
      </div>
    </div>
  );
};

export default NotFound;
