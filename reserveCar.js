$(document).ready(function() {
	//message dispayed when there is no cars in the cart.
if(JSON.parse(sessionStorage.getItem('addedCarsArray')).length == 0){
		var para = document.createElement("p");
		var node = document.createTextNode("Your shopping cart is Empty.");
		para.appendChild(node);
		var element = document.getElementById("emptyCart");
		element.appendChild(para);
}

//retrieving the values from the session.
const addedCarsArray = sessionStorage.getItem('addedCarsArray');
const parsedArray = JSON.parse(addedCarsArray);
let deleteId = 0;
let priceId = 100;
let inputId = 10;
	for(let i=0; i<parsedArray.length; i++) {
		deleteId++;
		priceId++;
		inputId++;
	$('.row').append(
	        '<div class="col-sm-12 addedCarDetails" id ='+deleteId+'>' +
	            '<p class="carImage col-sm-2">' +
	                '<img style = "width: 90%;" src = '+parsedArray[i].image+' >' +
	             '</p>'+
	             '<p class="col-sm-2">' + parsedArray[i].model_year + '-' + parsedArray[i].brand +'-' + parsedArray[i].model + '</p> ' +
	             '<p class="col-sm-2" id = '+priceId+'>' + parsedArray[i].price_per_day + '</p> ' +
	             '<input type="number" class="rentalDays col-sm-2" id = '+inputId+' onchange="inputCheck(this.value, '+priceId+', '+inputId+')"></input>'+
	             '<button type="button" class="delete col-sm-2 btn btn-primary" style = "background: red;" onclick = "deleteCar('+deleteId+')">Delete</button>'+
	        '</div>');
	}
});


function deleteCar(id){
	document.getElementById(id).remove();
	const addedCarsArray = sessionStorage.getItem('addedCarsArray');
	const parsedArray = JSON.parse(addedCarsArray);
	//removing the cars when delete button pressed.
	if (parsedArray.length == 1) {
		parsedArray.splice(0, 1);
	}else(
		parsedArray.splice((id-1), 1)
	)
	//Displaying the messaage of empty cart when all the cart items has been deleted.
	sessionStorage.setItem('addedCarsArray', JSON.stringify(parsedArray));
	if(JSON.parse(sessionStorage.getItem('addedCarsArray')).length == 0){
		var para = document.createElement("p");
		var node = document.createTextNode("Your shopping cart is Empty.");
		para.appendChild(node);
		var element = document.getElementById("emptyCart");
		element.appendChild(para);
	}
}


function inputCheck(inputValue, priceId, inputId){
	let decimal = /^[-+]?[0-9]+\.[0-9]+$/;
	//checking the input value if its decimal
	if (inputValue.match(decimal)) {
		alert("Please enter days as integer value");
		document.getElementById(inputId).value = "1";
	}
	//checking the input value if it is less than 1
	else if(inputValue < 1){
		alert("Days cannnot be less than 1");
		document.getElementById(inputId).value = "1";
	}
	//checking the input value if it is equal or more than 120
	else if(inputValue > 120){
		alert("Days cannot be more than 120");
		document.getElementById(inputId).value = "1";
	}

	let perDayPrice = document.getElementById(priceId).innerText;
	let rentalDaysArray = [];
	let rentalDays = {
		'inputDays': inputValue,
		'perDayPrice': perDayPrice
	};

	//storing the imput days value and per day price in the session
	rentalDaysArray = JSON.parse(sessionStorage.getItem('pricePerDayArray')) || [];
	rentalDaysArray.push(rentalDays);
	sessionStorage.setItem('pricePerDayArray', JSON.stringify(rentalDaysArray));
}

function proceedToCheckout(){
	let perDayCost = 0;
	let totalCost = 0;

	//Displaying below message if there is no items in the cart.
	if(JSON.parse(sessionStorage.getItem('addedCarsArray')).length == 0){
		alert("No car has been reserved");
		window.location.href = 'carRental.html';
		sessionStorage.removeItem('pricePerDayArray');
	}
	const rentalDaysArray = JSON.parse(sessionStorage.getItem('pricePerDayArray')); 

	//calculating the total rental amount
	if(rentalDaysArray != null){
		for(let i = 0; i < rentalDaysArray.length; i++){
			let perDayPrice = rentalDaysArray[i].perDayPrice;
			perDayPrice = perDayPrice.substring(1);
			let perDayPriceInt = parseInt(perDayPrice);

			let numberOfDays = parseInt(rentalDaysArray[i].inputDays);
				perDayCost = perDayPriceInt * numberOfDays;
				totalCost += perDayCost;
		}

	//storing the total rental price in the session
	sessionStorage.setItem('totalRentalPrice', totalCost);
	window.location.href='checkoutForm.html';
	}	
}







