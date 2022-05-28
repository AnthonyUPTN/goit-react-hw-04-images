import PropTypes from 'prop-types';
import s from './imageGalleryItem.module.css';

function ImageGalleryItem({ data, onClick }) {
  const elements = data.map(({ id, webformatURL, largeImageURL, tag }) => {
    return (
      <li
        className={s.galleryItem}
        key={id}
        onClick={() => onClick({ largeImageURL, tag })}
      >
        <img className={s.itemImage} src={webformatURL} alt={tag} />
      </li>
    );
  });
  return elements;
}

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  data: [],
};

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
