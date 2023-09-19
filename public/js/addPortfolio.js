// const addPortfolio = async () => {
// 	const response = await fetch('/api/user/add_portfolio', {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 	});

// 	if (response.ok) {
// 		document.location.replace('/');
// 	} else {
// 		alert(response.statusText);
// 	}
// };

// document.querySelector('#addPortfolio').addEventListener('click', addPortfolio);

function getData(userInput) {
	const url = `https://api.polygon.io/v3/reference/tickers/${userInput}?apiKey=ronCgaeqtkFSxW8Dh5HGuXC_crUFlvg5`;
	console.log(url);
	fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(function (response) {
			if (response.status !== 200) {
				console.log('API Not Found.');
			}
			return response.json();
		})
		.then(function (data) {
			console.log(data);
		});
}

document
	.querySelector('.portfolio-form')
	.addEventListener('submit', function (e) {
		e.preventDefault();
		let userInput = document
			.getElementById('stock-name-investment')
			.value.trim();
		getData(userInput);
	});
