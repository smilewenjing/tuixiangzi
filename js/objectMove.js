var guanka = 1;
var count = 0;		//总行数/总列数（它们是相等的），用来计算下标
var point = 0;		//终点的个数，用来判断是否完成关卡
var flag = false;   //控制的小人是否占据终点位置，用来判断，如果占据了终点，小人移出时终点要恢复原来的样子
var anjian = false; 
	
function setCount(cnt){
	count = cnt;
}

function setPoint(pnt){
	point = pnt;	
}

$(document).ready(function(){
     $("#guanka1").click(function(){
            anjian=true;
            guanka=0;
            isGameOver();
            console.log("1");
            });
    $("#guanka2").click(function(){
            anjian=true;
            guanka=1;
            isGameOver();
            console.log("2");
            });
    $("#guanka3").click(function(){
    		anjian=true;
            guanka=2;
            isGameOver();
            });
    $("#guanka4").click(function(){
            anjian=true;
            guanka=3;
            isGameOver();
            });
    $("#guanka5").click(function(){
            anjian=true;
            guanka=4;
            isGameOver();
            });

});
//按下键盘上的上下左右光标键时，触发函数，进行游戏规则判断
window.onkeydown = function(e){
	var theEvent = window.event || e;  //由于火狐不支持event，所以用这种写法来兼容火狐【e就是event】
	var keyCode = theEvent.keyCode;
	//左
	if(keyCode == 37){
		var cls = $(".user").prev().attr("class"); //获取人物左边的DIV
		//如果左边是空白区域就把人物移动到该区域，把人物的div变成空白区域【就是调换一下位置】
		//空白区域特征就是div的class是smailDiv
		if(cls=="smailDiv"){
			//判断人物是否占据了终点位置，如果是，则人物的div变成终点
			if(flag){
				$(".user").addClass("endPoint");
				flag = false;
			}
			$(".user").prev().addClass("user"); //上一个元素变成人物（加上特征class=user）
			$(".user:last").removeClass("user");//原来的元素去掉人物特征
			
		}
		//如果人物的左边是终点区域，并且该位置没有被箱子占据，则把人物移动到终点位置
		if(cls.indexOf("endPoint") >= 0 && cls.indexOf("box") < 0){
			//先判断人物是否占据着终点位置，如果是，则人物的div变成终点
			if(flag){
				$(".user").addClass("endPoint");
				flag = false;
			}
			$(".user").prev().addClass("user");
			$(".user").prev().removeClass("endPoint");
			$(".user:last").removeClass("user");
			flag = true;
		}
		//如果人物的左边是箱子，则要判断是否需要推动
		if(cls.indexOf("box") >= 0){
			var leftCls = $(".user").prev().prev().attr("class");
			//如果人物左边的箱子的左边是地板区域或终点（该终点不能被其他箱子占用），则把箱子推到该位置
			if(leftCls=="smailDiv" || (leftCls.indexOf("endPoint")>=0 && leftCls.indexOf("box") < 0)){
				if(flag){
					$(".user").addClass("endPoint");
					flag = false;
				}
				if(cls.indexOf("endPoint") >= 0){
					$(".user").prev().removeClass("endPoint");
					flag = true;
				}
				//$(".user").prev().prev().removeClass("endPoint");
				$(".user").prev().prev().addClass("box");
				$(".user").prev().removeClass("box");
				$(".user").prev().addClass("user");
				$(".user:last").removeClass("user");
			}
		}
	}
	//与上类似，不再注释
	if(keyCode == 38){
		var arr = $(".smailDiv");
		var index = 0;
		for(var i=0;i<arr.length;i++){
			var cls = $(arr[i]).attr("class");
			if(cls.indexOf("user") >= 0){
				index = i;
				break;
			}
		}
		index = index - count;
		var cls = $(arr[index]).attr("class");
		if(cls == "smailDiv"){
			//空白区域
			if(flag){
				$(".user").addClass("endPoint");
				flag = false;
			}
			$(".user").removeClass("user");
			$(arr[index]).addClass("user");
		}
		if(cls.indexOf("endPoint") >= 0 && cls.indexOf("box") < 0 ){
			//终点区域
			if(flag){
				$(".user").addClass("endPoint");
				flag = false;
			}
			$(arr[index]).addClass("user");
			$(arr[index]).removeClass("endPoint");
			$(".user:last").removeClass("user");
			flag = true;
			
		}
		if(cls.indexOf("box") >= 0){
			var topCls = $(arr[index-count]).attr("class");
			if(topCls=="smailDiv" || (topCls.indexOf("endPoint")>=0 && topCls.indexOf("box") < 0)){
				//空白区域
				if(flag){
					$(".user").addClass("endPoint");
					flag = false;
				}
				if(cls.indexOf("endPoint") >= 0){
					$(arr[index]).removeClass("endPoint");
					flag = true;
				}
				//$(arr[index-count]).removeClass("endPoint");
				$(arr[index-count]).addClass("box");
				$(arr[index]).removeClass("box");
				$(arr[index]).addClass("user");
				$(".user:last").removeClass("user");
			}
		}
	}
	if(keyCode == 39){
		var cls = $(".user").next().attr("class");
		if(cls=="smailDiv"){
			//空白区域
			if(flag){
				$(".user").addClass("endPoint");
				flag = false;
			}
			$(".user").next().addClass("user");
			$(".user:first").removeClass("user");
		}
		if(cls.indexOf("endPoint") >= 0 && cls.indexOf("box") < 0){
			//终点区域	
			if(flag){
				$(".user").addClass("endPoint");
				flag = false;
			}
			$(".user").next().addClass("user");
			$(".user").next().removeClass("endPoint");
			$(".user:first").removeClass("user");
			flag = true;
		}
		if(cls.indexOf("box") >= 0){
			var rightCls = $(".user").next().next().attr("class");
			if(rightCls=="smailDiv" || (rightCls.indexOf("endPoint")>=0 && rightCls.indexOf("box") < 0)){
				//空白区域
				if(flag){
					$(".user").addClass("endPoint");
					flag = false;
				}
				if(cls.indexOf("endPoint") >= 0){
					$(".user").next().removeClass("endPoint");
					flag = true;
				}
				//$(".user").next().next().removeClass("endPoint");
				$(".user").next().next().addClass("box");
				$(".user").next().removeClass("box");
				$(".user").next().addClass("user");
				$(".user:first").removeClass("user");
			}
		}
	}
	if(keyCode == 40){
		var arr = $(".smailDiv");
		var index = 0;
		for(var i=0;i<arr.length;i++){
			var cls = $(arr[i]).attr("class");
			if(cls.indexOf("user") >= 0){
				index = i;
				break;
			}
		}
		index = index + count;
		
		var cls = $(arr[index]).attr("class");
		if(cls == "smailDiv"){
			//空白区域
			if(flag){
				$(".user").addClass("endPoint");
				flag = false;
			}
			$(".user").removeClass("user");
			$(arr[index]).addClass("user");
		}
		if(cls.indexOf("endPoint") >= 0 && cls.indexOf("box") < 0){
			//终点区域	
			if(flag){
				$(".user").addClass("endPoint");
				flag = false;
			}
			$(arr[index]).addClass("user");
			$(arr[index]).removeClass("endPoint");
			$(".user:first").removeClass("user");
			flag = true;
		}
		if(cls.indexOf("box") >= 0){
			var bottomCls = $(arr[index+count]).attr("class");
			if(bottomCls=="smailDiv" || (bottomCls.indexOf("endPoint")>=0 && bottomCls.indexOf("box") < 0)){
				//空白区域	
				if(flag){
					$(".user").addClass("endPoint");
					flag = false;
				}
				if(cls.indexOf("endPoint") >= 0){
					$(arr[index]).removeClass("endPoint");
					flag = true;
				}
				//$(arr[index+count]).removeClass("endPoint");
				$(arr[index+count]).addClass("box");
				$(arr[index]).removeClass("box");
				$(arr[index]).addClass("user");
				$(".user:first").removeClass("user");
			}
		}
	}
	
	isGameOver();
}


//地图：1表示空白地区，2表示墙，3表示地板，4表示终点，5表示箱子，6表示小人儿
function isGameOver(){
	var ends = $(".endPoint.box");

	if(ends != null && ends.length == point||anjian){
		if(guanka==0){
			//加载第一关地图
			var map = "11222111,11242111,11232222,22253542,24356222,22225211,11124211,11122211";
			loadMap(map);
			guanka =1;
		}else if(guanka==1){
			//加载第二关地图
			var map = "222221111,263321111,235521222,235321242,222322242,122333342,123332332,123332222,122222111";
			loadMap(map);
			guanka =2;
		}else if(guanka == 2){
			guanka = 3;
			var map = "12222111,12632221,12353321,22232322,24232332,24533232,24333532,22222222";
			loadMap(map);
		}else if(guanka == 3){
			guanka = 4;
			var map = "1222222211,1233333222,2252223332,2363533532,2344235322,2244233321,1222222221";
			loadMap(map);
		}else if(guanka == 4){
			guanka = 5;
			var map = "11222211,11244211,12234221,12335421,22353322,23325532,23363332,22222222";
			loadMap(map);
		}
	}
	anjian=false;
}