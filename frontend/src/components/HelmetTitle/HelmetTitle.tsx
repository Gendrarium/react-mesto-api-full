import { Helmet } from "react-helmet-async";

import { selectTitle } from "@redux/page/selectors";
import { useAppSelector } from "@redux/store";

const HelmetTitle = () => {
  const title = useAppSelector(selectTitle);

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HelmetTitle;
