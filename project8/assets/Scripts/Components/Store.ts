// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Main from "../Main";
import Manager from "../Manager";
import { PlatformApi } from "./PlatfomApi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(Main)
    mainCtrl:Main;

    start () {
        PlatformApi.Instance.storeInstance = this;
    }

    close(){
        this.node.active = false;
    }

    Applepay(e, param) {
        PlatformApi.Instance.BuyProduct(param);
    }

    buySuccess(eventId) {
        switch (eventId) {
            case "1.66":
                Manager.Instance.showTip("一次奇遇购买成功，快去修行界面使用吧");
                Manager.Instance.adventureTimes+=1;
                break;
            case "4.66":
                Manager.Instance.showTip("二次奇遇购买成功，快去修行界面使用吧");
                Manager.Instance.adventureTimes+=2;
                break;
            case "14.66":
                Manager.Instance.showTip("十次奇遇购买成功，快去修行界面使用吧");
                Manager.Instance.adventureTimes+=10;
                break;
        }
        this.mainCtrl.initLbl();
        Manager.Instance.saveLocalStorage();
    }

    showSuceess(gold){
        Manager.Instance.showTip(gold+"金币购买成功！");
    }

    // update (dt) {}
}
