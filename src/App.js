import './App.css';
import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
// import DenseTable from './components/DenseTable'
import Table from './components/Table'
import SearchAppBar from './components/SearchBarApp';

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <SearchAppBar />
      <Table />
    </FirestoreProvider>
  );
}

export default App;
