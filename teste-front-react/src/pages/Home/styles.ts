import styled, { css } from 'styled-components';
import {
  Paper,
  InputBase,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

interface ContainerProps {
  fitScreen?: boolean;
  centralizeItems?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  padding: 24px;

  ${props =>
    props.fitScreen &&
    css`
      height: 100vh;
    `}

  ${props =>
    props.centralizeItems &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `}
`;

export const FormContainer = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
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

export const VideoCard = styled(Card)`
  width: 100%;
  height: fit-content;

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

export const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  text-decoration: none;
`;
