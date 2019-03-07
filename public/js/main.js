//==================================================\\
//	WAITER											\\
//==================================================\\
$(document).ready(function()
{
    var tableClicked;
});

function changeTableButtonText(tableClicked)
{
	tableSelector.innerHTML = "Start/Edit order for Table " + tableClicked;
	menuTitleNum.innerHTML = "Order for Table " + tableClicked;
}

//==================================================\\
//	ADMIN											\\
//==================================================\\
$(document).ready(function(){
	//change product name and price to input boxes when clicked on
    $(".productDetails").click(function(e) {
        var input = $("<input>", {
            val: $(this).text(),
            type: "<text>" }
        );
        $(this).replaceWith(input);
    });

    //change product name and price to input boxes when button has been pressed
    $("#editProduct").click(function(e){
        e.preventDefault();
        $("span.productDetails").trigger("click");
    });

    //change product category to select box when clicked on
    $(".productDetails2").click(function(e) {
        var input = $("<select><option>Drinks</option><option>Noodle</option><option>Rice</option><option>Western</option></select>", {
            val: $(this).text(),
            type: "<text>" }
        );
        $(this).replaceWith(input);
    });

    //change product category to select box when button has been pressed
    $("#editProduct").click(function(e){
        e.preventDefault();
        $("span.productDetails2").trigger("click");
    });


	$("#editProduct").click(function(){
        document.getElementById('checkbox').style.paddingBotoom = "80px";
    });


});