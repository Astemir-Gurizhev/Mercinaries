new Swiper ('.swiper',{
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	grid: {
		rows: 2,
	 },
	fill: 'row',
	watchOverflow: true,
	initialSlide: 0,
	autoplay: {
		delay: 5000,
		stopOnLastSlide: false,
		disableOnIteration: false,
	},
	breakpoints: {
		1070: {
			spaceBetween: 32,
			slidesPerView: 3,
			slidesPerGroup: 3,
		},
		720: {
			spaceBetween: 32,
			slidesPerView: 2,
			slidesPerGroup: 2,
		}, 
		320: {
			spaceBetween: 0,
			slidesPerView: 1,
			slidesPerGroup: 1,
		}
	}
});

document.querySelector('.header__burger').onclick = function() {
	document.querySelector('.header__menu').classList.toggle('header__menu-active')
	document.querySelector('.header__burger').classList.toggle('active')
	$('body').toggleClass('lock')
}

// Отправка данных на сервер
function send(event, php){
	console.log("Отправка запроса");
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
	var req = new XMLHttpRequest();
	req.open('POST', php, true);
	req.onload = function() {
		if (req.status >= 200 && req.status < 400) {
		json = JSON.parse(this.response); 
			 console.log(json);
			 if (json.result == "success") {
				 alert("Сообщение отправлено");
			 } else {
				 alert("Ошибка. Сообщение не отправлено");
			 }
		 } else {alert("Ошибка сервера. Номер: "+req.status);}
	}; 
	
	req.onerror = function() {alert("Ошибка отправки запроса");};
	req.send(new FormData(event.target));
}

/* Form Validation */

const inputName = document.querySelector("#form-username")
const inputPhone = document.querySelector("#form-userphone")
const inputEmail = document.querySelector("#form-useremail")
const checkBox = document.querySelector("input[type=checkbox]")
const checkBoxLabel = document.querySelector(".checkbox__label")
const btn = document.querySelector('.form__action-btn')
const form = document.getElementById('form')

btn.addEventListener("click", formSend)

function formSend(event) {
	//Border или Color по умолчанию, если введено правильно 
	if (phoneTest(inputPhone)) {
		inputPhone.style.border = "1px solid #d9d9de"
	}
	if (loginTest(inputName)) {
		inputName.style.border = "1px solid #d9d9de"
	}
	if (checkBox.checked) {
	  checkBoxLabel.style.color = "#76767a"
	}
	//Валидация
	if ((checkBox.checked) && phoneTest(inputPhone) && loginTest(inputName) && !(inputName.value === '') && !(inputPhone.value === '')) {
	}
	else if (!checkBox.checked) {
		event.preventDefault()
	  checkBoxLabel.style.color = "#df2030"
	}
	if (!phoneTest(inputPhone) || (inputPhone.value === '')) {
		event.preventDefault()
		inputPhone.style.border = "1px solid #DF2030"
	}
	if (!loginTest(inputName) || (inputName.value === '')) {
		event.preventDefault()
		inputName.style.border = "1px solid #DF2030"
	}
}
 
 function loginTest(input) {
	return /^[a-zA-zа-яА-я<<>>""]{1}[a-zA-Zа-яА-Я<<>>""]{3,20}$/.test(input.value)
 }
 function phoneTest(input) {
	return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value)
 }
