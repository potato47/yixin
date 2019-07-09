import { MainScene } from '../MainScene';

const { ccclass, property } = cc._decorator;

@ccclass
export class RobotMakePanel extends cc.Component {

    @property(cc.Node)
    containersParent: cc.Node = null;
    @property(cc.Node)
    partsParent: cc.Node = null;

    private correctCount = 0;

    start() {
        this.partsParent.children.forEach(part => {
            part.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
               this.onPartTouchMove(part, event);
            }, this);
            part.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
                this.onPartTouchEnd(part, event);
            }, this);
            part.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event.EventTouch) => {
                this.onPartTouchEnd(part, event);
            }, this);
        });
    }

    onPartTouchMove(part: cc.Node, event: cc.Event.EventTouch) {
        part.position = part.position.add(event.getLocation().sub(event.getPreviousLocation()));
    }

    onPartTouchEnd(part: cc.Node, event: cc.Event.EventTouch) {
        const container = this.containersParent.getChildByName(part.name);
        const containerWorldPos = container.parent.convertToWorldSpaceAR(container.position);
        const partWorldPos = part.parent.convertToWorldSpaceAR(part.position);
        if (containerWorldPos.sub(partWorldPos).mag() < 10) {
            part.targetOff(this);
            this.correctCount++;
            if (this.correctCount === this.partsParent.childrenCount) {
                this.onMakeSuccess();
            }
        } else {
            part.position = part.position.sub(event.getLocation().sub(event.getStartLocation()));
        }
    }

    onMakeSuccess() {
        MainScene.instance.onRobotMakeFinish();
    }

}
