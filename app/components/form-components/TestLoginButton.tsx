import React from "react";
interface TestLoginButtonProps {
  label: string;
  onClick: () => {};
}

const TestLoginButton: React.FC<TestLoginButtonProps> = ({ label, onClick }) => {
  return (
    <div className="flex justify-center pt-8">
      <button
        onClick={onClick}
        type="button"
        className={`h-12 text-center w-full bg-indigo-600 rounded-md hover:shadow-lg hover:bg-indigo-800 text-lg transition`}
      >
        <p className="capitalize text-white dark:text-gray-100 font-normal">{label}</p>
      </button>
    </div>
  );
};

export default TestLoginButton;