/**
 * GameScene
 * A template game scene
 */
GameScene = pc.Scene.extend('GameScene',
    { },
    {
        gameLayer:null,
        playerLayer:null,
        backgroundLayer:null,
        entityFactory:null,
        levelToStand:null,

        init:function ()
        {
            this._super();
            this.entityFactory= new EntityFactory();
            this.levelToStand=this.get('Tile Layer 1');
            this.loadFromTMX(pc.device.loader.get('ExampleLevel').resource, this.entityFactory);
            this.gameLayer=this.get('player');
            this.gameLayer.setZIndex(2);
            this.backgroundLayer=this.get('Background');
            this.backgroundLayer.setZIndex(1);
            this.playerLayer=this.gameLayer.entityManager.getTagged('PLAYER').first.object();
            // this.boxes = [];

            //-----------------------------------------------------------------------------
            // game layer
            //-----------------------------------------------------------------------------
                           //this refers to the GameScene
            // this.gameLayer = this.addLayer(new pc.EntityLayer('game layer', 10000, 10000));

            // all we need is the render and effects systems
            // this.gameLayer.addSystem(new pc.systems.Render());
            // this.gameLayer.addSystem(new pc.systems.Effects());

            // this.mainChar = pc.Entity.create(this.gameLayer);
            // this.mainChar.addComponent(pc.components.Spatial.create({x:200, y:200});

            /*for (var i = 0; i < 3; i++)
            {
                var box = pc.Entity.create(this.gameLayer);
                box.addComponent(pc.components.Spatial.create({ x:200 + (i * 100), y:200, w:75, h:75 }));
                box.addComponent(pc.components.Rect.create({ color:[ pc.Math.rand(0, 255), pc.Math.rand(0, 255), pc.Math.rand(0, 255) ] }));

                this.boxes.push(box);
            }*/

            // bind some keys/clicks/touches to access the menu
            //pc.device.input.bindAction(this, 'menu', 'ENTER');
            //pc.device.input.bindAction(this, 'menu', 'ESC');
            //pc.device.input.bindAction(this, 'menu', 'MOUSE_BUTTON_LEFT_DOWN');
            //pc.device.input.bindAction(this, 'menu', 'TOUCH');

        },

        // handle menu actions
        onAction:function (actionName, event, pos, uiTarget)
        {
            if (pc.device.game.menuScene.active)
                return true;

            if (actionName === 'menu')
                pc.device.game.activateMenu();

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
