const { ccclass, property } = cc._decorator;

@ccclass
export class PuzzlePiece extends cc.Component {

    @property({
        type: cc.Texture2D
    })
    private texture: cc.Texture2D = null;

    public oriCol: number;
    public oriRow: number;
    public curCol: number;
    public curRow: number;
    public isBlank: boolean;
    public get isRight() {
        return this.curCol === this.oriCol && this.curRow === this.oriRow;
    }

    public init(col: number, row: number, colNum: number, colWidth: number, isCorner = false) {
        this.oriCol = col;
        this.oriRow = row;
        this.curCol = col;
        this.curRow = row;

        this.isBlank = row === -1;
        if (this.isBlank) {
            this.node.active = false;
            return;
            // this.label.string = '☺';
        } else {
            // this.label.string = (colNum - row - 1) * colNum + col + 1 + '';
        }
        // 图片模式
        let sprite = this.node.addComponent(cc.Sprite);
        // 升级2.0后setRect失效 
        // sprite.spriteFrame = new cc.SpriteFrame(this.texture);
        // let rect = sprite.spriteFrame.getRect();
        let rect = cc.rect(0, 0, this.texture.width, this.texture.height);
        let newRectWidth = rect.width / colNum;
        let newRectHeight = rect.height / colNum;
        let newRectX = col * newRectWidth;
        let newRectY = (colNum - row - 1) * newRectHeight;
        let newRect = cc.rect(newRectX, newRectY, newRectWidth, newRectHeight);
        // sprite.spriteFrame.setRect(newRect);
        sprite.spriteFrame = new cc.SpriteFrame(this.texture, newRect);

        this.node.width = colWidth;
        this.node.height = colWidth;

        // this.isBlank = this.oriCol === colNum - 1 && this.oriRow === 0;

    }

}