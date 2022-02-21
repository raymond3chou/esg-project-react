import logo from './logo.svg';
import './App.css';
import { doc, getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirestoreDocData, useFirestore, useFirebaseApp } from 'reactfire';

function BurritoTaste() {
  // easily access the Firestore library
  const burritoRef = doc(useFirestore(), 'Securities', 'A US Equity');
  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(burritoRef);
  // easily check the loading status
  if (status === 'loading') {
    return <p>Fetching burrito flavor...</p>;
  }
  // return <p>The burrito is CINDY{data['Short Name']}!</p>;
  return <p>The burrito is CINDY</p>;

}

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <h1>🌯</h1>
      <BurritoTaste />
    </FirestoreProvider>
  );
}

export default App;
