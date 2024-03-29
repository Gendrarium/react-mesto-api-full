import type { IIconPropsWithFill } from "@interfaces/icons";

const PlusIcon: React.FC<IIconPropsWithFill> = ({ className, fill }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 9.77778H12.2222V0H9.77778V9.77778H0V12.2222H9.77778V22H12.2222V12.2222H22V9.77778Z"
        className={fill}
      />
    </svg>
  );
};

export default PlusIcon;
