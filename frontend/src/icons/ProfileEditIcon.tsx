import type { IIconPropsWithFill } from "@interfaces/icons";

const ProfileEditIcon: React.FC<IIconPropsWithFill> = ({ className, fill }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1.32827L2.60377 8.7666L1.28302 7.41936L8.66038 0L10 1.32827ZM0 10L1.96226 9.41177L0.584906 8.08349L0 10Z"
        className={fill}
      />
    </svg>
  );
};

export default ProfileEditIcon;
