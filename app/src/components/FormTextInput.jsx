import React from 'react';

const FormTextInput = ({
  labelFor,
  labelText,
  placeholder,
  name,
  value,
  onChange,
  errors,
  type = 'text', // Por defecto, el tipo es texto
  isMandatory = false, // Por defecto, no es obligatorio
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={labelFor}
        className="block mb-2 text-sm font-bold text-white"
      >
        {labelText} {isMandatory && <span style={{ color: 'var(--talent-highlight)' }}>*</span>}
      </label>
      <div className="flex"> {/* Contenedor para alinear el label y el input */}
        <input
          type={type}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
      {/* validacion del campo del formulario */}
      {errors && errors[name] && (
        <p className="text-red-500 text-xs italic">
          {errors[name]}
        </p>
      )}
    </div>
  );
};

export default FormTextInput;
