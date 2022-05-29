import { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';

import { getImages } from '../shared/services/fetch';

const App = () => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    images: [],
    loading: false,
    error: null,
    total: 0,
  });
  const [modal, setModal] = useState({
    modalBody: {},
    isModalOpen: false,
  });

  useEffect(() => {
    if (q === '') {
      return;
    }

    setData(prevState => {
      return {
        ...prevState,
        loading: true,
        error: false,
      };
    });

    const data = async (q, page) => {
      try {
        const data = await getImages(q, page);
        setData(prevState => {
          return {
            ...prevState,
            images: [...prevState.images, ...data.hits],
            loading: false,
            total: data.total,
          };
        });
      } catch (error) {
        setData(prevState => {
          return {
            ...prevState,
            loading: false,
            error: error.message,
          };
        });
      }
    };
    data(q, page);
  }, [q, page]);

  const onSearch = ({ q }) => {
    setQ(q);
    setPage(1);
    setData(prevState => {
      return {
        ...prevState,
        q,
        page: 1,
        images: [],
      };
    });
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const showModal = modalBody => {
    setModal({
      isModalOpen: true,
      modalBody,
    });
  };

  const closeModal = () => {
    setModal(prevState => {
      return { ...prevState, isModalOpen: false };
    });
  };

  const { modalBody, isModalOpen } = modal;
  const { images, loading, total } = data;

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
          <img src={modalBody.largeImageURL} alt={modalBody.tag} width="800" />
        </Modal>
      )}
    </>
  );
};

export default App;

// class App extends Component {
//   state = {
//     q: '',
//     page: 1,
//     images: [],
//     loading: false,
//     error: null,
//     total: 0,
//     modalBody: {},
//     isModalOpen: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { q, page } = this.state;
//     if (q !== prevState.q || page > prevState.page) {
//       this.setState({
//         loading: true,
//         error: false,
//       });

//       try {
//         const data = await getImages(q, page);
//         this.setState(prevState => {
//           return {
//             images: [...prevState.images, ...data.hits],
//             loading: false,
//             total: data.total,
//           };
//         });
//       } catch (error) {
//         this.setState({
//           loading: false,
//           error: error.message,
//         });
//       }
//     }
//   }

//   onSearch = ({ q }) => {
//     this.setState({
//       q,
//       page: 1,
//       images: [],
//     });
//   };

//   loadMore = () => {
//     this.setState(({ page }) => {
//       return {
//         page: page + 1,
//       };
//     });
//   };

//   showModal = modalBody => {
//     this.setState({
//       isModalOpen: true,
//       modalBody,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       isModalOpen: false,
//     });
//   };

//   render() {
//     const { images, loading, total, q, isModalOpen, modalBody } = this.state;
//     const { onSearch, loadMore, showModal, closeModal } = this;

//     return (
//       <>
//         <Searchbar onSubmit={onSearch} />
//         {!loading && !images.length && Boolean(q.length) && (
//           <p>Требуется правильный ввод!</p>
//         )}
//         {loading && <RotatingLines width="100" />}
//         <ImageGallery data={images} onClick={showModal} />
//         {!loading && Boolean(images.length) && images.length < total && (
//           <Button onClick={loadMore} />
//         )}
//         {isModalOpen && (
//           <Modal onClose={closeModal}>
//             <img
//               src={modalBody.largeImageURL}
//               alt={modalBody.tag}
//               width="800"
//             />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

// export default App;
