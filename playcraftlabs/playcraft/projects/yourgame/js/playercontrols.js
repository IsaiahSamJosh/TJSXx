PlayerControlSystem = pc.systems.Input.extend('PlayerControlSystem',
    { },
    {

        init:function () {
            this._super([ 'input' ], 60);
        },

        onAction:function (actionName, event, pos, uiTarget) {
            // pass
        },

        process:function (entity) {
            this._super(entity);

            if (entity.hasTag('player')) {
                if (this.isInputState(entity, 'moving left')) {
                    entity.getComponent('physics').applyImpulse(.1, 180);
                } else if (this.isInputState(entity, 'moving right')) {
                    entity.getComponent('physics').applyImpulse(.1, 0);
                }
            }
        }
    });
