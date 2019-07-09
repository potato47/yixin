import { PuzzlePiece } from './PuzzlePiece';

const { ccclass, property } = cc._decorator;

@ccclass
export class PuzzleBoard extends cc.Component {

    @property(cc.Node)
    private cornerArea: cc.Node = null;
    @property(cc.Prefab)
    private piecePrefab: cc.Prefab = null;
    @property(cc.Integer)
    private colNum: number = 5;
    @property(cc.Integer)
    private colSpace: number = 5;

    private colWidth: number = 0;
    private pieceMap: Array<Array<PuzzlePiece>>;
    private cornerPiece: PuzzlePiece = null;
    private blankPiece: PuzzlePiece = null;

    private controller: IPuzzleBoardController = null;

    private isPlaying = false;

    init(controller: IPuzzleBoardController) {
        this.controller = controller;
        this.addListeners();
        return this;
    }

    public reset(colNum: number = 3) {
        this.colNum = colNum;
        this.colWidth = (this.node.width - this.colSpace * (this.colNum + 1)) / this.colNum;
        this.node.removeAllChildren();
        this.cornerArea.active = true;
        this.pieceMap = [];
        for (let x = 0; x < this.colNum; x++) {
            this.pieceMap[x] = [];
            for (let y = 0; y < this.colNum; y++) {
                let pieceNode = cc.instantiate(this.piecePrefab);
                this.node.addChild(pieceNode);
                pieceNode.x = x * (this.colWidth + this.colSpace) + this.colSpace;
                pieceNode.y = y * (this.colWidth + this.colSpace) + this.colSpace;
                this.pieceMap[x][y] = pieceNode.getComponent(PuzzlePiece);
                this.pieceMap[x][y].init(x, y, this.colNum, this.colWidth);
                // if (this.pieceMap[x][y].isBlank) {
                //     this.blankPiece = this.pieceMap[x][y];
                // }
            }
        }
        let pieceNode = cc.instantiate(this.piecePrefab);
        this.node.addChild(pieceNode);
        pieceNode.x = (this.colNum - 1) * (this.colWidth + this.colSpace) + this.colSpace;
        pieceNode.y = - (this.colWidth + this.colSpace + this.colSpace);
        this.cornerPiece = pieceNode.getComponent(PuzzlePiece);
        this.cornerPiece.init(this.colNum - 1, -1, this.colNum, this.colWidth);
        this.blankPiece = this.cornerPiece;
        this.shuffle();
        this.isPlaying = true;
    }

    onSuccess() {
        this.isPlaying = false;
        this.cornerArea.active = false;
        this.controller.onPuzzleSuccess();
    }

    private shuffle() {
        for (let i = 0; i < 1000; i++) {
            let nearPieces = this.getNearPieces(this.blankPiece);
            let n = Math.floor(Math.random() * nearPieces.length);
            this.exchangeTwoPiece(this.blankPiece, nearPieces[n]);
        }
    }

    private onBoadTouch(event: cc.Event.EventTouch) {
        if (this.isPlaying) {
            let worldPos = event.getLocation();
            let localPos = this.node.convertToNodeSpaceAR(worldPos);
            let x = Math.floor((localPos.x - this.colSpace) / (this.colWidth + this.colSpace));
            let y = Math.floor((localPos.y - this.colSpace) / (this.colWidth + this.colSpace));
            this.handleTouchPiece(x, y);
        }
    }

    private onCornerTouch() {
        this.handleTouchPiece(this.colNum - 1, -1);
    }

    private handleTouchPiece(x: number, y: number) {
        if (this.movePiece(x, y)) {
            if (this.judgeWin()) {
                this.onSuccess();
            }
        }
    }

    public movePiece(x: number, y: number): boolean {
        let piece: PuzzlePiece;
        if (y === -1) {
            piece = this.cornerPiece;
        } else {
            piece = this.pieceMap[x][y];
        }
        let nearPieces = this.getNearPieces(piece);
        for (let nearPiece of nearPieces) {
            if (nearPiece.isBlank) {
                this.exchangeTwoPiece(piece, nearPiece);
                return true;
            }
        }
        return false;
    }

    public judgeWin(): boolean {
        for (let x = 0; x < this.colNum; x++) {
            for (let y = 0; y < this.colNum; y++) {
                if (!this.pieceMap[x][y].isRight) {
                    return false;
                }
            }
        }
        // this.blankPiece.node.active = true;
        return true;
    }

    private getNearPieces(piece: PuzzlePiece): Array<PuzzlePiece> {
        let nearPieces = [];
        if (piece.curRow === -1) {
            nearPieces.push(this.pieceMap[this.colNum - 1][0]);
        } else {
            if (piece.curCol > 0) { // left
                nearPieces.push(this.pieceMap[piece.curCol - 1][piece.curRow]);
            }
            if (piece.curCol < this.colNum - 1) { // right
                nearPieces.push(this.pieceMap[piece.curCol + 1][piece.curRow]);
            }
            if (piece.curRow > 0) { // bottom
                nearPieces.push(this.pieceMap[piece.curCol][piece.curRow - 1]);
            }
            if (piece.curRow < this.colNum - 1) { // top
                nearPieces.push(this.pieceMap[piece.curCol][piece.curRow + 1]);
            }
            if (piece.curCol === this.colNum - 1 && piece.curRow === 0) {
                nearPieces.push(this.cornerPiece);
            }
        }
        return nearPieces;
    }

    public exchangeTwoPiece(piece1: PuzzlePiece, piece2: PuzzlePiece) {
        this.pieceMap[piece2.curCol][piece2.curRow] = piece1;
        this.pieceMap[piece1.curCol][piece1.curRow] = piece2;

        [piece1.curCol, piece2.curCol] = [piece2.curCol, piece1.curCol];
        [piece1.curRow, piece2.curRow] = [piece2.curRow, piece1.curRow];

        [piece1.node.position, piece2.node.position] = [piece2.node.position, piece1.node.position];
        if (piece1.curRow === -1) {
            this.cornerPiece = piece1;
        } else if (piece2.curRow === -1) {
            this.cornerPiece = piece2
        }
    }

    private addListeners() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onBoadTouch, this);
        this.cornerArea.on(cc.Node.EventType.TOUCH_END, this.onCornerTouch, this);
    }

    private removeListeners() {

    }

}

export interface IPuzzleBoardController {
    onPuzzleSuccess: () => void;
}