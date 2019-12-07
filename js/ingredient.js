// API Link
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
// jQuery start
$(document).ready(function() {
    requestApi();
});

// request api
function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => getRecipe(data),
        error: () => console.log("Cannot request data"),
    });
}
// get recipe 
function getRecipe(myData) {
    myData.recipes.forEach(item => {
      // get recipe here: item.name ...
        switch(item.id) {
            case 1:
                eachRecipe(item.iconUrl,item.name, 'recipe');
                eachGuest(item.nbGuests, 'guest', 'primary');
                eachStep(item.instructions, 'step');
                addGuest(item.nbGuests);
                break;
        }
      // ingredient array
      getIngredient(item.ingredients, item.id);
      
    })
}
function getIngredient(ing, recipeId) {
    ing.forEach(item => {
        switch(recipeId) {
            case 1:
                eachIngredient(item, "recipe-one-ingredient");
                break;
        }
    })
}
// get ingredient of each
function eachIngredient(ingredient, elementId) {
    var eachIng = "";
    eachIng += `
        <tr>
            <td><img src="${ingredient.iconUrl}" width="50"></td>
            <td>${ingredient.name}</td>
            <td>${ingredient.quantity}</td>
            <td>${ingredient.unit[0]}</td>
        </tr>
    `;
    $('#' + elementId).append(eachIng);
}

// each recipe
function eachRecipe(recipe, name, elementId) {
    eachRec = "";
    eachRec += `
        <img src="${recipe}" width="100" height="100" class="rounded-circle">
        <strong id="recipe-name">${name}</strong>
    `;
    $('#' + elementId).html(eachRec);
}

// each guest
function eachGuest(myGuest, elementId, color) {
    guest = "";
    guest += `
        <div class="alert alert-${color}">
            <span>សម្រាប់ភ្ញៀវចំនួន ${myGuest}​ នាក់</span>
        </div>
    `;
    $('#' + elementId).html(guest);
}

// each step
function eachStep(step, elementId) {
    var each = "";
    var steps = step.split('<step>');
    for(let i = 1; i < steps.length; i++) {
        each += `<li class="list-group-item" id="stepCook">
                    <strong class="text-primary" id="each-step">Step: ${i}</strong>
                    <br>&nbsp;&nbsp;&nbsp;
                    <span class="font-italic">${steps[i]}</span>
                </li>`;
    }
    $('#' + elementId).html(each);
}

// increase or decrease guest
function addGuest(guests) {   
    var guest = "";
    guest += `
        <div class="input-group mb-3">
            <div class="input-group-append">
                <button class="btn btn-info" type="button" onclick="decrease()">&minus;</button>
            </div>
            <input type="text" class="form-control text-center" value="${guests}" disabled id="member">
            <div class="input-group-append">
                <button class="btn btn-warning" type="button" onclick="increase()">&plus;</button>
            </div>
        </div>
    `;
    $('#add-member').html(guest);
}
// increase guest
function increase() {
    var getGuest = $('#member').val();
    var guest = parseInt(getGuest) + 1;
    if(guest <= 15) {
        $('#member').val(guest);
    }
}
// decrease guest
function decrease() {
    var getGuest = $('#member').val();
    var guest = parseInt(getGuest) - 1;
    if(guest > 0) {
        $('#member').val(guest);
    }
}