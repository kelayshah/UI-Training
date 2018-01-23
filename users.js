var userID = 22;

function removeUser(userid){
	if (confirm("Are you sure you want to delete the user?")) {
		var u = document.getElementById(userid);
		var toDelete = u.parentNode.parentNode.parentNode;
		var parentDiv = toDelete.parentNode;
		parentDiv.removeChild(toDelete);
	}
}


function openPopup(){
	var form = document.getElementById("add-user-form");
	form.reset();
	window.location.href = "#add-user-popup";
}

function addUser(){

	var newUser = document.createElement("li");
	newUser.setAttribute("class","user");

	newUser.innerHTML = '<section class="user-section">\
	 				<section class="user-name">'+document.getElementById("new-user-name").value+'</section>\
	 				<section class="edit-del-user"><button class="edit-user-btn">Edit</button><button id="u'+ userID +'" onclick="removeUser(this.id);return false;"\
	 				 class="del-user-btn">Delete</button></section>\
	 				<section class="role">Role: '+document.getElementById("new-user-role").value+'</section>\
	 				<section class="skypeID">Skype ID: '+document.getElementById("new-user-skype").value+'</section>\
	 				<section class="email">Email ID: '+document.getElementById("new-user-email").value+'</section>\
	 			</section>\
	 			<section class="user-image">\
	 				<img src="'+document.getElementById("new-user-image").value.substring(12,) +'" alt="User '+userID+'">\
	 			</section>';
	userID++;

	var elem = document.getElementById("all-users");
	
	elem.appendChild(newUser);
	window.location.href = "#";

}

