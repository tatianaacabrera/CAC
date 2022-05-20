const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	surname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	user: /^[a-zA-Z0-9\_\-]{4,16}$/,
	password: /^.{4,12}$/,
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone:/^\d{7,10}$/,
	mobil: /^\d{7,14}$/,
}

const fields = {
	name: false,
	surname: false, 
	user: false,
	password: false,
	mail: false,
	phone: false,
	mobil: false,
}

const validateForm = (e) => {
	switch (e.target.name) {
		case "name":
			validateField(expressions.name, e.target, 'name');
		break;
		case "surname":
			validateField(expressions.surname, e.target, 'surname');
		break;
		case "user":
			validateField(expressions.user, e.target, 'user');
		break;
		case "password":
			validateField(expressions.password, e.target, 'password');
			validatePasswordi();
		break;
		case "passwordi":
			validatePasswordi();
		break;
		case "mail":
			validateField(expressions.mail, e.target, 'mail');
		break;
		case "phone":
			validateField(expressions.phone, e.target, 'phone');
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

const validatePasswordi = () => {
	const inputPassword = document.getElementById('password');
	const inputPasswordi = document.getElementById('passwordi');

	if(inputPassword.value !== inputPasswordi.value){
		document.getElementById(`group-passwordi`).classList.add('form-group-wrong');
		document.getElementById(`group-passwordi`).classList.remove('form-group-right');
		document.querySelector(`#group-passwordi i`).classList.add('fa-times-circle');
		document.querySelector(`#group-passwordi i`).classList.remove('fa-check-circle');
		document.querySelector(`#group-passwordi .form-input-error`).classList.add('form-input-error-active');
		fields['password'] = false;
	} else {
		document.getElementById(`group-passwordi`).classList.remove('form-group-wrong');
		document.getElementById(`group-passwordi`).classList.add('form-group-right');
		document.querySelector(`#group-passwordi i`).classList.remove('fa-times-circle');
		document.querySelector(`#group-passwordi i`).classList.add('fa-check-circle');
		document.querySelector(`#group-passwordi .form-input-error`).classList.remove('form-input-error-active');
		fields['password'] = true;
	}
}



inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
	const terms = document.getElementById('terms');
	if(!(fields.name && fields.surname && fields.user && fields.password && fields.mail && fields.mobil && terms.checked) ){
		e.preventDefault();
		document.getElementById('form-message').classList.add('form-message-active');
		setTimeout(() => {
			document.getElementById('form-message').classList.remove('form-message-active');
		}, 5000);
	} 
});