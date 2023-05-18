import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex justify-center rounded-md bg-white dark:bg-gray-400 px-4 py-2 text-gray-500 dark:text-white shadow-sm ring-1 ring-inset ring-gray-400 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-offset-0"
    >
      <Icon />
    </button>
   );
}

export default AuthSocialButton;