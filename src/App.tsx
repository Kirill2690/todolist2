import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";



type TodolistsType={
    id: string
    title: string
    filter: FilterValuesType

}
type TasksType={
    [key:string]:Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists,setTodolists]=useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter:'all'},
        {id: todolistID2, title: "What to buy", filter: 'all'},
    ])


    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Butter", isDone: false},

        ],

});
const removeTodolist  = (todolistID:string) => {
  setTodolists(todolists.filter(el=>el.id!==todolistID))
    delete tasks[todolistID]
}

    function removeTask(todolistID:string,taskID: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el=>el.id!==taskID)});
    }

    function addTask(todolistID:string,title: string) {
        let newTask={id: v1(), title: title, isDone: true};
        setTasks({...tasks,[todolistID]:[newTask,...tasks[todolistID]]})
    }
    function changeStatus(todolistID:string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId ? {...el,isDone:isDone}:el)});

    }



//dhsdhscbshjbc

    function changeFilter(todolistID:string,value: FilterValuesType) {
    setTodolists(todolists.map((el)=>el.id===todolistID?{...el,filter:value}:el))
    }


    return (
        <div className="App">
            {todolists.map((el)=> {
                let tasksForTodolist=tasks[el.id];
                if(el.filter==='active'){
                    tasksForTodolist=tasks[el.id].filter(t=>t.isDone===false);
                }
                if (el.filter==='completed'){
                    tasksForTodolist=tasks[el.id].filter(t=>t.isDone===true);
                }
                return(
                    <Todolist
                        todolistID={el.id}
                        key={el.id}
                                    title={el.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={el.filter}
                        removeTodolist={removeTodolist}
            />)


            })}

        </div>
    );
}

export default App;
