import { LuLoader } from "react-icons/lu";

const Spinner = ({ classes }) => (
  <LuLoader className={`h-8 w-8 animate-spin ${classes} text-black`} />
);

export default Spinner;
