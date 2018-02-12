let namespace = function(){

	/*
	-----------------------------------------------------------------------------------
	Data (Model)
	-----------------------------------------------------------------------------------
	*/

	let monthNames = ["January", "February", "March", "April", "May", "June",
	  	"July", "August", "September", "October", "November", "December"
		];

	/*
	-----------------------------------------------------------------------------------
	Controller (Connects Model and View)
	-----------------------------------------------------------------------------------
	*/

	let controller = {

			init : function(){
				userTasks.init();
			},

			getTaskList: function(){
				let taskList = localStorage.getItem("tasks");
				if(!taskList)
					return null;
				else{
					return JSON.parse(taskList);
				}
			},

			setTaskList: function(taskList){
				let taskListString = JSON.stringify(taskList);
				localStorage.setItem("tasks",taskListString);
			},

			getSelectedUser: function(){
				let selectedUser = localStorage.getItem("selectedUser");
				if(!selectedUser)
					return null;
				else{
					return selectedUser;
				}
			},

			setSelectedUser: function(selectedUser){
				localStorage.setItem("selectedUser",selectedUser);
			},

			getUserList: function(){
				let userList = localStorage.getItem("users");
				if(!userList)
					return null;
				else{
					return JSON.parse(userList);
				}
			},

			getTaskNum: function(){
				let taskNum = localStorage.getItem("taskNum");
				if(!taskNum)
					return null;
				else{
					return Number(taskNum);
				}
			},

			setTaskNum: function(taskNum){
				localStorage.setItem("taskNum",taskNum);
			},

			addNewTask : function(){
				let taskNum = this.getTaskNum();
				if(!taskNum)
					taskNum=0;
				this.setTaskNum(taskNum+1);

				let newTask = {
					task_id: "task"+ taskNum,
					task_name: document.getElementById("new-task-name").value,
					deadline: document.getElementById("new-task-deadline").value,
					status: document.getElementById("new-task-status").value,
					priority: document.getElementById("new-task-priority").value,
					task_description: document.getElementById("new-task-description").value,
					assignee_id: document.getElementById("new-task-assignee").value,
				};

				let taskList = this.getTaskList();
				if(!taskList){
					taskList = {};
				}
				taskList[newTask.task_id] = newTask;
				this.setTaskList(taskList);
				userTasks.addTaskToView(newTask);
			},

			removeTask: function(taskToDeleteId,userExists){
				let taskList = this.getTaskList();
				delete taskList[taskToDeleteId];
				this.setTaskList(taskList);
				if(userExists) 
					userTasks.removeTaskFromView(taskToDeleteId);
			},

			editTask: function(taskToEditId){
				let taskList = this.getTaskList(),
					taskToEdit = taskList[taskToEditId],
					oldStatus = taskToEdit.status,
					oldPriority = taskToEdit.priority,
					oldAssignee = taskToEdit.assignee_id;

				taskToEdit.task_name = document.getElementById("edit-task-name").value;
				taskToEdit.deadline = document.getElementById("edit-task-deadline").value;
				taskToEdit.status = document.getElementById("edit-task-status").value;
				taskToEdit.priority = document.getElementById("edit-task-priority").value;
				taskToEdit.task_description = document.getElementById("edit-task-description").value;
				taskToEdit.assignee_id = document.getElementById("edit-task-assignee").value;

				taskList[taskToEditId] = taskToEdit;
				this.setTaskList(taskList);
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

				let users_list = controller.getUserList();

				for(user in users_list){
					let newUser = users_list[user];
					this.addUserNameToView(newUser);
				}
				
				let tasks_list = controller.getTaskList();
				if(!tasks_list)
					return;

				for(task in tasks_list){
					let newTask = tasks_list[task];
					let assignee_id = newTask.assignee_id;
					if(!users_list[assignee_id]){
						controller.removeTask(newTask.task_id,false);
						continue;
					}
					this.addTaskToView(newTask);
				}

				document.getElementById("head-add-task-btn").addEventListener('click',function(event){
					userTasks.showAddTaskForm(false);
					window.location.href = "#add-task-popup";
				},false);

				document.body.addEventListener('click',function(event){
					let target = event.target;

					if(target.matches(".display-task-todo")){
						let userId = target.closest(".user-column").id;
						userTasks.handleDisplayTasks(userId,"todo");
					}

					else if(target.matches(".display-task-doing")){
						let userId = target.closest(".user-column").id;
						userTasks.handleDisplayTasks(userId,"doing");
					}

					else if(target.matches(".display-task-done")){
						let userId = target.closest(".user-column").id;
						userTasks.handleDisplayTasks(userId,"done");
					}

					else if(target.matches("#view-task-edit")){
						let taskId = target.closest("#view-task-popup").dataset.taskId;
						userTasks.showEditTaskForm(taskId);
						window.location.href = "#edit-task-popup";
					}

					else if(target.matches("#view-task-delete")){
						let taskId = target.closest("#view-task-popup").dataset.taskId;
						if (confirm("Are you sure you want to delete the task?")){
							controller.removeTask(taskId,true);
							document.location.href = "#";
						}
					}

					else if(target.matches(".add-task-btn")){
						let userId = target.closest(".user-column").id;
						controller.setSelectedUser(userId);
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
						if (confirm("Are you sure you want to delete the task?")){
							controller.removeTask(taskId,true);
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

			getDateString : function(dateNumber){
				let date = new Date(dateNumber),
					dateString = monthNames[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
				return dateString;
			},

			addUserNameToView: function(user){
				let userDiv = document.createElement("div");
				userDiv.setAttribute("class","user-column");
				userDiv.setAttribute("id",user.user_id);

				userDiv.innerHTML = '<section class="list-header">'+ user.name +'</section><button class="add-task-btn">Add Task</button>\
							 		 <div class="task-checkboxes">\
								      <label><input type="checkbox" class="display-task-todo" checked/>Todo</label>\
								      <label >\
								        <input type="checkbox" class="display-task-doing" checked/>Doing</label>\
								       <label >\
								        <input type="checkbox" class="display-task-done" checked/>Done</label>\
								    </div>\
							 		<ul class="task-list" ondragstart="namespace.dragStartHandler(event);"\
							 		 ondragover="namespace.dragOverHandler(event);" ondrop="namespace.dropHandler(event);">\
							 		</ul>';

				let parentDiv = document.getElementById("body-content");
				parentDiv.appendChild(userDiv);
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
				 						<li id="task-deadline">Deadline: '+ this.getDateString(taskToAdd.deadline) + '</li>\
				 						<li id="task-priority">Priority: '+ taskToAdd.priority +'</li>\
				 					</ul>\
				 				</div>';

				let assignee = document.getElementById(taskToAdd.assignee_id),
					taskList = assignee.querySelector(".task-list");
				taskList.appendChild(newTask);
				this.handleDisplayTasks(taskToAdd.assignee_id,taskToAdd.status);
				document.location.href = "#";
			},

			removeTaskFromView : function(taskToDeleteId){
				let taskToDelete = document.getElementById(taskToDeleteId),
					taskList = taskToDelete.closest(".task-list");
				taskList.removeChild(taskToDelete);
			},

			showTaskDetails : function(taskId){
				let all_tasks = controller.getTaskList(),
					all_users = controller.getUserList(),
					taskToShow = all_tasks[taskId];

				document.getElementById("view-task-popup").dataset.taskId = taskId;
				document.getElementById("view-task-name").innerHTML = "<strong>Name:</strong> "+taskToShow.task_name;
				document.getElementById("view-task-description").innerHTML = "<strong>Description:</strong> "+taskToShow.task_description;
				document.getElementById("view-task-status").innerHTML = "<strong>Status:</strong> "+taskToShow.status;
				document.getElementById("view-task-priority").innerHTML = "<strong>Priority:</strong> "+taskToShow.priority;
				document.getElementById("view-task-deadline").innerHTML = "<strong>Deadline:</strong> "+this.getDateString(taskToShow.deadline);
				document.getElementById("view-task-assignee").innerHTML = "<strong>Assignee:</strong> "+all_users[taskToShow.assignee_id].name;
			},

			handleDisplayTasks: function(userId,taskStatus){
				let all_tasks = controller.getTaskList(),
					taskDivs = document.getElementById(userId).querySelector(".task-list").querySelectorAll(".item-task"),
					boxChecked = document.getElementById(userId).querySelector(".task-checkboxes").querySelector(".display-task-"+taskStatus).checked;
				
				taskDivs.forEach(function(task){
					if(taskStatus==all_tasks[task.id].status){
						boxChecked?task.style.display = 'block':task.style.display = 'none';
					} 
				});
			},

			showAddTaskForm : function(userKnown){
				let form = document.getElementById("add-task-form");
				form.reset();

				let all_users = controller.getUserList(),
					userList = document.getElementById("new-task-assignee");
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
				let form = document.getElementById("edit-task-form");
				form.reset();

				let all_tasks = controller.getTaskList(),
					all_users = controller.getUserList(),
					taskToEdit = all_tasks[taskId];

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
				task.querySelector("#task-deadline").innerHTML = "Deadlne: "+this.getDateString(editedTask.deadline);
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
					let assignee = document.getElementById(editedTask.assignee_id),
						taskList = assignee.querySelector(".task-list");
					taskList.appendChild(task);
				}
				document.location.href = "#";
			}
	};

	controller.init();

	return {
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
				let movedTaskId = event.dataTransfer.getData("text"),
					newAssignee = event.target.closest(".user-column").id,
					taskList = controller.getTaskList();
				taskList[movedTaskId].assignee_id = newAssignee;
				controller.setTaskList(taskList);
				event.target.closest(".task-list").appendChild(document.getElementById(movedTaskId));
				userTasks.handleDisplayTasks(newAssignee,taskList[movedTaskId].status);
			},
	}

}();