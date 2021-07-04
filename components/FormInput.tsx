import { ErrorMessage, Field } from "formik";

export default function FormInput({
  name,
  type,
  className,
  label,
  placeholder,
  optional,
  nullable,
}: {
  name: string;
  type: string;
  className?: string;
  label?: string;
  placeholder?: string;
  optional?: boolean;
  nullable?: boolean;
}) {
  return (
    <div className={`mt-4 px-2 ${className}`}>
      <div className="flex flex-row justify-between">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 capitalize"
        >
          {label ? label : name}
        </label>
        <p className="block text-sm font-normal text-gray-400">
          {optional && "optional"}
        </p>
      </div>
      <div className="mt-1 relative rounded-md shadow-sm">
        {name === "fee" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
        )}
        {!nullable ? (
          <Field
            className="focus:ring-primary focus:border-primary block w-full pl-3 pr-4 text-sm border-gray-300 rounded-md"
            type={type}
            name={name}
          />
        ) : (
          <input
            type={type}
            name={name}
            className="focus:ring-primary focus:border-primary block w-full pl-3 pr-4 sm:text-sm border-gray-300 rounded-md"
            placeholder={placeholder && ""}
            // value={
            //   values.credits === null
            //     ? ""
            //     : (values.credits as unknown as number)
            // }
          />
        )}
      </div>
      <ErrorMessage className="text-red-600" name={name} component="div" />
    </div>
  );
}
