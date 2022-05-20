const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	mobil: /^\d{7,14}$/,
}

const fields = {
	name: false,
	mail: false,
	mobil: false,
}

const validateForm = (e) => {
	switch (e.target.name) {
		case "name":
			validateField(expressions.name, e.target, 'name');
		break;
		case "mail":
			validateField(expressions.mail, e.target, 'mail');
		break;
		case "mobil":
			validateField(expressions.mobil, e.target, 'mobil');
		break;
	}
}

const validateField = (expression, input, field) => {
	if(expression.test(input.value)){
		document.getElementById(`group-${field}`).classList.remove('form-group-wrong');
		document.getElementById(`group-${field}`).classList.add('form-group-right');
		document.querySelector(`#group-${field} i`).classList.add('fa-check-circle');
		document.querySelector(`#group-${field} i`).classList.remove('fa-times-circle');
		document.querySelector(`#group-${field} .form-input-error`).classList.remove('form-input-error-active');
		fields[field] = true;
	} else {
		document.getElementById(`group-${field}`).classList.add('form-group-wrong');
		document.getElementById(`group-${field}`).classList.remove('form-group-right');
		document.querySelector(`#group-${field} i`).classList.add('fa-times-circle');
		document.querySelector(`#group-${field} i`).classList.remove('fa-check-circle');
		document.querySelector(`#group-${field} .form-input-error`).classList.add('form-input-error-active');
		fields[field] = false;
	}
}



inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
	if(!(fields.name && fields.mail && fields.mobil) ){
		e.preventDefault();
		document.getElementById('form-message').classList.add('form-message-active');
		setTimeout(() => {
			document.getElementById('form-message').classList.remove('form-message-active');
		}, 5000);
	} 
});