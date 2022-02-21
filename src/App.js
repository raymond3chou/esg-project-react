import './App.css';

import { initializeFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { useInitFirestore, FirestoreProvider, AnalyticsProvider, useAnalytics, useFirebaseApp } from 'reactfire';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

// import DenseTable from './components/DenseTable'
import Table from './components/Table'
import SearchAppBar from './components/SearchBarApp';
import CircularProgress from '@mui/material/CircularProgress';

function MyPageViewLogger() {
  const analytics = useAnalytics();
  const location = useLocation()
  // By passing `location.pathname` to the second argument of `useEffect`,
  // we only log on first render and when the `pathname` changes
  useEffect(() => {
    logEvent(analytics, 'page_view', { page_location: location.pathname });
  }, [location.pathname]);

  return null;
}

export default function App() {
  const { status, data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    const db = initializeFirestore(firebaseApp, {});
    await enableIndexedDbPersistence(db);
    return db;
  });
  const app = useFirebaseApp();
  // firestore init isn't complete yet
  if (status === 'loading') {
    return <CircularProgress />;
  }

  // pass the Firestore instance to FirestoreProvider
  // now we can be sure that any child of FirestoreProvider
  // has a fully initialized Firestore instance with
  // indexedDbPersistence enabled
  return (
    <AnalyticsProvider sdk={getAnalytics(app)}>
      <FirestoreProvider sdk={firestoreInstance}>
        <SearchAppBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Table />} />
          </Routes>
          <MyPageViewLogger />
        </BrowserRouter>
      </FirestoreProvider>
    </AnalyticsProvider>

  );
}
