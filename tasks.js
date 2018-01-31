let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


/*
-----------------------------------------------------------------------------------
Data (Model)
-----------------------------------------------------------------------------------
*/

let model = {
		tasks: {
				task1: {
					task_id: "task1",
					task_name: "Some task name",
					deadline: "2018-01-31",
					status: "todo",
					priority: "Normal",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user1"
				 },
				 task2: {
					task_id: "task2",
					task_name: "Some task name",
					deadline: "2018-01-31",
					status: "todo",
					priority: "High",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user1"
				 },
				 task3: {
					task_id: "task3",
					task_name: "Some task name is very very very long",
					deadline: "2018-01-31",
					status: "todo",
					priority: "Normal",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user1"
				 },
				 task4: {
					task_id: "task4",
					task_name: "Some task name",
					deadline: "2018-01-31",
					status: "todo",
					priority: "High",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user2"
				 },
				 task5: {
					task_id: "task5",
					task_name: "Some task name",
					deadline: "2018-01-31",
					status: "todo",
					priority: "Normal",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user2"
				 },
				 task6: {
					task_id: "task6",
					task_name: "Some task name",
					deadline: "2018-01-31",
					status: "todo",
					priority: "Normal",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user2"
				 },
				 task7: {
					task_id: "task7",
					task_name: "Some task name",
					deadline: "2018-01-31",
					status: "todo",
					priority: "High",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user3"
				 },
				 task8: {
					task_id: "task8",
					task_name: "Some task name",
					deadline: "2018-01-31",
					status: "todo",
					priority: "Normal",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user3"
				 },
				 task9: {
					task_id: "task9",
					task_name: "Some task name",
					deadline: "2018-01-31",
					status: "todo",
					priority: "Normal",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user3"
				 },
				 task10: {
					task_id: "task10",
					task_name: "Some task name",
					deadline: "2018-01-31",
					status: "todo",
					priority: "Normal",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user3"
				 },
				 task11: {
					task_id: "task11",
					task_name: "Some task name",
					deadline: "2018-01-31",
					status: "todo",
					priority: "High",
					task_description: "This task is related to XYZ. The important thing is that this task is ABC and so DEF.",
					assignee_id: "user3"
				 }
			},

		users : {
			 user1: {
				user_id : "user1",
				name: "User 1",
				role: "Product Engineer",
				email: "abc@def.com",
				skype: "abc",
				image_src: "user.jpeg"
			 },
			 user2: {
			 	user_id : "user2",
				name: "User 2",
				role: "Product Engineer",
				email: "abc@def.com",
				skype: "abc",
				image_src: "user.jpeg"
			 },
			 user3: {
			 	user_id : "user3",
				name: "User 3",
				role: "Product Engineer",
				email: "abc@def.com",
				skype: "abc",
				image_src: "user.jpeg"
			 },
			 user4: {
			 	user_id : "user4",
				name: "User 4",
				role: "Product Engineer",
				email: "abc@def.com",
				skype: "abc",
				image_src: "user.jpeg"
			 },
			 user5: {
			 	user_id : "user5",
				name: "User 5",
				role: "Product Engineer",
				email: "abc@def.com",
				skype: "abc",
				image_src: "user.jpeg"
			 },
			 user6: {
			 	user_id : "user6",
				name: "User 6",
				role: "Product Engineer",
				email: "abc@def.com",
				skype: "abc",
				image_src: "user.jpeg"
			 }
		},

		selectedUserId: "user1",
		taskNum: 12
		};


/*
-----------------------------------------------------------------------------------
Controller (Connects Model and View)
-----------------------------------------------------------------------------------
*/

let controller = {

		init : function(){
			userTasks.init();

			document.getElementById("head-add-task-btn").addEventListener('click',function(event){
				userTasks.showAddTaskForm(false);
				window.location.href = "#add-task-popup";
			},false);

			document.body.addEventListener('click',function(event){
				let target = event.target;
				
				if(target.matches("#view-task-edit")){
					let taskId = target.closest("#view-task-popup").dataset.taskId;
					userTasks.showEditTaskForm(taskId);
					window.location.href = "#edit-task-popup";
				}

				else if(target.matches("#view-task-delete")){
					let taskId = target.closest("#view-task-popup").dataset.taskId;
					if (confirm("Are you sure you want to delete the user?")){
						controller.removeTask(taskId);
						document.location.href = "#";
					}
				}

				else if(target.matches(".add-task-btn")){
					let userId = target.closest(".col-1-4").id;
					model.selectedUserId = userId;
					userTasks.showAddTaskForm(true);
					window.location.href = "#add-task-popup";
				}

				if(!target.closest(".item-task"))
					return;

				let taskId = target.closest(".item-task").id;

				if(target.matches(".edit-task-btn")){
					userTasks.showEditTaskForm(taskId);
					window.location.href = "#edit-task-popup";
				}

				else if(target.matches(".del-task-btn")){
					if (confirm("Are you sure you want to delete the user?")){
						controller.removeTask(taskId);
					}
				}

				else if(target.closest(".task")){
					userTasks.showTaskDetails(taskId);
					window.location.href = "#view-task-popup";
				}

			},false);

			document.body.addEventListener('submit',function(event){
				let target = event.target;
				event.preventDefault();

				if(target.matches("#add-task-form")){
					controller.addNewTask();
				}

				if(target.matches("#edit-task-form")){
					let taskId = target.closest("#edit-task-popup").dataset.taskId;
					controller.editTask(taskId);
				}

			},false);
		},

		dragStartHandler: function(event){
			event.dataTransfer.setData("text/plain", event.target.id);
			event.dataTransfer.dropEffect = "move";
		},

		dragOverHandler: function(event){
			event.preventDefault();
			event.dataTransfer.dropEffect = "move";
		},

		dropHandler: function(event){
			event.preventDefault();
			let movedTaskId = event.dataTransfer.getData("text");
			let newAssignee = event.target.closest(".col-1-4").id;
			model.tasks[movedTaskId].assignee_id = newAssignee;
			event.target.closest(".task-list").appendChild(document.getElementById(movedTaskId));
		},

		getTaskList: function(){
			return model.tasks;
		},

		getSelectedUser: function(){
			return model.selectedUserId;
		},

		getUserList: function(){
			return model.users;
		},

		addNewTask : function(){
			let newTask = {
				task_id: "task"+model.taskNum++, 
				task_name: document.getElementById("new-task-name").value,
				deadline: document.getElementById("new-task-deadline").value,
				status: document.getElementById("new-task-status").value,
				priority: document.getElementById("new-task-priority").value,
				task_description: document.getElementById("new-task-description").value,
				assignee_id: document.getElementById("new-task-assignee").value,
			};

			model.tasks[newTask.task_id] = newTask;
			userTasks.addTaskToView(newTask);
		},

		removeTask: function(taskToDeleteId){
			delete model.tasks[taskToDeleteId];
			userTasks.removeTaskFromView(taskToDeleteId);
		},

		editTask: function(taskToEditId){
			let taskToEdit = model.tasks[taskToEditId];
			
			let oldStatus = taskToEdit.status;
			let oldPriority = taskToEdit.priority;
			let oldAssignee = taskToEdit.assignee_id;

			taskToEdit.task_name = document.getElementById("edit-task-name").value;
			taskToEdit.deadline = document.getElementById("edit-task-deadline").value;
			taskToEdit.status = document.getElementById("edit-task-status").value;
			taskToEdit.priority = document.getElementById("edit-task-priority").value;
			taskToEdit.task_description = document.getElementById("edit-task-description").value;
			taskToEdit.assignee_id = document.getElementById("edit-task-assignee").value;
			
			userTasks.displayEditedTask(taskToEdit,oldAssignee,oldStatus,oldPriority);
		}
};


/*
-----------------------------------------------------------------------------------
View
-----------------------------------------------------------------------------------
*/

let userTasks = {

		init : function(){
			
			let tasks_list = controller.getTaskList();

			for(task in tasks_list){
				let newTask = tasks_list[task];
				this.addTaskToView(newTask);
			}
		},

		getDateString : function(dateNumber){
			let date = new Date(dateNumber);
			let dateString = monthNames[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
			return dateString;
		},

		addTaskToView : function(taskToAdd){
			
			let newTask = document.createElement("li");
			newTask.setAttribute("class","item-task");
			newTask.setAttribute("id",taskToAdd.task_id);
			newTask.setAttribute("draggable","true");

			newTask.innerHTML = '<div class="task '+ taskToAdd.status +' pri-'+ taskToAdd.priority +'">\
			 					<section class="task-name">' + taskToAdd.task_name + '</section>\
			 					<ul class="task-details">\
			 						<li class="edit-del-task"><button class="edit-task-btn">Edit</button>\
			 						<button class="del-task-btn">Delete</button></li>\
			 						<li id="task-deadline">Deadline: '+ userTasks.getDateString(taskToAdd.deadline) + '</li>\
			 						<li id="task-priority">Priority: '+ taskToAdd.priority +'</li>\
			 					</ul>\
			 				</div>';

			let assignee = document.getElementById(taskToAdd.assignee_id);
			let taskList = assignee.querySelector(".task-list");
			taskList.appendChild(newTask);
			document.location.href = "#";
		},

		removeTaskFromView : function(taskToDeleteId){
			let taskToDelete = document.getElementById(taskToDeleteId);
			let taskList = taskToDelete.closest(".task-list");
			taskList.removeChild(taskToDelete);
		},

		showTaskDetails : function(taskId){
			let all_tasks = controller.getTaskList();
			let all_users = controller.getUserList();
			let taskToShow = all_tasks[taskId];

			document.getElementById("view-task-popup").dataset.taskId = taskId;

			document.getElementById("view-task-name").innerHTML = "<strong>Name:</strong> "+taskToShow.task_name;
			document.getElementById("view-task-description").innerHTML = "<strong>Description:</strong> "+taskToShow.task_description;
			document.getElementById("view-task-status").innerHTML = "<strong>Status:</strong> "+taskToShow.status;
			document.getElementById("view-task-priority").innerHTML = "<strong>Priority:</strong> "+taskToShow.priority;
			document.getElementById("view-task-deadline").innerHTML = "<strong>Deadline:</strong> "+userTasks.getDateString(taskToShow.deadline);
			document.getElementById("view-task-assignee").innerHTML = "<strong>Assignee:</strong> "+all_users[taskToShow.assignee_id].name;
		},

		showAddTaskForm : function(userKnown){
			var form = document.getElementById("add-task-form");
			form.reset();

			let all_users = controller.getUserList();

			let userList = document.getElementById("new-task-assignee");
			while (userList.firstChild) {
    			userList.removeChild(userList.firstChild);
			}

			if(userKnown){
				let userItem = document.createElement("option");
				userItem.innerHTML = all_users[controller.getSelectedUser()].name;
				userItem.value = controller.getSelectedUser();
				userList.appendChild(userItem);
				return;
			}

			for(user in all_users){
				let userItem = document.createElement("option");
				userItem.innerHTML = all_users[user].name;
				userItem.value = all_users[user].user_id;
				userList.appendChild(userItem);
			}
		},

		showEditTaskForm : function(taskId){
			var form = document.getElementById("edit-task-form");
			form.reset();

			let all_tasks = controller.getTaskList();
			let all_users = controller.getUserList();
			let taskToEdit = all_tasks[taskId];

			let userList = document.getElementById("edit-task-assignee");
			while (userList.firstChild) {
    			userList.removeChild(userList.firstChild);
			}
			for(user in all_users){
				let userItem = document.createElement("option");
				userItem.innerHTML = all_users[user].name;
				userItem.value = all_users[user].user_id;
				if(all_users[user].user_id == taskToEdit.assignee_id){
					userItem.selected = "selected";
				}
				userList.appendChild(userItem);
			}

			document.getElementById("edit-task-popup").dataset.taskId = taskId;

			document.getElementById("edit-task-name").value = taskToEdit.task_name;
			document.getElementById("edit-task-description").value = taskToEdit.task_description;
			document.getElementById("edit-task-status").value = taskToEdit.status;
			document.getElementById("edit-task-priority").value = taskToEdit.priority;
			document.getElementById("edit-task-deadline").value = taskToEdit.deadline;
		},

		displayEditedTask : function(editedTask,oldAssignee,oldStatus,oldPriority){
			let task = document.getElementById(editedTask.task_id);

			task.querySelector(".task-name").innerHTML = editedTask.task_name;
			task.querySelector("#task-deadline").innerHTML = "Deadlne: "+userTasks.getDateString(editedTask.deadline);
			task.querySelector("#task-priority").innerHTML = "Priority: "+editedTask.priority;

			if(oldPriority!= editedTask.priority){
				task.querySelector(".task").classList.add("pri-"+editedTask.priority);
				task.querySelector(".task").classList.remove("pri-"+oldPriority);
			}

			if(oldStatus!= editedTask.status){
				task.querySelector(".task").classList.add(editedTask.status);
				task.querySelector(".task").classList.remove(oldStatus);
			}

			if(oldAssignee!=editedTask.assignee_id){
				let assignee = document.getElementById(editedTask.assignee_id);
				let taskList = assignee.querySelector(".task-list");
				taskList.appendChild(task);
			}
			document.location.href = "#";
		}
};


controller.init();