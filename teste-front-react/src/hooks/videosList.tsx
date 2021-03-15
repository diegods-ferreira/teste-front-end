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
  const [videosList, setVideosList] = useState<Video[]>(() => {
    const storagedVideos = sessionStorage.getItem('@Teste_iCasei/videos-list');

    if (storagedVideos) {
      return JSON.parse(storagedVideos);
    }

    return [];
  });

  const [searchedTerm, setSearchedTerm] = useState(() => {
    const storagedSearchedTerm = sessionStorage.getItem(
      '@Teste_iCasei/searched-term',
    );

    return storagedSearchedTerm || '';
  });

  const [nextPageToken, setNextPageToken] = useState(() => {
    const storagedNextPageTokenn = sessionStorage.getItem(
      '@Teste_iCasei/next-page-token',
    );

    return storagedNextPageTokenn || '';
  });

  const setNewVideosList = useCallback((videos: Video[]) => {
    setVideosList(videos);

    sessionStorage.setItem('@Teste_iCasei/videos-list', JSON.stringify(videos));
  }, []);

  const addVideos = useCallback((videos: Video[]) => {
    setVideosList(prevState => [...prevState, ...videos]);

    const storagedVideos = sessionStorage.getItem('@Teste_iCasei/videos-list');

    if (!storagedVideos) {
      sessionStorage.setItem(
        '@Teste_iCasei/videos-list',
        JSON.stringify(videos),
      );

      return;
    }

    const parsedStoragedVideos = JSON.parse(storagedVideos);

    sessionStorage.setItem(
      '@Teste_iCasei/videos-list',
      JSON.stringify([...parsedStoragedVideos, ...videos]),
    );
  }, []);

  const updateSearchedTerm = useCallback((term: string) => {
    setSearchedTerm(term);

    sessionStorage.setItem('@Teste_iCasei/searched-term', term);
  }, []);

  const updateNextPageToken = useCallback((token: string) => {
    setNextPageToken(token);

    sessionStorage.setItem('@Teste_iCasei/next-page-token', token);
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
