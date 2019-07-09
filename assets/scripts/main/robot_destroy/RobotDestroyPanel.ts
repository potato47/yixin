import { MainScene } from '../MainScene';

const { ccclass, property } = cc._decorator;

@ccclass
export class RobotDestroyPanel extends cc.Component {

    @property(cc.Node)
    step1: cc.Node = null;
    @property(cc.Node)
    step2: cc.Node = null;
    @property(cc.Node)
    step3: cc.Node = null;

    start() {
        this.step1.once(cc.Node.EventType.TOUCH_END, () => {
            this.step1.destroy();
        }, this);
        this.step2.once(cc.Node.EventType.TOUCH_END, () => {
            this.step2.destroy();
        }, this);
        this.step3.once(cc.Node.EventType.TOUCH_END, () => {
            MainScene.instance.onRobotDestroyFinish();
        }, this);
    }

}
