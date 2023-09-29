const add = async (event) => {
	event.preventDefault();

	const name = document.querySelector('#name-add').value.trim();
	const quantity = document.querySelector('#quantity-add').value.trim();

	if (name && quantity) {
		const response = await fetch('/api/user/add', {
			method: 'POST',
			body: JSON.stringify({ name, quantity }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.status === 200) {
			document.location.replace('/');
		} else {
			alert('Invalid stock ticker symbol');
		}
	}
};

document.querySelector('.add-form').addEventListener('submit', add);
