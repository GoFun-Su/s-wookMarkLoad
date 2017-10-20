/**
 * 主要思路就是根据当前最低的那个元素进行排列，一般是最低的，但是如果最低的和第一个相差不到20px,就按第一个算是最低的
 */
(function($){
	//配置参数
	var defaults = {
		col: 4,	//总列数
		minHeightSpace: 0
	};
	
	var WookMarkLoad = function(element,options){
		//配置全局变量
		var 	opts = options,
			$document = $(document),
			//当前指向的标签元素
			$parent = $(element),
           			 wParent = $parent.width(),
           			 //当前的瀑布流子容器
            		$child = $parent.children(),
		   	 //子容器的宽度
		   	 wChild = $child.width(),
		   	 //当前列数
		    	col = opts.col,
		    	//计算间距，两个 盒子之间的间距
		    	wSpace = (wParent-wChild*col)/(col-1),
		    
		    	//一行最低的的和第一个达到某个高度按第一个排列而不是最低的那个排列
		    	wMinHeightSpace = opts.minHeightSpace,
		    	//设置数组，保存每列的高度和
		    	heightArr = new Array(col), i=heightArr.length;
			while(i--){heightArr[i] = 0;}
			
			$.each($child,function(i,item){
				var $item = $(item),
				height = $item.height(),
			
		   	 //假设索引为0 的是最低的
			index = 0,
			minHeight = heightArr[0];
			//遍历数组，找到最小值和最小值对应的索引
            		$.each(heightArr,function(i,value){
               			 if(minHeight > value){
                    				index = i;
                   				 minHeight = value;
                			}
            		});
	           		 //如果第一列和最小的一列差距小于wMinHeightSpace，最低的为第一列
	        		 if(heightArr[0] -minHeight <= wMinHeightSpace){
	              		index = 0;
	              		minHeight = heightArr[0];
	          		}
	          		//定位
	          		$item.css({
	            		//当前列的高度加上间距，因为每次循环都是找最低的高度进行放置的 或者minHeight+ wSpace
	               	 	top:heightArr[index] + wSpace, 
	                		left:index * (wChild + wSpace)
	           		 })
	          
	         		//当前数组中最小的高度进行新的高度的更新minHeight[index] + wSpace + height;
            		heightArr[index] = heightArr[index] + wSpace + height;
            
			})
			//设置父容器的高度
        			var maxHeight = heightArr[0];
        			$.each(heightArr,function(i,value){
            			if(maxHeight < value){
                			maxHeight = value;
            		}
        			});
        			//给父容器设置最高的高度
        			$parent.height(maxHeight);
		
		};
	
	$.fn.wookMarkLoad = function(options){
		var options = $.extend({},defaults,options);
		return this.each(function(){
			new WookMarkLoad(this, options);
		});
	};
}(jQuery))