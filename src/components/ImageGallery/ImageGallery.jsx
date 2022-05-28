import PropTypes from 'prop-types';

import s from './imageGallery.module.css';

import ImageGalleryItem from './imageGalleryItem';

const ImageGallery = ({ data, onClick }) => {
  return (
    <>
      <ul className={s.gallery}>
        <ImageGalleryItem data={data} onClick={onClick} />
      </ul>
    </>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  data: [],
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
