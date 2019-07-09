import { MainScene } from '../MainScene';

const { ccclass, property } = cc._decorator;

@ccclass
export class FinalPanel extends cc.Component {

    @property(cc.Node)
    step1: cc.Node = null;
    @property(cc.Node)
    step2: cc.Node = null;

    start() {
        this.step1.on(cc.Node.EventType.TOUCH_END, () => {
            this.step1.destroy();
        }, this);
        this.step2.on(cc.Node.EventType.TOUCH_END, () => {
            MainScene.instance.onFinalFinish();
        }, this);
    }

}
