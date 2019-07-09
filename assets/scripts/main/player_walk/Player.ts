const { ccclass, property } = cc._decorator;

@ccclass
export class Player extends cc.Component {

    @property(cc.Animation)
    moveAnim: cc.Animation = null;

    startMove() {
        this.moveAnim.play();
    }

    stopMove() {
        this.moveAnim.stop();
    }

}