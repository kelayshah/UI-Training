import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let userList = {
	users: {
		"user1" :{
			"user_id": "user1",
			"name": "Kelay Shah",
			"tasks": {
				"task1" : {
					"task_id": "task1",
					"status": "todo",
					"priority": "high",
					"task_name": "Read react",
					"deadline": "2018-05-01"
				},
				"task2" : {
					"task_id": "task2",
					"status": "doing",
					"priority": "high",
					"task_name": "Implement react",
					"deadline": "2018-06-01"
				}
			}
		},
		"user2" :{
			"user_id": "user2",
			"name": "Kavya Sharma",
			"tasks": {
				"task3" : {
					"task_id": "task3",
					"status": "todo",
					"priority": "normal",
					"task_name": "Read bootstrap",
					"deadline": "2018-05-01"
				},
				"task4" : {
					"task_id": "task4",
					"status": "done",
					"priority": "high",
					"task_name": "Implement bootstrap",
					"deadline": "2018-06-01"
				}
			}
		}
	}
};

let controller = {

			init : function(){
				ReactDOM.render(<App userList={userList}/>, document.getElementById('root'));
			},

			monthNames: ["January", "February", "March", "April", "May", "June",
	  				"July", "August", "September", "October", "November", "December"
				],

			getDateString : function(dateNumber){
				let date = new Date(dateNumber),
					dateString = this.monthNames[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
				return dateString;
			},

			getUserList: function(){
				let userList = localStorage.getItem("users");
				if(!userList){
					userList = {};
				}
				return userList;
			},

			setUserList: function(userList){
				let userListString = JSON.stringify(userList);
				localStorage.setItem("users",userListString);
			},

			getUser: function(userId){
				let userList = this.getUserList();
				return userList[userId];
			},

			setUser: function(userId){

			},

			getTasksOfUser: function(userId){
				let user = this.getUser(userId);
				return user["tasks"];
			},

			setTasksOfUser: function(){

			}
	};

controller.init();

export default controller;
registerServiceWorker();


