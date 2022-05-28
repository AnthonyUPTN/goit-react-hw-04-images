import { Component } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';

import { getImages } from '../shared/services/fetch';

class App extends Component {
  state = {
    q: '',
    page: 1,
    images: [],
    loading: false,
    error: null,
    total: 0,
    modalBody: {},
    isModalOpen: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { q, page } = this.state;
    if (q !== prevState.q || page > prevState.page) {
      this.setState({
        loading: true,
        error: false,
      });

      try {
        const data = await getImages(q, page);
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...data.hits],
            loading: false,
            total: data.total,
          };
        });
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message,
        });
      }
    }
  }

  onSearch = ({ q }) => {
    this.setState({
      q,
      page: 1,
      images: [],
    });
  };

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  showModal = modalBody => {
    this.setState({
      isModalOpen: true,
      modalBody,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { images, loading, total, q, isModalOpen, modalBody } = this.state;
    const { onSearch, loadMore, showModal, closeModal } = this;

    return (
      <>
        <Searchbar onSubmit={onSearch} />
        {!loading && !images.length && Boolean(q.length) && (
          <p>Требуется правильный ввод!</p>
        )}
        {loading && <RotatingLines width="100" />}
        <ImageGallery data={images} onClick={showModal} />
        {!loading && Boolean(images.length) && images.length < total && (
          <Button onClick={loadMore} />
        )}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <img
              src={modalBody.largeImageURL}
              alt={modalBody.tag}
              width="800"
            />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
