EntityFactory = pc.EntityFactory.extend('EntityFactory',
    { },
    {
        playerSheet:null,
     init:function ()
        {
this.playerSheet=new pc.SpriteSheet({image:pc.device.loader.get('player').resource, frameWidth:80, frameHeight:40,useRotation:false});
this.playerSheet.addAnimation({name: 'walking right', frameCount:8, time:1000});
        },

        createEntity:function (layer, type, x, y, dir, shape, options)
        {
        var e;
        switch(type){
            case 'player': 
                e=pc.Entity.create(layer);
                e.addTag('PLAYER');
                e.addComponent(pc.components.Spatial.create({x:x, y:y, dir:0, w:this.playerSheet.frameWidth, h:this.playerSheet.frameHeight}));
                return e;
                
            throw "Unknown entity type: " + type;
        }
        }
    });
    