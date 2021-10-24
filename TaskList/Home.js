class Task{


	constructor(){

		this.id = 1;
		this.database = [];
		this.TaskDoneDatabase = [];
	}

	RegisterTask(){

		var getTaskName = document.querySelector('input#taskname');
		var getTaskDate = document.querySelector('input#taskdate');
		var getTaskDesc = document.querySelector('textarea#taskdescription');

		if( getTaskName.value == "" || getTaskDate.value == "" || getTaskDesc.value == "" ){

			alert("Error: Unable to register task as long as there are blank fields!");
		}else{

			let task = this.GetData(getTaskName, getTaskDate, getTaskDesc);

			this.database.push(task);
			this.id++;

			this.RenderTaskList();
		}
	}

	GetData(getTaskName, getTaskDate, getTaskDesc){

		let nTask = {};
			
		nTask.id = this.id;
		nTask.name = getTaskName.value;
		nTask.date = getTaskDate.value;
		nTask.desc = getTaskDesc.value;

		getTaskName.value = '';
		getTaskDate.value = '';
		getTaskDesc.value = '';

		return nTask;
	}

	RenderTaskList(){

		var getContainer = document.querySelector('div#TaskListContainer');

		getContainer.innerText = '';

		for(let i = 0; i < this.database.length; i++){

			getContainer.innerHTML += 
			`<div class="border border-dark rounded bg-light me-2 mb-2" style="width:250px;height:300px;">

				<div class="container-fluid-xxl bg-dark p-1">

					<p class="text-white h2 text-center">${this.database[ i ].name}</p>
				</div>

				<div class="container-fluid border-dark border-bottom bg-info p-1">

					<p class="text-white text-center h5">${this.database[ i ].date}</p>
				</div>

				<div class="container form-control " style="height: 150px; overflow:auto;">

					<p class="text-dark h6">${this.database[ i ].desc}</p>
				</div>

				<div class="btn-group d-flex mt-1 ms-1">

					<button class="btn btn-danger p-2 me-1" onclick="task.ExecuteTask(${ this.database[ i ].id }, true);">Delete</button>
					<button class="btn btn-success p-2 me-1" onclick="task.ExecuteTask(${ this.database[ i ].id }, false);">Execute</button>
				</div>

			</div>`;

		}
	}

	RenderTaskLog(){

		var getTaskDone = document.querySelector('div#RenderTaskDone');
		let backgroundColor = "background-color:rgba(255, 106, 106, 0.5);";
		let icon = "&#10003";
		let trayIcon = "background-color: rgb(238, 232, 170);"

		getTaskDone.innerText = '';

		for(let i = 0; i < this.TaskDoneDatabase.length; i++){

			if( this.TaskDoneDatabase[ i ].isCanceled == true ){

				backgroundColor = "background-color:rgba(255, 106, 106, 1);";
				icon = "X";
				trayIcon = "background-color: rgb(255, 127, 0);";
			}else{

				backgroundColor = "background-color:rgba(173, 255, 47, 1);";
				icon = "&#10003";
				trayIcon = "background-color: rgb(238, 232, 170);"
			}

			getTaskDone.innerHTML += `

			<div class="container border border-dark mb-1 pt-1 text-dark h5" style="height: 40px; ${backgroundColor}">
			${this.TaskDoneDatabase[ i ].name}

			<spam class="badge float-end border border-dark text-success" style="${trayIcon};">${icon}</spam>
			</div>
			`;
		}
	}

	ExecuteTask(param_id, flag){

		let getTask = {};

		for(let i = 0; i < this.database.length; i++){

			if( this.database[ i ].id == param_id ){

				// # Get Data end inset into TaskDoneDatabase array
				getTask.id = param_id;
				getTask.name = this.database[ i ].name;
				getTask.date = this.database[ i ].date;
				getTask.desc = this.database[ i ].desc;
				getTask.isCanceled = flag;

				this.TaskDoneDatabase.push(getTask);

				// # Remove old task from queue
				this.database.splice(i, 1);

				// # Update screen
				this.RenderTaskList();
				this.RenderTaskLog();
			}
		}
	}
}

var task = new Task();