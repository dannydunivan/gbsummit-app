import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/tokens.css';
import './styles/global.css';
import './styles/app.css';
import { App } from './App';
import { AnnouncementsProvider } from './state/announcements';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnnouncementsProvider>
        <App />
      </AnnouncementsProvider>
    </BrowserRouter>
  </StrictMode>,
);
