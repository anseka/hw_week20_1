const button = document.querySelector('.grid-button');
const num = document.querySelector('#num');
const gets = document.querySelector('#gets');
const info = document.querySelector('#info');
const errorElement = document.querySelector('#error');

function getInformation(get, number) {
	info.textContent = 'Идёт загрузка...';
	errorElement.textContent = '';

	fetch(`https://swapi.py4e.com/api/${get}/${number}`)
		.then((res) => {
			if (!res.ok) {
				return Promise.reject(`Ошибка: ${res.status}`);
			}
			return res.json();
		})
		.then((data) => {
			if (data.name) {
				info.textContent = 'Имя: ' + data.name;
			} else {
				info.textContent = 'Заголовок: ' + data.title;
			}
		})
		.catch((error) => {
			info.textContent = '';
			errorElement.textContent = `Не удалось загрузить информацию: ${error}`;
			console.error('Подробная ошибка:', error);
		})
		.finally(() => {
			if (info.textContent === 'Идёт загрузка...') {
				info.textContent = '';
			}
		});
}

button.addEventListener('click', function (event) {
	event.preventDefault();
	const resource = gets.value;
	const id = num.value;

	if (!resource || !id) {
		errorElement.textContent = 'Введите корректные данные';
		return;
	}

	getInformation(resource, id);
});
