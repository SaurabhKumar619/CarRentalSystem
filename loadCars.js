$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'cars.xml',
        dataType: 'xml',    
            success: function(xml) {
                $(xml).find('category').each(function(index) {
                 var buttonID = $(this).find('id').text();
                 // Append new data to the DIV element.
                 const carLength = $(xml).find('category').length;
                 $('.row').append(
                    '<div class="col-sm-3 justify-content-around carContainer">' +
                       '<img src= '+$(this).find('image').text()+' alt="carImage" class="carLoadImage">' +
                    '</img>'+
                    '<input type="hidden" class="carDetails">' +
                        '<p>' + $(this).find('brand').text() + '-' + $(this).find('model').text() +
                            '-' + $(this).find('model-year').text() + '</p> ' +
                    '</input>'+
                    '<input type="hidden" class="mileage">' +
                        '<div style = "display: inline-flex;"><b>Mileage: </b>' +
                            '<span id="mileage_'+ index +'">' + $(this).find('mileage').text() + 
                                '</span></div> ' + 
                    '</input>'+ '<br>'+
                    '<input type="hidden" class="fuelType">' +
                        '<div style = "display: inline-flex;"><b>Fuel Type: </b>' +
                            '<span id="fuelType_'+ index +'">' + $(this).find('fuel-type').text() +
                                '</span></div>' +
                    '</input>'+'<br>'+
                     '<input type="hidden" class="seats">' +
                        '<div style = "display: inline-flex;"><b>Seats: </b>' +
                            '<span id="seats_'+ index +'">' + $(this).find('seats').text() +
                                '</span></div>' +
                    '</input>' + '<br>'+
                    '<input type="hidden" class="price">' +
                        '<div style = "display: inline-flex;"><b>Price per day: </b>' +
                            '<span id="priceperday_'+ index +'">' + $(this).find('price_per_day').text() + 
                            '</span></div>' +
                    '</input>'+ '<br>'+
                    '<input type="hidden" class="availability">' +
                        '<div style = "display: inline-flex;"><b>Availability: </b>' +
                            '<span id="availability_' + index + '">' + $(this).find('availability').text() +
                             '</span></div>' +
                    '</input>'+ '<br>'+
                    '<input type="hidden">' + 
                        '<p class="description"><b>Description: </b>' +
                            $(this).find('description').text() + '</p> ' +
                    '</input>'+ 
                        '<button type = "submit" id = '+buttonID+'  onclick = "addingToCart('+buttonID+')" class="btn btn-primary addCart">' +
                        '<b>Add to cart </b> ' +
                    '</div>');
                });
            },
    });

});

setInterval( function () {
    updateAvailabliltyData()
}, 2000 );

function updateAvailabliltyData() {
     $.ajax({
        type: 'GET',
        url: 'cars.xml',
        dataType: 'xml',    
            success: function(xml) {
                // ajax call to update the values on the home page once it has been changed in xml without refreshing
                $(xml).find('category').each(function(index) {
                    let getUpdatedAvailability = $(this).find('availability').text();
                    let getUpdatedFuelType = $(this).find('fuel-type').text();
                    let getUpdatedPerDayPrice = $(this).find('price_per_day').text();
                    let getUpdateMileage = $(this).find('mileage').text();
                    let getUpdatedSeats = $(this).find('seats').text();
                    let getExistingAvailability = $('#availability_'+index).html();
                    let getExistingFuelType = $('#fuelType_'+index).html();
                    let getExistingPricePerDay = $('#priceperday_'+ index).html();
                    let getExistingMileage = $('#mileage_'+ index).html();
                    let getExistingSeats = $('#seats_'+ index).html();

                    //if the values are updated in xml the home page is storing the updated value
                    if(getUpdatedAvailability !== getExistingAvailability) {
                        $('#availability_'+index).text(getUpdatedAvailability);
                    }
                    if(getUpdatedFuelType !== getExistingFuelType){
                        $('#fuelType_'+index).text(getUpdatedFuelType);
                    }
                    if(getUpdatedPerDayPrice !== getExistingPricePerDay){
                        $('#priceperday_'+ index).text(getUpdatedPerDayPrice);
                    }
                    if(getUpdateMileage !== getExistingMileage){
                        $('#mileage_'+ index).text(getUpdateMileage);
                    }
                    if(getUpdatedSeats !== getExistingSeats){
                        $('#seats_'+ index).text(getUpdatedSeats);
                    }
            });
        }
    });
};
    

function addingToCart(id){
    var flag = 0;
	$.ajax({
        type: 'GET',
        url: 'cars.xml',
        dataType: 'xml',    
            success: function(xml) {
                //adding all the required data in the cart using ajax call
                $(xml).find('category').each(function() {
	                if(String(id) === $(this).find('id').text()) {
	                	if($(this).find('availability').text() === "True") {
                            //creating an array to store the value in the session
	                		let addedCarsArray = [];
	                		let addedCar = {
	                		'id': id,
	                		'image': $(this).find('image').text(),
	                		'price_per_day': $(this).find('price_per_day').text(),
	                		'model_year': $(this).find('model-year').text(),
	                		'brand': $(this).find('brand').text(),
	                		'model': $(this).find('model').text(),
                            'modelBrandYear': $(this).find('model').text()+'-'+$(this).find('brand').text()+'-'+$(this).find('model-year').text(),
                            'mileage': $(this).find('mileage').text(),
                            'fuelType': $(this).find('fuel-type').text(),
                            'seats': $(this).find('seats').text(),
                            'description': $(this).find('description').text()
	                		};

							// Parse the serialized data back into an aray of objects
							addedCarsArray = JSON.parse(sessionStorage.getItem('addedCarsArray')) || [];
                            for(let i = 0; i < addedCarsArray.length; i++){
                                if(addedCarsArray[i].id == addedCar.id){
                                    alert("You have already added this car in your cart");
                                    flag = 1;
                                    break;
                                }
                            }
                            if (flag == 0) {
                                // Push the new addedCar object into the array
                                addedCarsArray.push(addedCar);

                                // Re-serialize the array back into a string and store it in sessionStorage
                                sessionStorage.setItem('addedCarsArray', JSON.stringify(addedCarsArray));
                                alert("Added to cart succesfully");  
                            }
                            
	                	} else {
	                		alert("Sorry, the car is not available now. Please try other cars");
	                	}
	                }
	             });
            }
        });
};
