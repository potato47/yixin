const { ccclass, property } = cc._decorator;

@ccclass
export class MenuScene extends cc.Component {

    @property(cc.Node)
    playButton: cc.Node = null;

    start() {
        this.playButton.once(cc.Node.EventType.TOUCH_END, () => {
            cc.director.loadScene('main');
        }, this);
    }

}