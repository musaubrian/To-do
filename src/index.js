import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
    addDoc, serverTimestamp, query,
    orderBy
} from "firebase/firestore"
import { firebaseConfig } from "./firebaseConfig";

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
var tbody = document.getElementById('list-task');

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