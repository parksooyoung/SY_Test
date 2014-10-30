
var HelloWorldLayer = cc.Layer.extend({
	sprite:null,
	shapes:[],
	scot:[],
	color:[],
	drawNode:null,
	ctor:function () {
		
		this._super();

		var size = cc.winSize;
		var drawSel = 0;//초기값.
		var colorSel;
		
		var bg = new cc.Sprite("res/bg2.jpg");
		bg.x = size.width / 2;
		bg.y = size.height / 2;
		this.addChild(bg);
		
		var lineItem = new cc.MenuItemImage(
				"res/Line.png",
				"res/Line_Selected.png",
				function () {//-> select 변수 숫자로 지정. 그림 그리기 카운트 만들어서 지정하기.
					drawSel = 1;
					cc.log("drawSel = 1");
				}, this);

		var menu = new cc.Menu(lineItem);
		menu.x = 50;
		menu.y = 400;
		this.addChild(menu,1);
		
		var freelineItem = new cc.MenuItemImage(
				"res/freeLine.png",
				"res/freeLineSelected.png",
				function() {
					drawSel = 2;
					cc.log("drawSel = 2");
				}, this);

		var menu1 = new cc.Menu(freelineItem);
		menu1.x = 50;
		menu1.y = 340;
		this.addChild(menu1,1);
		
		var rectItem = new cc.MenuItemImage(
				"res/Rect.png",
				"res/RectSelected.png",
				function() {
					drawSel = 3;
					cc.log("drawSel = 3");
				}, this);

		var menu2 = new cc.Menu(rectItem);
		menu2.x = 50;
		menu2.y = 280;
		this.addChild(menu2,1);
		
		var circleItem = new cc.MenuItemImage(
				"res/Circle.png",
				"res/CircleSelected.png",
				function(){
					drawSel = 4;
					cc.log("drawSel = 4");
				}, this);
		
		var menu3 = new cc.Menu(circleItem);
		menu3.x = 50;
		menu3.y = 220;
		this.addChild(menu3,1);
		
		var undoItem = new cc.MenuItemImage(
				"res/undo.png",
				"res/undoSelected.png",
				 this.undo, this);

		var menu4 = new cc.Menu(undoItem);
		menu4.x = 50;
		menu4.y = 160;
		this.addChild(menu4,1);
		
		var Red = new cc.MenuItemImage(
				"res/Red.png",
				"res/Red.png",
				function(){
					colorSel = cc.color(255,0,0);
				}, this);

		var redmenu = new cc.Menu(Red);
		redmenu.x = 110;
		redmenu.y = 400;
		this.addChild(redmenu,1);
		
		var Green = new cc.MenuItemImage(
				"res/Green.png",
				"res/Green.png",
				function(){
					colorSel = cc.color(0,255,0);
				}, this);

		var greenmenu = new cc.Menu(Green);
		greenmenu.x = 110;
		greenmenu.y = 340;
		this.addChild(greenmenu,1);
		
		var Blue = new cc.MenuItemImage(
				"res/Blue.png",
				"res/Blue.png",
				function(){
					colorSel = cc.color(0,0,255);
				}, this);

		var bluemenu = new cc.Menu(Blue);
		bluemenu.x = 110;
		bluemenu.y = 280;
		this.addChild(bluemenu,1);
		
		var Yellow = new cc.MenuItemImage(
				"res/Yellow.png",
				"res/Yellow.png",
				function(){
					colorSel = cc.color(255,255,0);
				}, this);

		var yellowmenu = new cc.Menu(Yellow);
		yellowmenu.x = 110;
		yellowmenu.y = 220;
		this.addChild(yellowmenu,1);
		
		var Black = new cc.MenuItemImage(
				"res/Black.png",
				"res/Black.png",
				function(){
					colorSel = cc.color(0,0,0);
				}, this);

		var blackmenu = new cc.Menu(Black);
		blackmenu.x = 110;
		blackmenu.y = 160;
		this.addChild(blackmenu,1);
		
		this.drawNode = new cc.DrawNode();
		this.addChild(this.drawNode);
		
		var line_listener = cc.EventListener.create({
				event:cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches:true,
				onTouchBegan:function(touch,event){
					
					return true;
				},
				onTouchMoved:function(touch,event){
					if(drawSel == 2){
						//cc.log(scot);
						var p1 = touch.getPreviousLocation();
						var p2 = touch.getLocation();
						event.getCurrentTarget().shapes.push(p1,p2);
						event.getCurrentTarget().scot.push(2);
						event.getCurrentTarget().color.push(colorSel);
						event.getCurrentTarget().drawNode.drawSegment(p1,p2,2,colorSel);
						return true;
					}
				},
				onTouchEnded:function(touch,event){
					if(drawSel == 1){
						
						//cc.log(scot);
						var p1 = touch.getStartLocation();
						var p2 = touch.getLocation();
						event.getCurrentTarget().shapes.push(p1,p2);
						event.getCurrentTarget().scot.push(1);
						event.getCurrentTarget().color.push(colorSel);
						event.getCurrentTarget().drawNode.drawSegment(p1,p2,2,colorSel);
						return true;
					}
					else if(drawSel == 2)
						event.getCurrentTarget().scot.push(0);
					else if(drawSel == 3){
						
						//cc.log(scot);
						var p1 = touch.getStartLocation();
						var p2 = touch.getLocation();
						event.getCurrentTarget().shapes.push(p1,p2);
						event.getCurrentTarget().scot.push(3);
						event.getCurrentTarget().color.push(colorSel);
						event.getCurrentTarget().drawNode.drawRect(p1,p2,colorSel,2,colorSel);
						return true;
					}
					else if(drawSel == 4){
						var p1 = touch.getStartLocation();
						var p2 = touch.getLocation();
						var center=p1;
						center.x = (p1.x+p2.x)/2;
						center.y = (p1.y+p2.y)/2;
						var radius = Math.sqrt(Math.pow(Math.abs(p1.x-p2.x),2) + Math.pow(Math.abs(p1.y-p2.y),2));
						event.getCurrentTarget().shapes.push(center,radius);
						event.getCurrentTarget().scot.push(4);
						event.getCurrentTarget().color.push(colorSel);
						event.getCurrentTarget().drawNode.drawCircle(center,radius,360,360,false,2,colorSel);
						return true;
					}
				}
			});
			
		cc.eventManager.addListener(line_listener, this);
		
		                                     
		
		return true;
	},
	undo: function(){
		cc.log(this.scot);
		if(this.scot[this.scot.length-1] == 0){
				this.scot.pop();
			while(this.scot[this.scot.length-1]==2){
				this.shapes.pop();
				this.shapes.pop();
				this.scot.pop();
				this.color.pop();
			}
		}
		else{
			this.shapes.pop();
			this.shapes.pop();
			this.scot.pop();
			this.color.pop();
		}
		cc.log(this.scot);
		this.drawNode.clear();
		for(var i = 0; i<this.shapes.length;i+=2){
					if(this.scot[i/2] == 1)
						this.drawNode.drawSegment(this.shapes[i],this.shapes[i+1],2,this.color[i/2]);
					else if(this.scot[i/2] == 2)
						this.drawNode.drawSegment(this.shapes[i],this.shapes[i+1],2,this.color[i/2]);
					else if(this.scot[i/2] == 3)
						this.drawNode.drawRect(this.shapes[i],this.shapes[i+1],this.color[i/2],2,this.color[i/2]);
					else if(this.scot[i/2] == 4)
						this.drawNode.drawCircle(this.shapes[i],this.shapes[i+1],360,360,false,2,this.color[i/2]);
		}
	}
});

var HelloWorldScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new HelloWorldLayer();
		this.addChild(layer);
	}
});

