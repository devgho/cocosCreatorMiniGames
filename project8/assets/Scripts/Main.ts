// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Attribute from "./Attribute";
import Manager from "./Manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    core: cc.Node = null;
    upLayer: cc.Node = null;
    UINode: cc.Node = null;

    nowPage: cc.Node = null;

    nowBtn: cc.Node = null;

    oldBtnSp: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    buttonSps: cc.SpriteFrame[] = [];

    @property(cc.Label)
    LblCapability: cc.Label;

    start() {
        this.nowPage = this.node.getChildByName("core").children[0];
        this.nowBtn = this.node.getChildByName("bottomSwitch").children[0];
        this.oldBtnSp = this.nowBtn.getComponent(cc.Sprite).spriteFrame;
        this.initNode();
        this.initLbl();
    }

    initLbl() {
    }

    initNode() {
        this.core = this.node.getChildByName("core");
        this.upLayer = cc.find("Canvas/upLayer");
        this.UINode = cc.find("Canvas/UI");
    }

    onBtnClick(e: cc.Event.EventTouch) {
        const btnNode = e.getCurrentTarget();

        if (this.nowBtn != null) {
            this.nowBtn.getComponent(cc.Sprite).spriteFrame = this.oldBtnSp;
        }
        this.node.getChildByName("core").getChildByName(btnNode.name).setSiblingIndex(10);
        this.nowPage = this.node.getChildByName("core").getChildByName(btnNode.name);
        this.nowBtn = this.node.getChildByName("bottomSwitch").getChildByName(btnNode.name);
        this.oldBtnSp = this.nowBtn.getComponent(cc.Sprite).spriteFrame;
    }


    // update (dt) {}
}
