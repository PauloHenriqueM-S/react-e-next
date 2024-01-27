import P from 'prop-types';
import './styles.css';

export const TextInput = ({ handleChange, searchValue }) => {
  return (
    <input
      type="search"
      className="text-input"
      onChange={handleChange}
      value={searchValue}
      placeholder="Type your search"
    />
  );
};

TextInput.propTypes = {
  handleChange: P.func.isRequired,
  searchValue: P.string.isRequired,
};
