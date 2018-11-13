	var subtotal = 0;
	var temp =0;
	var cart_items= [];
	var cart_prices=[];
	var count=0;
	var item_name=["Shoe 6","Shoe 5","Shoe 4","shoe 3","Shoe 2","Shoe 1"];
	var prices = [600.99, 100.99 , 100.99, 165.99, 155.99, 185.99];

function add(item)
{
	var num= item;
	cart_prices[count]=prices[num];
	cart_items[count]=item_name[num];
		count++;


	//window.alert(cart_items[count-1]+" added to cart "+count+cart_prices[count-1]);


	show_cart();
};

function show_cart()
{

	var line= "";
	var total=0;

	for(var i=0; i<count; i++)
	{
		total=total+cart_prices[i];
		line= line + cart_items[i] + " " + cart_prices[i] + "<br>";
		
		//window.alert(line);
	}
	var total1=total.toFixed(2);
	line=line+"<br>"+ "Total $"+total1;
	document.getElementById("reciept").innerHTML=line;
};


/* Jquery functions*/

