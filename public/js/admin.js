$(document ).ready( () =>{
	$("#saveProduct").click(e =>{
		e.preventDefault();
		const toSend = [];
		$('#adminTable tr').each(function(){
			const id = $(this).attr("id");
			let row = {};
			$(this).find('input').each(function(i,l){
				if(l.className === "form-control"){
					row.productName= l.value;
				}else{
					row.price = parseFloat(l.value);
				}
			})
			row.category = $(this).find("select").children("option:selected").val();
			toSend.push({id,data :row});
		})
		console.log(toSend);
		$.ajax({
			dataType: 'json',
			contentType: 'application/json',
			url: '/admin',
			type: 'PUT',
			data : JSON.stringify(toSend)
		});
	});
});