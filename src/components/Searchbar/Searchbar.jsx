import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    q: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      q: '',
    });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            onChange={handleChange}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="q"
            value={this.state.q}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
