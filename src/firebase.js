import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBynrmlIuDmcPFLTGT4rIV7aioBQLWElJw",
  authDomain: "crud-react-f7278.firebaseapp.com",
  projectId: "crud-react-f7278",
  storageBucket: "crud-react-f7278.appspot.com",
  messagingSenderId: "470517867436",
  appId: "1:470517867436:web:fc7bd0011d808b99549009"
};

const fireDb = initializeApp(firebaseConfig);
const auth = getAuth(fireDb);
const db = getDatabase(fireDb);

export { fireDb, auth, db };









