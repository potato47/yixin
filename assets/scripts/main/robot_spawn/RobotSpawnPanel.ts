import { MainScene } from '../MainScene';

const { ccclass, property } = cc._decorator;

@ccclass
export class RobotSpawnPanel extends cc.Component {

    @property(cc.Node)
    step1: cc.Node = null;

    start() {
        this.step1.once(cc.Node.EventType.TOUCH_END, () => {
            MainScene.instance.onRobotSpawnFinish();
        }, this);
    }

}
