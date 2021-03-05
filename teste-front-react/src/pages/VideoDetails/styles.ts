import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ErrorMessageContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    max-width: 240px;
    width: 100%;

    @media (min-width: 769px) {
      max-width: 360px;
    }
  }

  & > strong {
    font-size: 1.5em;
  }

  & > strong,
  & > span {
    text-align: center;
    margin-top: 12px;
    max-width: 240px;
  }

  & > button {
    margin-top: 12px;

    & a {
      text-decoration: none;
    }
  }
`;

export const BackLink = styled(Link)`
  color: inherit;
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  max-width: 854px;
  width: 100%;
  padding: 12px;
  margin: 0 auto;

  @media (min-width: 769px) {
    margin-top: 12px;
  }
`;

export const VideoPlayerContainer = styled.div`
  width: 100%;
  height: 164px;

  & > iframe {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 769px) {
    height: 480px;
  }
`;

export const VideoMetaContainer = styled(Paper)`
  width: 100%;
  margin: 12px 0;
  padding: 12px;

  display: flex;
  align-items: flex-start;

  & > h5 {
    flex: 1;
  }
`;

export const VideoInteractionCounters = styled.div`
  margin-left: 12px;
  display: flex;
  align-items: center;
`;

export const VideoStatistics = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 6px;
  }

  & + div {
    margin-left: 12px;
  }
`;

export const VideoDescription = styled.p`
  font-size: 12px;

  @media (min-width: 769px) {
    font-size: 14px;
  }
`;
