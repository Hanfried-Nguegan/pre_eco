import { useMemo, useState } from 'react';
import { Container, Theme } from './settings/types';
import { BottomNavbar } from './components/generated/BottomNavbar';
import { SchedulePickup } from './components/generated/SchedulePickup';

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'centered';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'schedule'>('home');

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    if (currentPage === 'schedule') {
      return <SchedulePickup onBack={() => setCurrentPage('home')} />;
    }
    return <BottomNavbar onNavigateToSchedule={() => setCurrentPage('schedule')} />; // %EXPORT_STATEMENT%
  }, [currentPage]);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
      </div>
    );
  } else {
    return generatedComponent;
  }
}

export default App;