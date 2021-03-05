import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import VideoDetails from '../pages/VideoDetails';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/video/:videoId" component={VideoDetails} />
    </Switch>
  );
};

export default Routes;
