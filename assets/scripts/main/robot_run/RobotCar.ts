const { ccclass, property } = cc._decorator;

@ccclass
export class RobotCar extends cc.Component {

    @property(cc.Animation)
    leftWheelAnim: cc.Animation = null;
    @property(cc.Animation)
    rightWheelAnim: cc.Animation = null;

    startMove() {
        this.leftWheelAnim.play();
        this.rightWheelAnim.play();
    }

    stopMove() {
        this.leftWheelAnim.stop();
        this.rightWheelAnim.stop();
    }

}