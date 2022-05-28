import PropTypes from 'prop-types';

import s from './button.module.css';

function Button({ onClick }) {
  return (
    <div className={s.btnWrapper}>
      <button className={s.button} type="button" onClick={onClick}>
        Load More
      </button>
    </div>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
