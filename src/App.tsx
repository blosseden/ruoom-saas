import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRouter } from '@/routes';
import { RecoilRoot } from 'recoil';

import './App.css';

const App: FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <AppRouter />
      </Router>
    </RecoilRoot>
  );
};

export default App;
