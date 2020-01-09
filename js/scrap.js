/* function onQuerySucceeded(data,sender, args) {
		 
				var listItemInfo = [];
				 alert("ID: Title\n"+itemArray.join("\n"));
				console.log(listItemInfo);
				var clientContext = new SP.ClientContext.get_current();					
				var context = SP.ClientContext.get_current();
		      			
				
				var listItemEnumerator = collListItem.getEnumerator();
				while (listItemEnumerator.moveNext()) {
				     var oListItem = listItemEnumerator.get_current();
				     //console.log(oListItem);
				     
				     /listItemInfo += '{ID:  ' + oListItem.get_id() +','+
 
						        ' Title: ' + oListItem.get_item('Title') +','+
						 
						        ' Item: ' + oListItem.get_item('items') +','+
						 
						        ' price: ' + oListItem.get_item('Price') +
						 
						        '},';/
						        
						    var item = oListItem.get_item('items');
						    var price = oListItem.get_item('Price');
						    
						    listItemInfo.push("Item:"item +","+"Price:"price);
				 
			   }		
			   	   // items=[];
			   								
					//items.push(listItemInfo);
					
					//console.log(items);
						
					
						
			  }
			
	    function onQueryFailed(sender, args) {
				alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
			}*/