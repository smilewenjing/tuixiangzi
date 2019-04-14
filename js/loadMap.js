// JavaScript Document
function loadMap(map){
	var arrs = map.split(",");  //分割地图字符串，得到一个数组，如arrs[0]就是11222111
	$(".mainDiv").children().remove();  //首先清空主场景中的所有元素
	setCount(arrs[0].length);
	var width = arrs[0].length * 64 + "px";  //主场景的总宽度 = 11222111这种数字的个数 * 64像素
	var height = arrs.length * 64 + "px";	 //主场景的总高度 = 数组的长度 * 64像素
	var point = 0;  //终点的个数
	$(".mainDiv").css("width",width).css("height",height); //设置主场景的宽高
	
	//使用双重循环加载场景，外层循环行数
	for(var i=0;i<arrs.length;i++){
		var arr = arrs[i].split("");
		
		//内层循环每行的格子数
		for(var j=0;j<arr.length;j++){
			//每循环一次创建一个小DIV，加上smailDiv的class，该class说明这个div是个地板div
			var newDiv = $("<div />");
			newDiv.addClass("smailDiv");
			var num = Number(arr[j]);
			//拿数字进一步判断该div具体是什么
			switch(num){
			case 1:
				//空白地区
				newDiv.addClass("empty");
				break;
			case 2:
				//墙
				newDiv.addClass("wall");
				break;
			case 3:
				//地板，有默认背景，无需加背景
				break;
			case 4:
				//终点
				point++;
				newDiv.addClass("endPoint");
				break;
			case 5:
				//箱子
				newDiv.addClass("box");
				break;
			case 6:
				newDiv.addClass("user");
				break;
			}
			newDiv.appendTo(".mainDiv");
			
		}
	}
	setPoint(point);
}