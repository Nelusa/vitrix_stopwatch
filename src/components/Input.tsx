import {ChangeEvent} from "react";
import {classNames} from "../utils/helpers.ts";

interface InputProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = ({ label, id, placeholder, value, onChange, onBlur, className }: InputProps) => {
  return (
    <div className={classNames(className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        autoFocus
        name={id}
        id={id}
        className="block w-full font-semibold rounded-md border-0 py-1.5 text-gray-900 focus:shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 focus:font-normal px-0 focus:px-1 text-center"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={24}
      />
    </div>
  )
}

export default Input;