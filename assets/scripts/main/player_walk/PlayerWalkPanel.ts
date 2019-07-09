import { RoadManager } from '../robot_run/RoadManger';
import { MainScene } from '../MainScene';
import { Player } from './Player';

const { ccclass, property } = cc._decorator;

@ccclass
export class PlayerWalkPanel extends cc.Component {

    @property(RoadManager)
    roadManager: RoadManager = null;
    @property(Player)
    player: Player = null;
    @property(cc.Node)
    walkButton: cc.Node = null;

    start() {
        this.roadManager.init().setDistanceCb(this.onTargetDistance, this);
        this.walkButton.on(cc.Node.EventType.TOUCH_START, this.onWalkStart, this);
        this.walkButton.on(cc.Node.EventType.TOUCH_END, this.onWalkEnd, this);
        this.walkButton.on(cc.Node.EventType.TOUCH_CANCEL, this.onWalkEnd, this);
    }

    onWalkStart() {
        this.roadManager.startMove();
        this.player.startMove();
    }

    onWalkEnd() {
        this.roadManager.stopMove();
        this.player.stopMove();
    }

    onTargetDistance() {
        MainScene.instance.onPlayerMoveFinish();
    }
}