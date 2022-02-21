import './App.css';
import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import DenseTable from './components/DenseTable'

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <h1>Project ESG</h1>
      <DenseTable />
    </FirestoreProvider>
  );
}

export default App;
