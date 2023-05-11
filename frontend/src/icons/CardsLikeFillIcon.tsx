import type { IIconPropsWithFill } from "@interfaces/icons";

const CardsLikeFillIcon: React.FC<IIconPropsWithFill> = ({ className, fill }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.154 9.33822C21.294 7.19832 21.294 3.72364 19.154 1.60492C17.014 -0.534975 13.5392 -0.534975 11.3992 1.60492L10.361 2.66428L9.32276 1.62611C7.18277 -0.534975 3.70792 -0.534975 1.58911 1.60492C0.550891 2.64309 0 4.02026 0 5.48217C0 6.94408 0.572079 8.32124 1.58911 9.35941L10.361 18.1309L19.154 9.33822Z"
        className={fill}
      />
    </svg>
  );
};

export default CardsLikeFillIcon;