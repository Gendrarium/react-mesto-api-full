import type { IIconPropsWithFill } from "@interfaces/icons";

const HeaderCloseIcon: React.FC<IIconPropsWithFill> = ({ className, fill }) => {
  return (
    <svg
      className={className}
      viewBox="10 10 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.6413 9.42778L21.2132 18.8559L11.7851 9.42778L9.42809 11.7848L18.8562 21.2129L9.42809 30.641L11.7851 32.998L21.2132 23.5699L30.6413 32.998L32.9983 30.641L23.5702 21.2129L32.9983 11.7848L30.6413 9.42778Z"
        className={fill}
      />
    </svg>
  );
};

export default HeaderCloseIcon;
