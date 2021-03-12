import styled, { css, keyframes } from 'styled-components';
import {
  Paper,
  InputBase,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';

interface ColoredBackgroundProps {
  animate?: boolean;
}

interface FormContainerProps {
  animate?: boolean;
}

const coloredBackgroundAnimation = keyframes`
  from {
    background: #3f51b5;
  }
  to {
    background: #323b71;
  }
`;

const coloredBackgroundSubmitAnimation = keyframes`
  from {
    background: #3f51b5;
  }
  to {
    background: #ebebeb;
  }
`;

export const ColoredBackground = styled.div<ColoredBackgroundProps>`
  width: 100%;
  min-height: 100vh;
  animation: ${coloredBackgroundAnimation} 5s;
  animation-direction: alternate;
  animation-iteration-count: infinite;

  ${props =>
    props.animate &&
    css`
      animation: ${coloredBackgroundSubmitAnimation} 1s;
      animation-direction: normal;
      animation-iteration-count: unset;
    `}
`;

export const Container = styled.div`
  width: 100%;
  padding: 24px;
`;

const formAppearanceAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const formSubmitAnimation = keyframes`
  from {
    margin-top: calc(50vh - 48px);
  }
  to {
    margin-top: 0;
  }
`;

export const FormContainer = styled.div<FormContainerProps>`
  width: 100%;
  height: fit-content;
  margin-top: calc(50vh - 48px);

  animation: ${formAppearanceAnimation} 0.5s;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.animate &&
    css`
      animation: ${formSubmitAnimation} 0.5s forwards;
    `}
`;

export const Form = styled(Paper)`
  max-width: 560px;
  width: 100%;

  display: flex;
`;

export const StyledInputBase = styled(InputBase)`
  flex: 1;
  margin-left: 12px;
`;

export const NoVideoFoundContainer = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  & > img {
    max-width: 240px;
    width: 100%;

    @media (min-width: 769px) {
      max-width: 360px;
    }
  }

  & > strong,
  & > span {
    text-align: center;
    margin-top: 12px;
    max-width: 220px;
  }
`;

export const VideoCardsContainer = styled.div`
  flex: 1;
  max-width: 1200px;
  margin-top: 12px;

  @media (min-width: 769px) {
    margin: 24px auto 0px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
  }
`;

const videoCardAppearanceAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const VideoCard = styled(Card)`
  width: 100%;
  height: fit-content;

  animation: ${videoCardAppearanceAnimation} 0.2s;

  & + div {
    margin-top: 12px;

    @media (min-width: 769px) {
      margin-top: 0;
    }
  }
`;

export const VideoCardMedia = styled(CardMedia)`
  height: 160px;

  @media (min-width: 993px) {
    height: 200px;
  }
`;

export const VideoCardContent = styled(CardContent)`
  height: 135px;

  & > h1 {
    max-width: 100%;
    font-size: 18px;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  & > h2 {
    max-width: 100%;
    font-size: 14px;
    margin-bottom: 12px;
  }

  & > p {
    max-width: 100%;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
`;
