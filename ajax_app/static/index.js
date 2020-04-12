window.onload = function(){
	var save_button = document.getElementById('save_book');
	save_button.onclick = save;
	var show_books_btn = document.getElementById('profile-tab');
	show_books_btn.onclick = list; 
}

function save(){
	var name = document.getElementById('book_name').value;
	var price = document.getElementById('book_price').value;
	var pages = document.getElementById('book_pages').value;
	
	var url = '/save_book?x='+name+'&y='+price+'&z='+pages;

	var req = new XMLHttpRequest();
	//this will run if send function is called
	req.onreadystatechange = function(){	
		if (this.readyState == 4 && this.status == 200){
			if (req.responseText == 'True'){
				document.getElementById('book_name').value = '';
				document.getElementById('book_price').value = '';
				document.getElementById('book_pages').value = '';
			}
		}
	};
	req.open("GET", url, true);
	req.send();
}

function list(){
	var req = new XMLHttpRequest();
	var url = 'list_book';
	req.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			//eval breaks list items to separate objects
			var data = eval(req.responseText);
			var listBookDiv = document.getElementById('profile');
			listBookDiv.innerHTML = ''
			var table = document.createElement('TABLE');
			var headerRow = table.insertRow(0);
			headerRow.insertCell(0).innerHTML = '<h5>Name</h5>'
			headerRow.insertCell(1).innerHTML = '<h5>Price</h5>'
			headerRow.insertCell(2).innerHTML = '<h5>Name</h5>'
			for(var i=0; i<data.length; i++){
				//creating rows/col objects
				var row = table.insertRow(i+1);
				var name = row.insertCell(0);
				var price = row.insertCell(1);
				var pages = row.insertCell(2);
				//assigning HTML values 
				name.innerHTML = data[i].name;
				price.innerHTML = data[i].price;
				pages.innerHTML = data[i].pages;
			}
			//assigning bootstrap class
			table.className = 'table text-center table-striped';
			listBookDiv.appendChild(table);
		}
	};
	req.open("GET", url, true);
	req.send();
}

// readyState	Holds the status of the XMLHttpRequest.
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready
// status	200: "OK"
// 403: "Forbidden"
// 404: "Page not found"