import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  ExpandMore as ExpandMoreIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from '@material-ui/icons';

import youtubeApi from '../../services/youtubeApi';

import notFoundImg from '../../assets/not-found.png';

import {
  ErrorMessageContainer,
  BackLink,
  Container,
  VideoPlayerContainer,
  VideoMetaContainer,
  VideoInteractionCounters,
  VideoStatistics,
  VideoDescription,
} from './styles';

interface RouteParams {
  videoId: string;
}

interface Video {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    description: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
  };
}

interface YoutubeApiResponse {
  items: Video[];
}

const VideoDetails: React.FC = () => {
  const { videoId } = useParams<RouteParams>();

  const [video, setVideo] = useState<Video>({} as Video);
  const [displayVideoInfo, setDisplayVideoInfo] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const fetchVideoInfoFromYoutubeApi = useCallback(async () => {
    setDisplayVideoInfo(false);

    try {
      const response = await youtubeApi.get<YoutubeApiResponse>('/videos', {
        params: {
          id: videoId,
          part: 'snippet,statistics',
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      });

      if (response.data) {
        setVideo(response.data.items[0]);
        setDisplayVideoInfo(!!response.data.items[0]);
      }
    } catch (err) {
      setDisplayVideoInfo(false);
      setDisplayErrorMessage(true);
    }
  }, [videoId]);

  const handleToggleDescriptionAccordion = useCallback(
    (_: any, expanded: boolean) => {
      setIsDescriptionExpanded(expanded);
    },
    [],
  );

  useEffect(() => {
    fetchVideoInfoFromYoutubeApi();
  }, [fetchVideoInfoFromYoutubeApi]);

  const videoUrl = useMemo(() => `https://www.youtube.com/embed/${video.id}`, [
    video.id,
  ]);

  if (displayErrorMessage) {
    return (
      <ErrorMessageContainer>
        <img src={notFoundImg} alt="Not found" />
        <strong>Ops...</strong>
        <span>Ocorreu um erro ao carregar os detalhes do vídeo.</span>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchVideoInfoFromYoutubeApi}
        >
          Tentar novamente
        </Button>
        <Button variant="text">
          <Link to="/">Voltar</Link>
        </Button>
      </ErrorMessageContainer>
    );
  }

  if (!displayVideoInfo) {
    return (
      <Backdrop style={{ zIndex: 1 }} open>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="go-back">
            <BackLink to="/">
              <ArrowBackIcon />
            </BackLink>
          </IconButton>
          <Typography variant="subtitle1" noWrap aria-label="video-title">
            {video.snippet.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <VideoPlayerContainer>
          <iframe
            title="youtube-video"
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay;"
            allowFullScreen
          />
        </VideoPlayerContainer>

        <VideoMetaContainer>
          <h5 aria-label="channel-title">{video.snippet.channelTitle}</h5>

          <VideoInteractionCounters>
            <VideoStatistics aria-label="like-count">
              <ThumbUpIcon fontSize="small" color="primary" />
              <Typography variant="caption">
                {video.statistics.likeCount}
              </Typography>
            </VideoStatistics>

            <VideoStatistics aria-label="dislike-count">
              <ThumbDownIcon fontSize="small" color="secondary" />
              <Typography variant="caption">
                {video.statistics.dislikeCount}
              </Typography>
            </VideoStatistics>
          </VideoInteractionCounters>
        </VideoMetaContainer>

        <Accordion
          expanded={isDescriptionExpanded}
          onChange={handleToggleDescriptionAccordion}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2">Descrição</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <VideoDescription>{video.snippet.description}</VideoDescription>
          </AccordionDetails>
        </Accordion>

        <VideoMetaContainer>
          <VideoStatistics aria-label="views-count">
            <RemoveRedEyeIcon fontSize="small" />
            <Typography variant="caption">
              {video.statistics.viewCount}
            </Typography>
          </VideoStatistics>
        </VideoMetaContainer>
      </Container>
    </>
  );
};

export default VideoDetails;
