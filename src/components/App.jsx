import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPhoto } from './api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyle';
import toast, { Toaster } from 'react-hot-toast';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { nanoid } from 'nanoid';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tagImageAlt, setTagImageAlt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [availablePages, setAvailablePages] = useState(0);
  const [lastQueryId, setLastQueryId] = useState('');
  const [currentQueryId, setCurrentQueryId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (query.trim() === '' || lastQueryId === currentQueryId) {
          return;
        }

        const initialImages = await fetchPhoto(query, page);
        const { hits, totalHits } = initialImages;

        if (hits.length > 0) {
          setImages(prevState => [...prevState, ...hits]);
          setAvailablePages(Math.ceil(totalHits / per_page));
          toast.success('Successfully found!');
        } else {
          toast.error(
            'Nothing found. Check the correctness of the search word.'
          );
        }
      } catch (error) {
        setError({ error });
      } finally {
        setIsLoading(false);
      }
    };
    const cleanup = () => {
      setIsLoading(false);
    };

    if (query.trim() !== '') {
      fetchData();
    }
    return cleanup;
  }, [query, page, per_page, lastQueryId, currentQueryId]);

  const handleFormSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setLastQueryId(currentQueryId);
    setCurrentQueryId(nanoid());
  };
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  const handleOpenModal = image => {
    setShowModal(true);
    setTagImageAlt(image.tags);
    setLargeImageURL(image.largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setTagImageAlt('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {error && <h1>{error.message}</h1>}

      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={handleOpenModal} />
      )}
      {page !== availablePages && images.length >= 11 && !error && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      {showModal && (
        <Modal onCloseModal={handleCloseModal}>
          <img src={largeImageURL} alt={tagImageAlt} />
        </Modal>
      )}
      {error && (
        <b>Oops! Something went wrong! Please try reloading this page! 🥹</b>
      )}
      <GlobalStyle />
      <Toaster />
    </div>
  );
};
