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
import { useHistory } from 'react-router-dom';
import { Search } from '@material-ui/icons';

import youtubeApi from '../../services/youtubeApi';

import { useVideosList, Video } from '../../hooks/videosList';

import notFoundImg from '../../assets/not-found.png';

import {
  ColoredBackground,
  Container,
  FormContainer,
  Form,
  StyledInputBase,
  NoVideoFoundContainer,
  VideoCardsContainer,
  VideoCard,
  VideoCardMedia,
  VideoCardContent,
} from './styles';

interface YoutubeSearchApiResponse {
  items: Video[];
  nextPageToken: string;
}

const Home: React.FC = () => {
  const {
    videosList,
    searchedTerm,
    nextPageToken,
    setNewVideosList,
    addVideos,
    updateSearchedTerm,
    updateNextPageToken,
  } = useVideosList();

  const history = useHistory();

  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');
  const [formSubmitAnimate, setFormSubmitAnimate] = useState(false);

  const handleSearchTermInputTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateSearchedTerm(event.target.value);
    },
    [updateSearchedTerm],
  );

  const handleCloseSerachErrorSnackbar = useCallback(() => {
    setOpenErrorSnackbar(false);
  }, []);

  const handleSearchFormSubmit = useCallback(
    async (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!searchedTerm) {
        setErrorSnackbarMessage('É preciso preencher o campo de pesquisa');
        setOpenErrorSnackbar(true);
        return;
      }

      setFormSubmitAnimate(true);
      setIsLoading(true);

      try {
        const response = await youtubeApi.get<YoutubeSearchApiResponse>(
          '/search',
          {
            params: {
              part: 'id,snippet',
              type: 'video',
              q: searchedTerm,
              maxResults: 9,
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
            },
          },
        );

        setNewVideosList(
          response.data.items.map(video => ({
            ...video,
            key: video.id.videoId,
          })),
        );

        updateNextPageToken(response.data.nextPageToken);

        setIsSearched(true);
      } catch (err) {
        setErrorSnackbarMessage('Erro ao pesquisar');
        setOpenErrorSnackbar(true);
        console.log(err.response.data);
      } finally {
        setIsLoading(false);
      }
    },
    [searchedTerm, setNewVideosList, updateNextPageToken],
  );

  const handleScroll = useCallback(async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await youtubeApi.get<YoutubeSearchApiResponse>(
        '/search',
        {
          params: {
            part: 'id,snippet',
            type: 'video',
            q: searchedTerm,
            maxResults: 9,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            pageToken: nextPageToken,
          },
        },
      );

      addVideos(
        response.data.items.map(video => ({
          ...video,
          key: `${nextPageToken}__${video.id.videoId}`,
        })),
      );

      updateNextPageToken(response.data.nextPageToken);

      setIsSearched(true);
    } catch (err) {
      setErrorSnackbarMessage('Erro ao pesquisar');
      setOpenErrorSnackbar(true);
      console.log(err.response.data);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, searchedTerm, nextPageToken, addVideos, updateNextPageToken]);

  const handleNavigateToVideoDetails = useCallback(
    (videoId: string) => {
      history.push(`/video/${videoId}`);
    },
    [history],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsSearched(!!videosList.length);
  }, [videosList]);

  useEffect(() => {
    setFormSubmitAnimate(isSearched);
  }, [isSearched]);

  return (
    <ColoredBackground animate={formSubmitAnimate}>
      <Container>
        <FormContainer animate={formSubmitAnimate}>
          <Form component="form" onSubmit={handleSearchFormSubmit}>
            <StyledInputBase
              placeholder="Pesquisar"
              onChange={handleSearchTermInputTextChange}
              defaultValue={searchedTerm}
            />
            <IconButton type="submit" aria-label="search">
              <Search />
            </IconButton>
          </Form>
        </FormContainer>

        {isSearched && !videosList.length && (
          <NoVideoFoundContainer>
            <img src={notFoundImg} alt="Not found" />
            <strong>Não encontramos vídeos com o termo buscado.</strong>
            <span>Utilize outras palavras-chave.</span>
          </NoVideoFoundContainer>
        )}

        {isSearched && !!videosList.length && (
          <VideoCardsContainer>
            {videosList.map(video => (
              <VideoCard key={video.key}>
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
                  <Button
                    size="small"
                    color="primary"
                    variant="text"
                    onClick={() => {
                      handleNavigateToVideoDetails(video.id.videoId);
                    }}
                  >
                    Detalhes do video
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
    </ColoredBackground>
  );
};

export default Home;
