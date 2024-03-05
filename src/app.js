function handleSearchSubmit(event){
event.preventDefault();
let inputForm = document.querySelector("#input-form");
let cityElement=document.querySelector("#city");
cityElement.innerHTML=inputForm.value
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);