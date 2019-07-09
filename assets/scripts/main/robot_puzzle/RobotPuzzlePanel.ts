import { PuzzleBoard, IPuzzleBoardController } from './PuzzleBoard';
import { MainScene } from '../MainScene';

const { ccclass, property } = cc._decorator;

@ccclass
export class RobotPuzzlePanel extends cc.Component implements IPuzzleBoardController {
    
    @property(PuzzleBoard)
    puzzleBoard: PuzzleBoard = null;
    @property(cc.Node)
    nextButton: cc.Node = null;
    
    start() {
        this.puzzleBoard.init(this).reset();
        this.nextButton.on(cc.Node.EventType.TOUCH_END, () => {
            MainScene.instance.onRobotPuzzleFinish();

        }, this);
        this.nextButton.active = false;
    }

    onPuzzleSuccess() {
        this.nextButton.active = true;
    }
}