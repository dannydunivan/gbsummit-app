import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { TabBar } from './components/TabBar';
import { Home } from './routes/Home';
import { Schedule } from './routes/Schedule';
import { Info } from './routes/Info';
import { SessionDetail } from './routes/SessionDetail';
import { SpeakerDetail } from './routes/SpeakerDetail';
import { Breakouts } from './routes/Breakouts';
import { Dining } from './routes/Dining';
import { Sponsors } from './routes/Sponsors';
import { Maps } from './routes/Maps';
import { NextSteps } from './routes/NextSteps';
import { Contact } from './routes/Contact';
import { NotFound } from './routes/NotFound';

export function App() {
  const location = useLocation();

  // Scroll to top on route change (each screen is its own page).
  useEffect(() => {
    document.querySelector('.app-main')?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/info" element={<Info />} />
          <Route path="/session/:id" element={<SessionDetail />} />
          <Route path="/speaker/:id" element={<SpeakerDetail />} />
          <Route path="/breakouts" element={<Breakouts />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/next-steps" element={<NextSteps />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <TabBar />
    </div>
  );
}
