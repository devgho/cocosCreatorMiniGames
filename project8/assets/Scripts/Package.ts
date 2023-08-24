// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Manager from "./Manager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Package extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Prefab)
    preItem:cc.Prefab = null;

    @property(cc.SpriteFrame)
    goodFrs:cc.SpriteFrame[] = [];

    mstCtrl = null;

    start () {
        this.initItems();
    }

    initItems(){
        this.content.removeAllChildren();
        }
    }

    // update (dt) {}

