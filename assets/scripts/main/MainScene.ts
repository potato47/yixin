import { PlayerWalkPanel } from './player_walk/PlayerWalkPanel';
import { RobotPuzzlePanel } from './robot_puzzle/RobotPuzzlePanel';
import { RobotRunPanel } from './robot_run/RobotRunPanel';
import { RobotMakePanel } from './robot_make/RobotMakePanel';

const { ccclass, property } = cc._decorator;

@ccclass
export class MainScene extends cc.Component {

    static instance: MainScene;

    @property(cc.Node)
    stageContainer: cc.Node = null;
    @property(cc.Prefab)
    playerMovePanelPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    findRobotPanelPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    makeRobotPanelPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    robotSpawnPanelPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    robotRunPanelPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    robotDetroyPanelPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    robotPuzzlePanelPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    finalPanelPrefab: cc.Prefab = null;

    onLoad() {
        MainScene.instance = this;
    }

    start() {
        this.loadStage(this.playerMovePanelPrefab, PlayerWalkPanel);
    }

    loadStage<T extends cc.Component>(prefab: cc.Prefab, type?: { prototype: T }): T {
        this.stageContainer.removeAllChildren();
        const stageNode = cc.instantiate(prefab);
        this.stageContainer.addChild(stageNode);
        if (type) {
            const stage = stageNode.getComponent(type);
            return stage;
        } else {
            return null;
        }
    }

    onPlayerMoveFinish() {
        cc.log('player move finish');
        this.loadStage(this.findRobotPanelPrefab);
    }
    
    onFindRobotFinish() {
        cc.log('find robot finish');
        this.loadStage(this.makeRobotPanelPrefab, RobotMakePanel);
    }

    onRobotMakeFinish() {
        cc.log('make robot finish');
        this.loadStage(this.robotSpawnPanelPrefab,);
    }

    onRobotSpawnFinish() {
        cc.log('robot spawn finish');
        this.loadStage(this.robotRunPanelPrefab, RobotRunPanel);
    }

    onRobotRunFinish() {
        cc.log('robot run finish');
        this.loadStage(this.robotDetroyPanelPrefab);
    }

    onRobotDestroyFinish() {
        cc.log('robot destroy finish');
        this.loadStage(this.robotPuzzlePanelPrefab);
    }

    onRobotPuzzleFinish() {
        cc.log('robot puzzle finish');
        this.loadStage(this.finalPanelPrefab);
    }

    onFinalFinish() {
        cc.log('final finish');
        this.loadStage(this.playerMovePanelPrefab, PlayerWalkPanel);
    }


}