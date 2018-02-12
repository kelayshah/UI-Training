import React, { Component } from 'react';
import './tasks.css';
import './common_styles.css';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Header page="task"/>
        <TasksContainer userList={this.props.userList["users"]}/>
      </div>
    );
  }
}

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      pageActive: this.props.page,
    };
  }

  render(){
    
    const addBtn = this.state.pageActive=="task"?<button id="head-add-task-btn">Add Task</button>:<button id="add-user-btn">Add User</button>;

    return (
        <header>
          <Menu/>
          <section className="main-heading">
            <img id="logo" src={require("./logo.jpg")}/>
            <span id="headname"> easyCollab </span>
          </section>

          {addBtn}
        </header>
      );
  } 
}

class Menu extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
         <nav className="menu">
          <a className="btn-menu home-head" href="index.html">Home</a>
          <a className="btn-menu tasks-head" href="tasks.html">Tasks</a>
          <a className="btn-menu users-head" href="users.html">Users</a>
        </nav>  
      );
  }
}

class TasksContainer extends Component{
  constructor(props){
    super(props);
  }

  render(){

    const userTasks = [];
    const userList = this.props.userList;
    let usersDivs = [];
    Object.keys(userList).forEach(function(userId){
      usersDivs.push(<User userDetails={userList[userId]}/>);
    });

    return (
        <div id="body-content">
            {usersDivs}
        </div>
      );
  } 
}

class User extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const user = this.props.userDetails;
    const taskList = user["tasks"];
    let tasksDivs = [];
    Object.keys(taskList).forEach(function(taskId){
      tasksDivs.push(<Task taskDetails={taskList[taskId]}/>);
    });

    return (
      <div className="user-column" id={user.user_id}>
        <section className="list-header"> {user.name} </section><button className="add-task-btn">Add Task</button>
             <div className="task-checkboxes">
                <label><input type="checkbox" className="display-task-todo" checked/>Todo</label>
                <label >
                  <input type="checkbox" className="display-task-doing" checked/>Doing</label>
                 <label >
                  <input type="checkbox" className="display-task-done" checked/>Done</label>
              </div>
            <ul className="task-list" onDragStart={this.props.dragStartHandler}
             onDragOver={this.props.dragStartHandler} onDrop={this.props.dragStartHandler}>
                {tasksDivs}
            </ul>
      </div>
      );
  } 
} 

class Task extends Component{
  constructor(props){
    super(props);

  }

  render(){
    const taskToAdd = this.props.taskDetails;
    //console.log("task to add",taskToAdd);
    //debugger;
    let classTask = "task " + taskToAdd.status + " pri- " + taskToAdd.priority;

    return (
      <li className="item-task" id={taskToAdd.task_id} draggable="true">
          <div className={classTask}>
              <section className="task-name">{taskToAdd.task_name}</section>
              <ul className="task-details">
                <li className="edit-del-task"><button className="edit-task-btn">Edit</button>
                <button className="del-task-btn">Delete</button></li>
                
                <li id="task-priority">Priority: {taskToAdd.priority} </li>
              </ul>
          </div>
      </li>
      );
  } 
}

//class 

export default App;

//<li id="task-deadline">Deadline: {controller.getDateString({taskToAdd.deadline})} </li>
