import type { IIconPropsWithStroke } from "@interfaces/icons";

const HeaderBurgerIcon: React.FC<IIconPropsWithStroke> = ({
  className,
  stroke,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="1.5" x2="24" y2="1.5" className={stroke} strokeWidth="3" />
      <line y1="10.5" x2="24" y2="10.5" className={stroke} strokeWidth="3" />
      <line y1="19.5" x2="24" y2="19.5" className={stroke} strokeWidth="3" />
    </svg>
  );
};

export default HeaderBurgerIcon;
