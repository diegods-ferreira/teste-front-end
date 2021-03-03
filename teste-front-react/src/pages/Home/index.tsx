import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import axios from 'axios';
import {
  Backdrop,
  Button,
  CardActions,
  CircularProgress,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

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
} from './styles';

interface VideoThumbnail {
  url: string;
}

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    description: string;
    thumbnails: {
      default: VideoThumbnail;
      medium: VideoThumbnail;
      high: VideoThumbnail;
    };
  };
}

interface YoutubeSearchApiResponse {
  items: Video[];
}

const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [ísLoading, setIsLoading] = useState(false);
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

  const handleSearchVideos = useCallback(
    async (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!searchTerm) {
        setErrorSnackbarMessage('É preciso preencher o campo de pesquisa');
        setOpenErrorSnackbar(true);
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.get<YoutubeSearchApiResponse>(
          `https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${searchTerm}&&maxResults=10&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
        );

        setVideos(response.data.items);
        setIsSearched(true);
      } catch (err) {
        setErrorSnackbarMessage('Erro ao pesquisar');
        setOpenErrorSnackbar(true);
        console.log(err.response.data);
      } finally {
        setIsLoading(false);
      }
    },
    [searchTerm],
  );

  return (
    <>
      <Container fitScreen={!isSearched} centralizeItems={!isSearched}>
        <FormContainer>
          <Form component="form" onSubmit={handleSearchVideos}>
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
                  <Button size="small" color="primary">
                    Detalhes do Vídeo
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

      <Backdrop style={{ zIndex: 1 }} open={ísLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default Home;
