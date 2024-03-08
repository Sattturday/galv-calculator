import './InputCheckbox.scss';

export function InputCheckbox({ option, isChecked, onChange }) {
  return (
    <label className="checkbox">
      <span className="checkbox__title">{option.name}</span>
      <input
        className="checkbox__input"
        type="checkbox"
        form="filter"
        checked={isChecked || false}
        onChange={onChange}
      />
      <span className="checkbox__input-new"></span>
    </label>
  );
}
