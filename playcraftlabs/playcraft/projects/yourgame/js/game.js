/**
 * A sample game.js for you to work from
 */

TheGame = pc.Game.extend('TheGame',
    { },
    {
        gameScene:null,
        menuScene:null,
        loadingScene:null,
        loadingLayer:null,

        onReady:function ()
        {
            this._super();

            // disable caching when developing
            // if (pc.device.devMode)
            //    pc.device.loader.setDisableCache();

            // no resources are loaded in this template, so this is all commented out
            // pc.device.loader.add(new pc.Image('an id', 'images/an image.png'));

            //if (pc.device.soundEnabled)
            //   pc.device.loader.add(new pc.Sound('fire', 'sounds/fire', ['ogg', 'mp3'], 15));

           pc.device.loader.add(new pc.Image('player', 'images/playersprite.png'));
           pc.device.loader.add(new pc.DataResource('Level1', 'data/Level1.tmx'))
           pc.device.loader.add(new pc.Image('jits', 'images/jits.png'));
           this.loadingScene = new pc.Scene();
            this.loadingLayer = new pc.Layer('loading');
            this.loadingScene.addLayer(this.loadingLayer);
            pc.device.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
        },

        onLoading:function (percentageComplete)
        {
            var ctx = pc.device.ctx;
            ctx.clearRect(0,0,pc.device.canvasWidth, pc.device.canvasHeight);
            ctx.font = "normal 50px Times";
            ctx.fillStyle = "#bbb";
            ctx.fillText('TJSXx Game', 40, (pc.device.canvasHeight / 2)-50);
            ctx.font = "normal 14px Verdana";
            ctx.fillStyle = "#777";
            ctx.fillText('Loading: ' + percentageComplete + '%', 40, pc.device.canvasHeight/2);
        },

        onLoaded:function ()
        {
            // create the game scene (notice we do it here AFTER the resources are loaded)
            this.gameScene = new GameScene();
            this.addScene(this.gameScene);

            // create the menu scene (but don't make it active)
            this.menuScene = new MenuScene();
            this.addScene(this.menuScene, false);

            // resources are all ready, start the main game scene
            // (or a menu if you have one of those)
            this.activateScene(this.menuScene);
        },

        activateMenu:function()
        {
            this.deactivateScene(this.gameScene);
            this.activateScene(this.menuScene);
        },

        deactivateMenu:function()
        {
            this.deactivateScene(this.menuScene);
            this.activateScene(this.gameScene);
        }
    });
