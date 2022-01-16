import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
    addDoc, serverTimestamp, query,
    orderBy,
    getDoc
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDfm77Ru_ocbAhpAw1h5d8qQMZlSbDAjNU",
  authDomain: "to-do-5e.firebaseapp.com",
  projectId: "to-do-5e",
  storageBucket: "to-do-5e.appspot.com",
  messagingSenderId: "27566996647",
  appId: "1:27566996647:web:32a30eff02147ad5bcef82",
  measurementId: "G-M8ZD8V603B"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'tasks')

//ordering
const q = query(colRef, orderBy('createdAt'))

onSnapshot(q, (snapshot) => {
    let tasks = []
    snapshot.docs.forEach(doc => {
      tasks.push({ ...doc.data(), id: doc.id })
    })
    console.log(tasks)    
})

// adding docs
const addTaskForm = document.querySelector('.addTask')
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    mytask: addTaskForm.task.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
    addTaskForm.reset()
  })
})




