import { useState, useCallback, ChangeEvent, useEffect } from 'react';

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
  deleteValue: (name: string) => void;
}

export function useFormAndValidation(): FormAndValidation {
  const [values, setValues] = useState<FormState>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  // Этот эффект добавлен для того, чтобы все изменения влияли на валидность формы, не только непосредственный ввод в инпуты
  useEffect(() => {
    const formElement = document.querySelector('form');
    if (formElement) {
      setIsValid(formElement.checkValidity());
    }
  }, [values]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    const formElement = e.target.closest('form');
    if (formElement) {
      setIsValid(formElement.checkValidity());
    }
  };

  const deleteValue = (name: string) => {
    delete values[name];
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
    deleteValue,
  };
}
