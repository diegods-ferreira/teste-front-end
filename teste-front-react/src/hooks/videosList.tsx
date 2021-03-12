import React, { createContext, useCallback, useContext, useState } from 'react';

export interface Video {
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
  key: string;
}

interface VideosListContextData {
  videosList: Video[];
  searchedTerm: string;
  nextPageToken: string;
  setNewVideosList(videos: Video[]): void;
  addVideos(videos: Video[]): void;
  updateSearchedTerm(term: string): void;
  updateNextPageToken(token: string): void;
}

const VideosListContext = createContext<VideosListContextData>(
  {} as VideosListContextData,
);

const VideosListProvider: React.FC = ({ children }) => {
  const [videosList, setVideosList] = useState<Video[]>([]);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');

  const setNewVideosList = useCallback((videos: Video[]) => {
    setVideosList(videos);
  }, []);

  const addVideos = useCallback((videos: Video[]) => {
    setVideosList(prevState => [...prevState, ...videos]);
  }, []);

  const updateSearchedTerm = useCallback((term: string) => {
    setSearchedTerm(term);
  }, []);

  const updateNextPageToken = useCallback((token: string) => {
    setNextPageToken(token);
  }, []);

  return (
    <VideosListContext.Provider
      value={{
        videosList,
        searchedTerm,
        nextPageToken,
        setNewVideosList,
        addVideos,
        updateSearchedTerm,
        updateNextPageToken,
      }}
    >
      {children}
    </VideosListContext.Provider>
  );
};

function useVideosList(): VideosListContextData {
  const context = useContext(VideosListContext);

  if (!context) {
    throw new Error('useVideosList must be used within a VideosListProvider');
  }

  return context;
}

export { VideosListProvider, useVideosList };
