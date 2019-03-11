//==================================================\\
//	WAITER											\\
//==================================================\\
$(document).ready(function()
{
    var tableClicked = 1;
});

function changeTableButtonText(tableClicked)
{
	tableSelector.innerHTML = "Start/Edit order for Table " + tableClicked;
	menuTitleNum.innerHTML = "Order for Table " + tableClicked;
}

// Print page
function printFunction() {
	window.print();
}
