import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Backdrop,
  Button,
  CardActions,
  CircularProgress,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import youtubeApi from '../../services/youtubeApi';

import notFoundImg from '../../assets/not-found.png';

import {
  Container,
  FormContainer,
  Form,
  StyledInputBase,
  NoVideoFoundContainer,
  VideoCardsContainer,
  VideoCard,
  VideoCardMedia,
  VideoCardContent,
  StyledLink,
} from './styles';

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface YoutubeSearchApiResponse {
  items: Video[];
  nextPageToken: string;
}

const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');

  const handleSearchTermInputTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    [],
  );

  const handleCloseSerachErrorSnackbar = useCallback(() => {
    setOpenErrorSnackbar(false);
  }, []);

  const handleSearchVideos = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await youtubeApi.get<YoutubeSearchApiResponse>(
        '/search',
        {
          params: {
            part: 'id,snippet',
            q: searchTerm,
            maxResults: 9,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            ...(nextPageToken ? { pageToken: nextPageToken } : {}),
          },
        },
      );

      if (nextPageToken) {
        setVideos(prevState => [...prevState, ...response.data.items]);
      } else {
        setVideos(response.data.items);
      }

      setNextPageToken(response.data.nextPageToken);
      setIsSearched(true);
    } catch (err) {
      setErrorSnackbarMessage('Erro ao pesquisar');
      setOpenErrorSnackbar(true);
      console.log(err.response.data);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, nextPageToken]);

  const handleSearchFormSubmit = useCallback(
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!searchTerm) {
        setErrorSnackbarMessage('É preciso preencher o campo de pesquisa');
        setOpenErrorSnackbar(true);
        return;
      }

      handleSearchVideos();
    },
    [searchTerm, handleSearchVideos],
  );

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }

    handleSearchVideos();
  }, [handleSearchVideos, isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <Container fitScreen={!isSearched} centralizeItems={!isSearched}>
        <FormContainer>
          <Form component="form" onSubmit={handleSearchFormSubmit}>
            <StyledInputBase
              placeholder="Pesquisar"
              onChange={handleSearchTermInputTextChange}
            />
            <IconButton type="submit" aria-label="search">
              <Search />
            </IconButton>
          </Form>
        </FormContainer>

        {isSearched && !videos.length && (
          <NoVideoFoundContainer>
            <img src={notFoundImg} alt="Not found" />
            <strong>Não encontramos vídeos com o termo buscado.</strong>
            <span>Utilize outras palavras-chave.</span>
          </NoVideoFoundContainer>
        )}

        {isSearched && !!videos.length && (
          <VideoCardsContainer>
            {videos.map(video => (
              <VideoCard key={video.id.videoId}>
                <VideoCardMedia
                  image={video.snippet.thumbnails.high.url}
                  title={video.snippet.title}
                />

                <VideoCardContent>
                  <h1>{video.snippet.title}</h1>
                  <h2>{video.snippet.channelTitle}</h2>
                  <p>{video.snippet.description}</p>
                </VideoCardContent>

                <CardActions>
                  <Button size="small" color="primary" variant="text">
                    <StyledLink to={`/video/${video.id.videoId}`}>
                      Detalhes do video
                    </StyledLink>
                  </Button>
                </CardActions>
              </VideoCard>
            ))}
          </VideoCardsContainer>
        )}
      </Container>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSerachErrorSnackbar}
        message={errorSnackbarMessage}
        key={new Date().getTime()}
      />

      <Backdrop style={{ zIndex: 1 }} open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default Home;
