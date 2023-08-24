// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Main from "./Main";
import Manager from "./Manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Attribute extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(cc.Label)
    Lbls: cc.Label[] = []

    @property(Main)
    mainCtrl: Main = null;

    start() {
        this.initLbl();
    }

    break() {
        if (true) {
            Manager.Instance.showTip("修为不足，无法升级");
        } else {
            Manager.Instance.showTip("升级成功");
            Manager.Instance.saveLocalStorage();
            this.initLbl();
        }
    }

    initLbl() {
    }

    // update (dt) {}
}
