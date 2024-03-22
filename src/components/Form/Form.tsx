import { FormEvent, MouseEventHandler, ReactNode } from 'react';
import './Form.scss';

interface FormProps {
  name: string;
  buttonText: string;
  loadingText: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  isLoading: boolean;
  isValid: boolean;
  children: ReactNode;
}

export const Form = ({
  name,
  buttonText,
  loadingText,
  onSubmit,
  handleReset,
  isLoading,
  isValid,
  children,
}: FormProps) => {
  return (
    <form
      className={`form form_type_${name}`}
      name={name}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="form__buttons">
        <button
          className={`form__button form__button_type_${name}${(!isValid && ' form__button_disabled') || ''
            }`}
          type="submit"
          disabled={!isValid}
        >
          <span>{isLoading ? loadingText : buttonText}</span>
        </button>
        <button className="form__button" onClick={handleReset} type='button'>
          Очистить форму
        </button>
      </div>

      {children}
    </form>
  );
};
