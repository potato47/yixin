import { RoadManager } from './RoadManger';
import { MainScene } from '../MainScene';
import { RobotCar } from './RobotCar';

const { ccclass, property } = cc._decorator;

@ccclass
export class RobotRunPanel extends cc.Component {

    @property(RoadManager)
    roadManager: RoadManager = null;
    @property(RobotCar)
    robotCar: RobotCar = null;
    @property(cc.Node)
    walkButton: cc.Node = null;

    start() {
        this.roadManager.init()
            .setDistanceCb(this.onTargetDistance, this);
        // this.walkButton.on(cc.Node.EventType.TOUCH_START, this.onWalkStart, this);
        // this.walkButton.on(cc.Node.EventType.TOUCH_END, this.onWalkEnd, this);
        // this.walkButton.on(cc.Node.EventType.TOUCH_CANCEL, this.onWalkEnd, this);
        this.onWalkStart();
    }

    onWalkStart() {
        this.roadManager.startMove();
        this.robotCar.startMove();
    }

    onWalkEnd() {
        this.roadManager.stopMove();
        this.robotCar.stopMove();
    }

    onTargetDistance() {
        MainScene.instance.onRobotRunFinish();
    }
}