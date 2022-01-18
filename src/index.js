import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
    addDoc, serverTimestamp, query,
    orderBy,
    getDoc,
    getDocs
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
      tasks.push(doc.data(tasks))
      AddAllItems(tasks)
    })
    console.log(tasks)    
})

// adding docs
const addTaskForm = document.querySelector('.addTask')
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    task: addTaskForm.task.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
    addTaskForm.reset()
  })
})

//adding to table
var tbody = document.getElementById('task');

function AddItem(task) {
  let trow = document.createElement("trow");
  let td = document.createElement('td');

  td.innerHTML = task;
  trow.appendChild(td)

  tbody.appendChild(trow)
}

function AddAllItems(tasks) {
  tbody.innerHTML = "";
  tasks.forEach(element => {
    AddItem(element.task);
  });
}

// //getting documents
// async function getAllDataOnce(){
//   const querySnapshot = await getDocs(colRef);
//   var tasks = [];
//   querySnapshot.forEach(doc => {
//     tasks.push(doc.data(mytask));
//   });
//   AddAllItems(tasks);
// }

// window.onload = getAllDataOnce;





