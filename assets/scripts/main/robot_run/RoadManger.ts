import { MainScene } from '../MainScene';

const { ccclass, property } = cc._decorator;

@ccclass
export class RoadManager extends cc.Component {

    @property([cc.Prefab])
    roadPrefabList: cc.Prefab[] = [];
    @property(cc.Node)
    roadContainer: cc.Node = null;
    @property(cc.Integer)
    speed: number = 100;
    @property(cc.Integer)
    distance: number = 2000;

    isMoving: boolean = false;
    finishCb: Function;
    finishTarget: any;

    init() {
        this.roadContainer.removeAllChildren();
        for (let i = 0; i < 10; i++) {
            this.addRoad();
        }
        return this;
    }

    setDistanceCb(finishCb: Function, finishTarget: any) {
        this.finishCb = finishCb;
        this.finishTarget = finishTarget;
        return this;
    }

    startMove() {
        this.isMoving = true;
        return this;
    }

    stopMove() {
        this.isMoving = false;
    }

    addRoad() {
        const n = Math.random() * this.roadPrefabList.length | 0;
        this.roadContainer.addChild(cc.instantiate(this.roadPrefabList[n]));
    }

    update(dt: number) {
        if (this.isMoving) {
            this.roadContainer.x -= this.speed * dt;
            if (-this.roadContainer.x > this.distance) {
                MainScene.instance.onRobotRunFinish();
                if (this.finishCb && this.finishTarget) {
                    this.finishCb.apply(this.finishTarget);
                }
            }
        }
    }

}