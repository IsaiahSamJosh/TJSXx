/**
 * GameScene
 * A template game scene
 */

 CollisionType = {
     PLAYER: 0x00001,
     TILES: 0x00002
 };

GameScene = pc.Scene.extend('GameScene',
    { },
    {
        gameLayer:null,
        playerLayer:null,
        bgLayer:null,
        entityFactory:null,
        tileLayer:null,

        init:function ()
        {
            this._super();
            this.entityFactory = new EntityFactory();
            this.loadFromTMX(pc.device.loader.get('Level1').resource, this.entityFactory);

            // Layers
            this.dbgLayer = this.get('Background');
            this.tileLayer = this.get('Ground');
            this.gameLayer = this.get('hero');


            // Entities
            this.player = this.gameLayer.entityManager.getTagged('PLAYER').first.object();

            // Z positions
            this.dbgLayer.setZIndex(1);
            this.tileLayer.setZIndex(10);
            this.gameLayer.setZIndex(100);

            // Add systems
            this.gameLayer.addSystem(new pc.systems.Render());
            this.gameLayer.addSystem(new pc.systems.Physics({
                gravity: {x:0, y:1},
                tileCollisionMap:{
                    tileMap: this.tileLayer.tileMap,
                    collisionCategory: CollisionType.TILES,
                    collisionMask: CollisionType.PLAYER
                }
            }));




            pc.device.input.bindAction(this, 'menu', 'ESC');

            // Adding player input controls
            this.player.addComponent(pc.components.Input.create(
                {
                    target:this.player,   // probably not necessary, but just to be sure target is player
                    states:[
                        ['moving left', ['LEFT', 'a']],
                        ['moving right', ['RIGHT', 'd']],
                    ]
                }));


        },

        // handle menu actions
        onAction:function (actionName, event, pos, uiTarget)
        {
            if (pc.device.game.menuScene.active)
                return true;

            if (actionName === 'menu') {
                pc.device.game.activateMenu();
            }

            return false; // eat the event (so it wont pass through to the newly activated menuscene
        },

        process:function ()
        {
            // clear the background
            pc.device.ctx.clearRect(0, 0, pc.device.canvasWidth, pc.device.canvasHeight);

            // always call the super
            this._super();

            //
            // ... do extra processing in here
            //
        }
    });
