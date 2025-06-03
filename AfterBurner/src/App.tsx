import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/view/page/MainPage.tsx';
import Joyride from 'react-joyride';
import { useState, useEffect } from 'react';

function App() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('onboarding:done');
    if (!hasSeen) {
      setRun(true);
    }
  }, []);

  const steps = [
    {
      target: '#chamber',
      content: 'Chamber는 Spark의 폴더입니다. 번쩍이는 아이디어를 모아보세요!',
      disableBeacon: true,
    },
    {
        target: '#spark',
        content: 'Spark는 노트입니다. 번쩍이는 새로운 아이디어를 기록해보세요!',
    },
    {
      target: '#editor-content',
      content: '연료를 채우세요! Spark를 작성하고, 편집하고, 공유하세요.',
    },
  ];

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        showProgress
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#FF5500',
          },
        }}
        callback={(data) => {
          if (data.status === 'finished' || data.status === 'skipped') {
            localStorage.setItem('onboarding:done', 'true');
          }
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
