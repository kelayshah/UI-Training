/*
-----------------------------------------------------------------------------------
Data (Model)
-----------------------------------------------------------------------------------
*/


/*
-----------------------------------------------------------------------------------
Controller (Connects Model and View)
-----------------------------------------------------------------------------------
*/

let controller = {

		init : function(){
			userInfo.init();

			document.getElementById("add-user-btn").addEventListener('click',function(event){
				let form = document.getElementById("add-user-form");
				form.reset();
				window.location.href = "#add-user-popup";
			},false);

			document.body.addEventListener('click',function(event){
				let target = event.target;
				
				if(!target.closest(".user"))
					return;

				let userId = target.closest(".user").id;

				if(target.matches(".edit-user-btn")){
					userInfo.showEditUserForm(userId);
					window.location.href = "#edit-user-popup";
				}

				else if(target.matches(".del-user-btn")){
					if (confirm("Are you sure you want to delete the user?\nNote: All the tasks associated with the user will also be deleted!")){
						controller.removeUser(userId);
					}
				}
			},false);

			document.body.addEventListener('submit',function(event){
				let target = event.target;
				event.preventDefault();

				if(target.matches("#add-user-form")){
					controller.addNewUser();
				}

				if(target.matches("#edit-user-form")){
					let userId = target.closest("#edit-user-popup").dataset.userId;
					controller.editUser(userId);
				}

			},false);
		},

		getUserList: function(){
			let userList = localStorage.getItem("users");
			if(!userList)
				return null;
			else{
				return JSON.parse(userList);
			}
		},

		setUserList: function(userList){
			let userListString = JSON.stringify(userList);
			localStorage.setItem("users",userListString);
		},

		getUserNum: function(){
			let userNum = localStorage.getItem("userNum");
			if(!userNum)
				return null;
			else{
				return Number(userNum);
			}
		},

		setUserNum: function(userNum){
			localStorage.setItem("userNum",userNum);
		},

		addNewUser : function(){
			let userNum = controller.getUserNum();
			if(!userNum){
				userNum = 0;
			}
			controller.setUserNum(userNum+1);

			let newUser = {
				user_id: "user"+userNum, 
				name: document.getElementById("new-user-name").value,
				skype: document.getElementById("new-user-skype").value,
				email: document.getElementById("new-user-email").value,
				role: document.getElementById("new-user-role").value,
				image_src: document.getElementById("new-user-image").value
			};

			let userList = controller.getUserList();
			if(!userList){
				userList = {};
			}
			userList[newUser.user_id] = newUser;
			controller.setUserList(userList);
			userInfo.addUserToView(newUser);
		},

		removeUser: function(userToDeleteId){
			let userList = controller.getUserList();
			delete userList[userToDeleteId];
			controller.setUserList(userList);
			userInfo.removeUserFromView(userToDeleteId);
		},

		editUser: function(userToEditId){
			let userList = controller.getUserList();
			let userToEdit = userList[userToEditId];

			userToEdit.name = document.getElementById("edit-user-name").value;
			userToEdit.skype = document.getElementById("edit-user-skype").value;
			userToEdit.email = document.getElementById("edit-user-email").value;
			userToEdit.role = document.getElementById("edit-user-role").value;
			userToEdit.image_src = document.getElementById("edit-user-image").value;
			
			userList[userToEditId] = userToEdit;
			controller.setUserList(userList);
			userInfo.displayEditedUser(userToEdit);
		}
};


/*
-----------------------------------------------------------------------------------
View
-----------------------------------------------------------------------------------
*/

let userInfo = {

		init : function(){
			
			let users_list = controller.getUserList();

			for(user in users_list){
				let newUser = users_list[user];
				this.addUserToView(newUser);
			}
		},

		addUserToView : function(userToAdd){
			
			let newUser = document.createElement("li");
			newUser.setAttribute("class","user");
			newUser.setAttribute("id",userToAdd.user_id);

			newUser.innerHTML = '<section class="user-section">\
				 				<section title="'+userToAdd.name+'"class="user-name">'+userToAdd.name+'</section>\
				 				<section class="edit-del-user"><button class="edit-user-btn">Edit</button><button\
				 				 class="del-user-btn">Delete</button></section>\
				 				<section title="'+userToAdd.role+'"class="role">Role: '+userToAdd.role+'</section>\
				 				<section title="'+userToAdd.skype+'"class="skypeID">Skype ID: '+userToAdd.skype+'</section>\
				 				<section title="'+userToAdd.email+'"class="email">Email ID: '+userToAdd.email+'</section>\
					 			</section>\
					 			<section class="user-image">\
					 				<img src="'+userToAdd.image_src.substring(12) +'" alt=" '+userToAdd.name+'">\
					 			</section>';

			var elem = document.getElementById("all-users");
	
			elem.appendChild(newUser);
			window.location.href = "#";
		},

		removeUserFromView : function(userToDeleteId){
			let userToDelete = document.getElementById(userToDeleteId);
			let userList = document.getElementById("all-users");
			userList.removeChild(userToDelete);
		},

		showEditUserForm : function(userId){
			var form = document.getElementById("edit-user-form");
			form.reset();

			let all_users = controller.getUserList();
			let userToEdit = all_users[userId];

			document.getElementById("edit-user-popup").dataset.userId = userId;

			document.getElementById("edit-user-name").value = userToEdit.name;
			document.getElementById("edit-user-skype").value = userToEdit.skype;
			document.getElementById("edit-user-email").value = userToEdit.email;
			document.getElementById("edit-user-role").value = userToEdit.role;
			//document.getElementById("edit-user-image").value = userToEdit.image_src;
		},

		displayEditedUser : function(editedUser){
			let user = document.getElementById(editedUser.user_id);

			user.querySelector(".user-name").innerHTML = editedUser.name;
			user.querySelector(".role").innerHTML = "Role: "+editedUser.role;
			user.querySelector(".skypeID").innerHTML = "Skype ID: "+editedUser.skype;
			user.querySelector(".email").innerHTML = "Email ID: "+editedUser.email;
			document.location.href = "#";
		}
};


controller.init();