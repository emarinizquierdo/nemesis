


var imageSource = new function(){
	
	
	function _init(){
		
		var dataSource = new kendo.data.DataSource({

            transport: {

                read: {

                    url: "/localImages",

                    dataType: "json"

                }

            },

            pageSize: 12

        });



    $("#pager").kendoPager({

        dataSource: dataSource

    });



    $("#listView").kendoListView({

        dataSource: dataSource,

        template: kendo.template($("#template").html())

    });

	
	
	}
	
	this.init = _init;
	
}

