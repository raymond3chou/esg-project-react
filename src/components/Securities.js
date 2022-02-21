import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useFirestoreCollectionData, useFirestore } from 'reactfire';

export default function Securities() {

    // set up query
    const firestore = useFirestore();
    const securitiesCollection = collection(firestore, 'Securities');
    // const securitiesQuery = query(securitiesCollection, orderBy('Short Name', 'asc'), limit(100));
    const securitiesQuery = query(securitiesCollection, orderBy('Short Name', 'asc'))
    // ReactFire!
    const { status, data: securities } = useFirestoreCollectionData(securitiesQuery, {
      idField: 'id', // this field will be added to the object created from each document
    });
  
    // easily check the loading status
    if (status === 'loading') {
      return [];
    }
    return securities;
  }