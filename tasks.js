var callerID;
var taskID = 22;

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function removeTask(taskid){

	if (confirm("Are you sure you want to delete the task?")) {
		var t = document.getElementById(taskid);
		var toDelete = t.parentNode.parentNode.parentNode;
		var parentDiv = toDelete.parentNode;
		parentDiv.removeChild(toDelete);
	}
}

function openPopup(userid){
	callerID = userid;
	//console.log(callerID);
	var form = document.getElementById("add-task-form");
	form.reset();
	window.location.href = "#add-task-popup";
}

function addTask(){

	var newTask = document.createElement("li");
	newTask.setAttribute("class","item-task");

	var d = new Date(document.getElementById("new-task-deadline").value);
	var dateString = monthNames[d.getMonth()]+" "+d.getDate()+" , "+d.getFullYear();

	var taskName = document.getElementById("new-task-name").value;
	if(taskName.length>22){
		taskName = taskName.substring(0,20)+"..";
	}

	newTask.innerHTML = '<div class="task '+ document.getElementById("new-task-status").value +' pri-'+document.getElementById("new-task-priority").value+'">\
	 					<section class="task-name">' + taskName + '</section>\
	 					<ul class="task-details">\
	 						<li class="edit-del-task"><button class="edit-task-btn">Edit</button><button id="t'+ taskID +'" onclick="removeTask(this.id);return false;" class="del-task-btn">Delete</button></li>\
	 						<li>Deadline: '+ dateString + '</li>\
	 						<li>Priority: '+ document.getElementById("new-task-priority").value +'</li>\
	 					</ul>\
	 				</div>';

	 taskID++;

	var elem = document.getElementById(callerID).parentNode;
	
	elem.childNodes[7].appendChild(newTask);
	document.location.href = "#";

}

