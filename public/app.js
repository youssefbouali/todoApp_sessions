

function isJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}


function postData(api, getMethod, formData) {
    const token = localStorage.getItem('token');
    //if (!token) {
    //    console.error('No token available');
    //    return;
    //}
	const jsonData = {};
    if(formData){
		formData.forEach((value, key) => {
			jsonData[key] = value;
		});
		return fetch(api, {
        method: getMethod,
        headers: {
			'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Request failed');
        } else {
        return response.text();
		}
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Request error:', error);
    });
	
	
	
	} else {

    return fetch(api, {
        method: getMethod,
        headers: {
			'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Request failed');
        }
        return response.text();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Request error:', error);
    });
	}
}


function onSubmitForm (form, funcReturn){
	form.addEventListener('submit', function(event) {
		event.preventDefault();
		const formData = new FormData(form);
		postData(form.action, form.method, formData).then(data => {
		  funcReturn(data);
		});
	});
}



function createHeader() {

	const ulnav = document.getElementById('ulnav');

	const li0 = document.createElement('li');

	const link0 = document.createElement('a');
	link0.href = "/homePage";
	link0.textContent = 'Home';
	li0.appendChild(link0);

	ulnav.appendChild(li0);

	if(localStorage.getItem('token')){

			const li1 = document.createElement('li');
			
			const link1 = document.createElement('a');
			link1.href = "/getTodos";
			link1.textContent = 'Todos';
			li1.appendChild(link1);
			
			ulnav.appendChild(li1);





			const li2 = document.createElement('li');
			
			const link2 = document.createElement('a');
			link2.href = "/getUsers";
			link2.textContent = 'Users';
			li2.appendChild(link2);
			
			ulnav.appendChild(li2);





			const li29 = document.createElement('li');
			
			const link29 = document.createElement('a');
			link29.href = "/logout";
			link29.textContent = 'Logout';
			li29.appendChild(link29);
			
			ulnav.appendChild(li29);
	} else {


			const li3 = document.createElement('li');
			
			const link3 = document.createElement('a');
			link3.href = "/loginPage";
			link3.textContent = 'Logn';
			li3.appendChild(link3);
			
			ulnav.appendChild(li3);


			const li4 = document.createElement('li');
			
			const link4 = document.createElement('a');
			link4.href = "/createUser";
			link4.textContent = 'Sign Up';
			li4.appendChild(link4);
			
			ulnav.appendChild(li4);
		
	}

}