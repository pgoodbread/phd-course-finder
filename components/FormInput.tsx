import { ErrorMessage, Field } from "formik";

export default function FormInput({
  name,
  type,
  label,
  placeholder,
  optional,
  nullable,
}: {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  optional?: boolean;
  nullable?: boolean;
}) {
  function PriceInput() {
    return (
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          {label ? label : name}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name={name}
            id="price"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
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
        {nullable ? (
          <Field
            className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-primary"
            type={type}
            name={name}
          />
        ) : (
          <input
            type={type}
            name={name}
            className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder={placeholder && ""}
            // value={
            //   values.credits === null
            //     ? ""
            //     : (values.credits as unknown as number)
            // }
          />
        )}
      </div>
      {/* replace name here */}
      <ErrorMessage className="text-red-600" name="name" component="div" />
    </div>
  );
}
