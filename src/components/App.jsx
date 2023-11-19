import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPhoto } from './api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyle';
import toast, { Toaster } from 'react-hot-toast';
import { animateScroll as scroll } from 'react-scroll';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const generateRandomIndex = () => Math.random();
export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    per_page: 12,
    isLoading: false,
    error: false,
    showModal: false,
    largeImageURL: '',
    tagImageAlt: '',
    availablePages: 0,
    randomIndex: generateRandomIndex(),
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, per_page, randomIndex } = this.state;
    if (
      prevState.query !== query ||
      prevState.page !== page ||
      prevState.randomIndex !== randomIndex
    ) {
      try {
        this.setState({ isLoading: true, error: false });
        const initialImages = await fetchPhoto(query, page);
        const { hits, totalHits } = initialImages;

        if (hits.length > 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            availablePages: Math.ceil(totalHits / per_page),
          }));

          toast.success('Successfully found!');
        } else {
          toast.error(
            'Nothing found. Check the correctness of the search word.'
          );
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleFormSubmit = newQuery => {
    this.setState(prevState => ({
      query: newQuery,
      page: 1,
      images: [],
      randomIndex: generateRandomIndex(),
    }));
  };
  handleLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        scroll.scrollToBottom();
      }
    );
  };
  handleOpenModal = image => {
    const { largeImageURL, tags } = image;
    this.setState({
      showModal: true,
      largeImageURL,
      tagImageAlt: tags,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
      tagImageAlt: '',
    });
  };

  render() {
    const {
      page,
      availablePages,
      images,
      showModal,
      largeImageURL,
      tagImageAlt,
      isLoading,
      error,
    } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}

        {error && <h1>{error.message}</h1>}
        <ImageGallery images={images} onOpenModal={this.handleOpenModal} />

        {page !== availablePages && images.length >= 11 && !error && (
          <LoadMoreBtn onLoadMore={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal onCloseModal={this.handleCloseModal}>
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
  }
}
