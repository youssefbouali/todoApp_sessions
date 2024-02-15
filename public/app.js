

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