import React from 'react';

/**
 * FormField — glassmorphism-styled input field.
 * API is unchanged from original; only visuals updated via CSS.
 */
const FormField = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  placeholder,
  autoComplete,
}) => {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={error ? 'input-error' : ''}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;
