/**
 * MenuScene
 * A template menu scene
 */
MenuScene = pc.Scene.extend('MenuScene',
    { },
    {
        menuLayer:null,
        menuItems:null,
        currentMenuSelection: 0,

        init:function ()
        {
            this._super();

            this.menuItems = [];
            this.currentMenuSelection = 0;

            //-----------------------------------------------------------------------------
            // menu layer
            //-----------------------------------------------------------------------------
            this.menuLayer = this.addLayer(new pc.EntityLayer('menu layer', 10000, 10000));

            // render system to draw text etc
            this.menuLayer.addSystem(new pc.systems.Render());//gives us sprite, overlay, rect, text, and spatial components
            // we use the scale effect to show which item is highlighted
            this.menuLayer.addSystem(new pc.systems.Effects());//gives us the scale and fade components
            // and the layout system to automatically arrange the menu items on the side of the screen
            this.menuLayer.addSystem(new pc.systems.Layout());//manages the layout of entities

            // handle input
            this.menuLayer.addSystem(new pc.systems.Input());//gives us the input components

            // title
            var title = pc.Entity.create(this.menuLayer);
            title.addComponent(pc.components.Spatial.create({ w:200, h:50 }));
            title.addComponent(pc.components.Layout.create({ vertical:'middle', horizontal:'center', margin:{ left:40, bottom:50 }}));
            //vertical can be 'top', 'middle', 'bottom', horizontal can be 'left', 'center', 'right'
            title.addComponent(pc.components.Text.create({ fontHeight:40, lineWidth:1, strokeColor:'#00FF00', color:'#222288', text:['TJSXx Game'] }));

            // menu
            var menuItemText = ["New Game", "Options", "How to Play"];
            this.menuItems = [];

            for (var i=0; i < menuItemText.length; i++)
            {
                var menuItem = pc.Entity.create(this.menuLayer);

                // notice the layout component doesn't have an x, y (that's because positioning is taken care of
                // by the layout system/component)
                menuItem.addComponent(pc.components.Spatial.create({ w:200, h:40 }));
                menuItem.addComponent(pc.components.Alpha.create({}));
                menuItem.addComponent(pc.components.Layout.create({ vertical:'middle', horizontal:'center', margin:{left:50 }}));
                menuItem.addComponent(pc.components.Text.create({ fontHeight:30, text: [menuItemText[i]] }));

                var fader = pc.components.Fade.create({ fadeInTime:500, fadeOutTime:500, loops:0 });
                //loops equal to 0 makes the effect infinite
                menuItem.addComponent(fader);
                fader.active = false;

                // bind some special actions for touch and mouse click (in process we can then see which action was
                // chosen from the menu
                pc.device.input.bindAction(this, 'execute', 'MOUSE_BUTTON_LEFT_DOWN', menuItem.getComponent('spatial'));
                pc.device.input.bindAction(this, 'execute', 'TOUCH', menuItem.getComponent('spatial'));
                pc.device.input.bindAction(this, 'execute', 'ENTER');
                // add the menu item to our list
                this.menuItems.push(menuItem);
            }
         this.changeMenuSelection(0);
            // map the keyboard controls (but only if we're not touch based)
            pc.device.input.bindAction(this, 'up', 'UP');//should go up and down on the whole menu, not one element
            //that is why these bindActions are not in the for loop
            pc.device.input.bindAction(this, 'down', 'DOWN');
        },

        changeMenuSelection: function(newSelection)
        {
            // remove the fade effect from the currently selected menu item (if it exists)
            var currentMenuItem = this.menuItems[this.currentMenuSelection];
            currentMenuItem.getComponent('fade').active = false;
            currentMenuItem.getComponent('alpha').setAlpha(1);

            // continue fading on the new selection
            var newMenuItem = this.menuItems[newSelection];
            newMenuItem.getComponent('fade').active = true;

            this.currentMenuSelection = newSelection;
        },

        // handle menu actions
        onAction:function (actionName, event, pos, uiTarget)
        {
            if (actionName === 'execute')
            {
                var currentMenuItem = this.menuItems[this.currentMenuSelection];

                switch (currentMenuItem.getComponent('text').text[0])
                {
                    case 'New Game':
                        pc.device.game.deactivateMenu();
                        break;
                }
            }
            if (actionName == 'down' || actionName == 'up')
            {
                var m = this.currentMenuSelection;
                if (actionName == 'down') m++;
                if (actionName == 'up') m--;

                if (m > this.menuItems.length - 1) m = 0;
                if (m < 0) m = this.menuItems.length - 1;

                this.changeMenuSelection(m);
            }

        },

        process:function ()
        {
            // clear the background
            pc.device.ctx.clearRect(0, 0, pc.device.canvasWidth, pc.device.canvasHeight);
            // always call the super
            this._super();
        }

    });
