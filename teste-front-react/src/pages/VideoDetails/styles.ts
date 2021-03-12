import styled, { css, keyframes } from 'styled-components';
import { Accordion, AppBar, Paper, Typography } from '@material-ui/core';

interface VideoMetaContainerProps {
  animationdelay?: number;
}

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

const appearFromUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedAppBar = styled(AppBar)`
  animation: ${appearFromUp} 0.5s;
`;

export const AppBarTitle = styled.h1`
  font-size: 1em;
  margin-left: 12px;

  @media (min-width: 769px) {
    font-size: 1.2em;
  }
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

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const VideoTitle = styled(Typography)`
  animation: ${appearFromLeft} 0.8s;
  animation-delay: 0.2s;
  animation-fill-mode: backwards;
`;

export const VideoPlayerContainer = styled.div`
  width: 100%;
  height: 164px;
  margin-top: 12px;

  animation: ${appearFromLeft} 0.8s;
  animation-delay: 0.4s;
  animation-fill-mode: backwards;

  & > iframe {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 769px) {
    height: 480px;
  }
`;

export const VideoMetaContainer = styled(Paper)<VideoMetaContainerProps>`
  width: 100%;
  margin: 12px 0;
  padding: 12px;

  animation: ${appearFromLeft} 0.8s;
  animation-fill-mode: backwards;

  ${props =>
    props.animationdelay &&
    css`
      animation-delay: ${props.animationdelay}s;
    `}

  display: flex;
  align-items: flex-start;

  & > h5 {
    flex: 1;
    display: flex;
    align-items: center;
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

export const VideoDescriptionAccordion = styled(Accordion)`
  animation: ${appearFromLeft} 0.8s;
  animation-delay: 0.8s;
  animation-fill-mode: backwards;
`;

export const VideoDescription = styled.p`
  font-size: 12px;

  @media (min-width: 769px) {
    font-size: 14px;
  }
`;
