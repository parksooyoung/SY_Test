
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var starLabel = cc.LabelTTF("Hello라벨추가");
        starLabel.x = this.width/2;
        starLabel.y = this.height/2;
        var starSprite = new cc.Sprite("res/1.jpg");
        starSprite.scale = 0.2;
        starSprite.x = this.width/2;
        starSprite.y = this.height/2;
        this.addChild(starSprite);
        this.addChild(starLabel);
       
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

