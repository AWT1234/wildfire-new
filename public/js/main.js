//==================================================\\
//	WAITER											\\
//==================================================\\
var tableClicked;

document.addEventListener("DOMContentLoaded", function(event)
{
	defaultAllTables();

	//Default to start with table 1
	table1Clicked();

	console.log("Setting up event listeners");
	table1.addEventListener("click", table1Clicked);
	table2.addEventListener("click", table2Clicked);
	table3.addEventListener("click", table3Clicked);
	table4.addEventListener("click", table4Clicked);
	table5.addEventListener("click", table5Clicked);
	table6.addEventListener("click", table6Clicked);
});

function table1Clicked()
{
	tableClicked = 1;
	console.log("Table " + tableClicked + " clicked");
	defaultAllTables();
	table1.style = "border: 2px solid #28a745";
	changeTableButtonText(tableClicked);
}

function table2Clicked()
{
	tableClicked = 2;
	console.log("Table " + tableClicked + " clicked");
	defaultAllTables();
	table2.style = "border: 2px solid #28a745";
	changeTableButtonText(tableClicked);
}

function table3Clicked()
{
	tableClicked = 3;
	console.log("Table " + tableClicked + " clicked");
	defaultAllTables();
	table3.style = "border: 2px solid #28a745";
	changeTableButtonText(tableClicked);
}

function table4Clicked()
{
	tableClicked = 4;
	console.log("Table " + tableClicked + " clicked");
	defaultAllTables();
	table4.style = "border: 2px solid #28a745";
	changeTableButtonText(tableClicked);
}

function table5Clicked()
{
	tableClicked = 5;
	console.log("Table " + tableClicked + " clicked");
	defaultAllTables();
	table5.style = "border: 2px solid #28a745";
	changeTableButtonText(tableClicked);
}

function table6Clicked()
{
	tableClicked = 6;
	console.log("Table " + tableClicked + " clicked");
	defaultAllTables();
	table6.style = "border: 2px solid #28a745";
	changeTableButtonText(tableClicked);
}

function defaultAllTables()
{
	table1.style = "border: 1px solid black";
	table2.style = "border: 1px solid black";
	table3.style = "border: 1px solid black";
	table4.style = "border: 1px solid black";
	table5.style = "border: 1px solid black";
	table6.style = "border: 1px solid black";
}

function changeTableButtonText(table)
{
	tableSelector.innerHTML = "Start/Edit order for Table " + tableClicked;
	menuTitleNum.innerHTML = "Order for Table " + tableClicked;
	tableNum.value = tableClicked;
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
});