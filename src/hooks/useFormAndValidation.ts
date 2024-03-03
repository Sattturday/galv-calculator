import { useState, useCallback, ChangeEvent } from 'react';

interface FormState {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormAndValidation {
  values: FormState;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
  isValid: boolean;
  resetForm: (
    newIsValid?: boolean,
    newValues?: FormState,
    newErrors?: FormErrors,
  ) => void;
  setValues: (values: FormState) => void;
  setIsValid: (isValid: boolean) => void;
}

export function useFormAndValidation(): FormAndValidation {
  const [values, setValues] = useState<FormState>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValidPattern = e.target.validity.patternMismatch;

    if (isValidPattern && name === 'name') {
      e.target.setCustomValidity(
        'Имя может содержать только латиницу, кириллицу, пробел или дефис',
      );
    } else {
      e.target.setCustomValidity('');
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    const formElement = e.target.closest('form');
    if (formElement) {
      setIsValid(formElement.checkValidity());
    }
  };

  const resetForm = useCallback(
    (
      newIsValid = false,
      newValues: FormState = {},
      newErrors: FormErrors = {},
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
