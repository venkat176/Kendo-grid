$(document).ready(function () {

	var urlId = window.location.href.split('&')[0].split('=')[1];

	retrievingProduts();

	if (isNaN(urlId)) {

		$('#update').hide();
		$('#delete').hide();

		gridData = [];

		itemArray = [];

		//retrievingProduts();

		kendogrid();

	} else {
		retrieveListItems();

		$('#submit').hide();
	}

	$("#mobilenum").kendoMaskedTextBox({
		// mask: "000-000-0000"
	});

	$('#submit').click(function () {

		var name = $("#cname").val();
		var mobnum = $("#mobilenum").val();
		var emailId = $("#email").val();
		var address = $("#addressId").val();
		var gridData;
		var isValid = true;

		if (name.length < 1) {
			$('#cname').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		if (mobnum.length < 1) {
			$('#mobilenum').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		if (emailId.length < 1) {
			$('#email').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		if (address.length < 1) {
			$('#addressId').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		/* if (gridData =[] ) {
		   $('#grid').after('<span class="gerror">This field is required*</span>');
		   isValid = false;
		 }*/

		if (name.length > 1 && !(/^[A-Za-z]+$/.test(name))) {
			$('#cname').after('<span class="error">Please enter valid text in first name</span>');
			isValid = false;
		}

		/* if (mobnum.length >=1 && !(/^\d{10}$/.test(mobnum))) {
		   $('#mobilenum').after('<span class="pherror">Please enter valid phone number</span>');
		   isValid = false;
		}*/

		if (emailId.length > 1 && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))) {
			$('#email').after('<span class="error">Please enter valid email id</span>');
			isValid = false;
		}

		if (isValid) {
			createListItem();
		}

	});

	$('#update').click(function () {

		var name = $("#cname").val();
		var mobnum = $("#mobilenum").val();
		var emailId = $("#email").val();
		var address = $("#addressId").val();
		var gridData;
		var isValid = true;
		if (name.length < 1) {
			$('#cname').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		if (mobnum.length < 1) {
			$('#mobilenum').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		if (emailId.length < 1) {
			$('#email').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		if (address.length < 1) {
			$('#addressId').after('<span class="error">This field is required*</span>');
			isValid = false;
		}

		/* if (gridData =[] ) {
		   $('#grid').after('<span class="gerror">This field is required*</span>');
		   isValid = false;
		 }*/

		if (name.length > 1 && !(/^[A-Za-z]+$/.test(name))) {
			$('#cname').after('<span class="error">Please enter valid text in first name</span>');
			isValid = false;
		}

		/* if (mobnum.length >=1 && !(/^\d{10}$/.test(mobnum))) {
		   $('#mobilenum').after('<span class="pherror">Please enter valid phone number</span>');
		   isValid = false;
		}*/

		if (emailId.length > 1 && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))) {
			$('#email').after('<span class="error">Please enter valid email id</span>');
			isValid = false;
		}

		if (isValid) {
			updateListItem();
		}

	});

	$('#delete').click(function () {

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
		}).then((result) => {
			if (result.value) {
				deleteListItem();
				swalWithBootstrapButtons.fire(
					'Deleted!',
					'Your file has been deleted.',
					'success'
				).then((result) => {
					$(location).attr('href', url)
				})
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				swalWithBootstrapButtons.fire(
					'Cancelled',
					'Your imaginary file is safe :)',
					'error'
				)
			}
		})

	});

	$('#cancel').click(function () {
		var url = "https://xenfoss.sharepoint.com/sites/Registration/Lists/kendoGrida/AllItems.aspx";
		$(location).attr('href', url);
	});

	/*var products = [
			{ product: "Mobile", value: "1", price: "60" },
			{ product: "Watch", value: "2", price: "15" },
			{ product: "Laptop", value: "3", price: "80" },
			{ product: "Headset", value: "4", price: "10" },
			{ product: "Pc", value: "5", price: "70" },
			{ product: "bAg", value: "6", price: "18" },
		];*/


});

function retrievingProduts() {
	var clientContext = new SP.ClientContext.get_current();
	var oList = clientContext.get_web().get_lists().getByTitle('stockDetails');
	var camlQuery = new SP.CamlQuery();
	collListItem = oList.getItems(camlQuery);
	clientContext.load(collListItem);
	clientContext.executeQueryAsync(function () {
		itemArray = [];
		// console.log(itemArray);
		var itemEnumerator = collListItem.getEnumerator();
		while (itemEnumerator.moveNext()) {
			var item = itemEnumerator.get_current();
			var product = item.get_item("items");
			var price = item.get_item("Price");
			var obj = { 'product': product, 'price': price };
			itemArray.push(obj);
		}
	}, function (sender, args) { alert(args.get_message()); });
}

var urlId = window.location.href.split('&')[0].split('=')[1];
// var urlId = urlBase.substring(urlBase.lastIndexOf('=') + 1);
var url = "https://xenfoss.sharepoint.com/sites/Registration/Lists/kendoGrida/AllItems.aspx";

// displayedData = $("#grid").data("kendoGrid").dataSource.data();
//console.log(displayedData);
//var displayedData;
//console.log(displayedData);
//var itemArray;

//var gridData;

//var readgridData;

function kendogrid() {

	gridData;

	// readgridData;

	console.log(gridData);

	var nextId = gridData.length + 1;

	function getIndexById(id) {

		for (var i = 0; i < gridData.length; i++) {
			if (gridData[i].ID == id) {
				return i;
			}
		}
		return null;
	}

	itemArray;

	var dataSource = new kendo.data.DataSource({

		transport: {
			create: function (e) {

				e.data.ID = nextId++;
				console.log(nextId);
				gridData.push(e.data);
				e.success(e.data);

			},
			read: function (e) {
				e.success(gridData);
			},
			update: function (e) {

				gridData[getIndexById(e.data.ID)] = e.data;
				//gridData.forEach((item, index)=>{ item.ID = index+1;});
				e.success();
				//var displayedData = $("#grid").data("kendoGrid").dataSource.data();
				//console.log(displayedData);
				e.error("XHR response", "status code", "error message");

			},
			destroy: function (e) {
				gridData.splice(getIndexById(e.data.ID), 1);
				//gridData.forEach((item, index)=>{ item.ID = index+1; });
				e.success();
				e.error("XHR response", "status code", "error message");
			},
			error: function (e) {
				alert("Status: " + e.status + "; Error message: " + e.errorThrown);
			}
		},
		schema: {
			model: {
				id: "ID",
				fields: {
					ID: { type: "number", editable: false, nullable: true, sortable: false },
					name: { type: "string" },
					quant: { type: "number", filterable: false, sortable: false },
					price: { type: "number", editable: false, filterable: false, sortable: false },
					totalprice: { type: "number", editable: false, filterable: false, sortable: false },
				}
			}
		},
		change: function (e) {
			if (e.action === "itemchange" && e.field !== "totalprice") {
				var model = e.items[0],
					colPrice = model.uid;
				// type = model.Type,
				currentValue = model.quant * productPrice;
				if (currentValue !== model.totalprice) {
					model.totalprice = currentValue;
					$("#grid").find("tr[data-uid='" + model.uid + "'] td:eq(4)").text(currentValue);
				}
				if (productPrice !== model.price) {
					model.price = productPrice;
					$("#grid").find("tr[data-uid='" + model.uid + "'] td:eq(3)").text(productPrice);
				}

			}
		},
		aggregate: [
			{ field: "quant", aggregate: "sum" },
			{ field: "totalprice", aggregate: "sum" }
		],
	});

	$("#grid").kendoGrid({
		dataSource: dataSource,
		pageable: false,
		sortable: true,
		selectable: true,
		toolbar: [{ name: "create", text: "Add" }],
		columns: [
			{ field: "ID", width: "80px" },
			{
				field: "name", title: "Item Name", width: "150px", filterable: true, editor: function (container, options) {
					$('<input id="products" name="" data-bind="value:' + options.field + '"/>')
						.appendTo(container)
						.kendoDropDownList({
							optionLabel: "- Select -",
							dataTextField: "product",
							dataValueField: "product",
							dataSource: itemArray,
							select: function (e) {
								//console.log(e);
								//var dataItem = dataItem(e.item.[]);
								productPrice = e.dataItem.price; // value of the dropdown
								//var productName = e.dataItem.product;				                                
							},
							change: function (e) {

								// var prices = $('#grid').data().kendoGrid.dataSource.data()[0];
								// prices.set('price',productPrice);  
								//$("#grid").find("tr[data-uid='" + colPrice + "'] td:eq(3)").text(productPrice);

								//var locationColumnIndex = grid.wrapp 	er.find(".k-grid-header [data-field=location]).index()");
								//var dataItem = dataSource.get();
								//console.log(dataSource);
								//dataItem.location = newLocation; // Does not trigger a grid redraw as we did not use .set()
								// Update text of cell manually to reflect the change to the dataItem without rebinding the whole grid.
								/*var grid = $("#grid").getKendoGrid();
								var dataSource = grid.dataSource;
								var dataItem = e.dataItem.uid;
								grid.element.find("tr[data-uid='" + dataItem + "'] td:eq(3)").text(productPrice);*/
								//var ddvalue =  $("#grid").data("kendoDropDownList").val();
								//console.log(ddvalue);

								/* var dropdownlist = $("#grid").data("kendoDropDownList");
								 var selectedIndex = dropdownlist.select();
								 console.log(selectedIndex);*/

								// var priceid = e.dataItem,
								//$("#grid").find("tr[data-uid='" + priceid.uid + "'] td:eq(3)").text(10);

								/*var grid = gridElement.data("kendoGrid"),
										 model = grid.dataItem(this.element.closest("tr"));

								 model.set('price',productPrice);*/

								//var destinationDDL = $("select[name^='price']").data("kendoDropDownList");

								//destinationDDL.setDataSource('price');

								/*var dataItem = e.sender.dataItem();
								$("#itemPrice").text(dataItem.price);
								$("#grid").find("tr[data-uid='" + dataItem.uid + "'] td:eq(3)").text(productPrice);
									var price = $("#itemPrice").text(productPrice);
									console.log(price );*/

							}
						});
				}
			},
			{ field: "quant", aggregates: ["sum"], title: "Quantity", width: "90px", },
			{
				field: "price", title: "Price", width: "100px", format: "{0:c}", editor: function (container, options) {
					var input = $('<input data-bind="value:' + options.field + '" name="' + options.field + '" required="required" />');
					input.appendTo(container);
					input.kendoNumericTextBox({ placeholder: "", format: "c" });
				}
			},
			{
				field: "totalprice", aggregates: ["sum"], footerTemplate: "Sum: $#=sum#", title: "Total Price", format: "{0:c}", width: "100px", editor: function (container, options) {
					var input = $('<input data-bind="value:' + options.field + '" name="' + options.field + '" required="required" />');
					input.appendTo(container);
					input.kendoNumericTextBox({ placeholder: "", format: "c" });
				}
			},
			{ command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
		editable: "inline",
		filterable: false

	});

	//displayedData = $("#grid").data("kendoGrid").dataSource.data();

	//console.log(displayedData);

	//var displayedData = $("#grid").data().kendoGrid.dataSource.view().toJSON()

	//displayedDataAsJSON = JSON.stringify(displayedData);

	//console.log(displayedDataAsJSON);
}

function createListItem() {
	var firstname = $('#cname').val();
	var mobileno = $('#mobilenum').val();
	var emailId = $('#email').val();
	var address = $('#addressId').val();

	var listTitle = "kendoGrida";
	context = SP.ClientContext.get_current();
	var oList = context.get_web().get_lists().getByTitle(listTitle);
	var itemCreateInfo = new SP.ListItemCreationInformation();
	this.listItem = oList.addItem(itemCreateInfo);

	//var product = displayedData.r[0].name;

	//console.log(displayedData);

	/*var gData =[];
	
	for(var i=0;i<gridData.length;i++){
		
		var jdata = {"ID":gridData[i].ID,"name":gridData[i].name,"quant":gridData[i].quant,"price":gridData[i].price,"totalprice":gridData[i].totalprice};
		
		gData.push(jdata);	
			
	}*/
	var listjso = JSON.stringify(gridData);
	//console.log(listjso);	

	listItem.set_item('Title', firstname);
	listItem.set_item('CellPhone', mobileno);
	listItem.set_item('EMail', emailId);
	listItem.set_item('WorkAddress', address);
	listItem.set_item('Order_x0020_Details', listjso);
	listItem.update();
	context.load(listItem);
	context.executeQueryAsync(function () {
		//alert('Item created');

		Swal.fire({
			icon: 'success',
			title: 'Good...',
			text: 'Your item has been successfully Created:)',
		}).then((result) => {
			$(location).attr('href', url);
		})

	}, function (sender, args) { alert('Request failed' + args.get_message() + '\n' + args.get_stackTrace()); });
}

function updateListItem() {
	var firstname = $('#cname').val();
	var mobileno = $('#mobilenum').val();
	var emailId = $('#email').val();
	var address = $('#addressId').val();

	var listTitle = "kendoGrida";
	context = SP.ClientContext.get_current();
	var oList = context.get_web().get_lists().getByTitle(listTitle);
	listItem = oList.getItemById(urlId);

	var listjso = JSON.stringify(gridData);

	listItem.set_item('Title', firstname);
	listItem.set_item('CellPhone', mobileno);
	listItem.set_item('EMail', emailId);
	listItem.set_item('WorkAddress', address);
	listItem.set_item('Order_x0020_Details', listjso);
	listItem.update();
	context.load(listItem);
	context.executeQueryAsync(function () {
		//alert('Item updated:');
		Swal.fire({
			icon: 'success',
			title: 'Good...',
			text: 'Your item has been successfully Updated:)',
		}).then((result) => {
			$(location).attr('href', url);
		})
	}, function (sender, args) { alert('Request failed' + args.get_message() + '\n' + args.get_stackTrace()); });
}

function deleteListItem() {
	var clientContext = new SP.ClientContext.get_current();
	var list = clientContext.get_web().get_lists().getByTitle('kendoGrida');
	var listItem = list.getItemById(urlId);
	listItem.deleteObject();
	clientContext.executeQueryAsync(function () {
		//alert('Item deleted');  
	}, function (sender, args) { alert('Could not able to delete item: ' + args.get_message()); });
}

function retrieveListItems() {

	var context = new SP.ClientContext.get_current();
	var ogridList = context.get_web().get_lists().getByTitle('kendoGrida');
	var gridCamlQuery = new SP.CamlQuery();
	gridCamlQuery.set_viewXml("<View><Query><Where>" + "<Eq>" + "<FieldRef Name='ID'/>" + "<Value Type='Number'>" + urlId + "</Value>" + "</Eq>" + "</Where></Query></View>");
	colgridListItem = ogridList.getItems(gridCamlQuery);
	context.load(colgridListItem);
	context.executeQueryAsync(function () {
		var itemEnumerator = colgridListItem.getEnumerator();
		while (itemEnumerator.moveNext()) {
			var item = itemEnumerator.get_current();
			var customername = item.get_item("Title");
			var mobileno = item.get_item("CellPhone");
			var emailid = item.get_item("EMail");
			var address = item.get_item("WorkAddress");
			var gridDt = item.get_item("Order_x0020_Details");
		}
		$('#cname').val(customername);
		$('#mobilenum').val(mobileno);
		$('#email').val(emailid);
		$('#addressId').val(address);

		gridData = [];

		getgridData = JSON.parse(gridDt);

		for (var i = 0; i < getgridData.length; i++) {
			var jdata = { "ID": getgridData[i].ID, "name": getgridData[i].name, "quant": getgridData[i].quant, "price": getgridData[i].price, "totalprice": getgridData[i].totalprice };
			gridData.push(jdata);
		}
		// readgridData = getgridData;

		kendogrid();


	}, function (sender, args) { alert('Retrieve failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });

}
