import React from "react";

function renderInputsByComponentType(getControlItems, formData, setFormData) {
  const value = formData[getControlItems.name] || "";

  switch (getControlItems.componentType) {
    case "input":
      return (
        <input
          type={getControlItems.type}
          id={getControlItems.name}
          name={getControlItems.name}
          placeholder={getControlItems.placeholder}
          value={value}
          onChange={(e) =>
            setFormData({ ...formData, [getControlItems.name]: e.target.value })
          }
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
        />
      );
    case "select":
      return (
        <select
          id={getControlItems.name}
          name={getControlItems.name}
          value={value}
          onChange={(e) =>
            setFormData({ ...formData, [getControlItems.name]: e.target.value })
          }
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
        >
          <option value="">{getControlItems.placeholder}</option>
          {getControlItems.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    default:
      return <p>Unsupported component type</p>;
  }
}


function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {formControls.map((controlItem) => (
        <div key={controlItem.name} className="block text-sm font-medium text-gray-700">
          <label htmlFor={controlItem.name} className="block text-sm font-medium text-gray-700">
            {controlItem.label}
          </label>
          {renderInputsByComponentType(controlItem, formData, setFormData)}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition duration-300"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default CommonForm;
