// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Main from "../Main";
import Manager from "../Manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(cc.Node)
    coreNode: cc.Node;
    
    mainCtrl:Main;

    start() {
        this._start();
    }

    _start() {
        const dateStamp = new Date(new Date().toLocaleDateString()).getTime();      //判断签到是否过期,过期就从第0天开始
        if (Manager.Instance.preSignDay + 24 * 60 * 60 * 1000 != dateStamp && Manager.Instance.preSignDay != dateStamp) {
            Manager.Instance.preSignDay = null;
            Manager.Instance.signNum = -1;
        }
        if (Manager.Instance.preSignDay + 24 * 60 * 60 * 1000 == dateStamp && Manager.Instance.signNum == 6) {    //签满6天，第二天重置签到
            Manager.Instance.preSignDay = null;
            Manager.Instance.signNum = -1;
        }

        for (let i in this.coreNode.children) {
            this.coreNode.children[i].on(cc.Node.EventType.TOUCH_START, () => {
                this.sign(parseInt(i));
            })
        }
        this.initBtn();
    }

    initBtn() {
        for (let i in this.coreNode.children) {
            if (Manager.Instance.signNum >= Number.parseInt(i)) {
                this.coreNode.children[i].getChildByName("already").active = true;
                continue;
            }
        }
    }

    sign(day: number) {
        if (Manager.Instance.signNum + 1 != day) {
            return;
        }

        const dateStamp = new Date(new Date().toLocaleDateString()).getTime();
        console.log(Manager.Instance.preSignDay);
        console.log(dateStamp);
        if (Manager.Instance.preSignDay + 24 * 60 * 60 * 1000 == dateStamp || Manager.Instance.preSignDay == null) {
            Manager.Instance.signNum = day;
            Manager.Instance.preSignDay = dateStamp;
            if (day < 6) {
                Manager.Instance.gold += 100 + 100 * day;
                Manager.Instance.showTip("签到成功,已获得" + (100 + 100 * day) + "金币");
            } else {
                Manager.Instance.gold += 1000;
                Manager.Instance.showTip("签到成功,已获得1000金币");
            }
            this.mainCtrl.initLbl();
            Manager.Instance.saveLocalStorage();
            this.initBtn();
        } else if (Manager.Instance.preSignDay == dateStamp) {
            Manager.Instance.showTip("签到失败,你今天已经签到过了");
        }
    }

    close() {
        this.node.destroy();
    }

    // update (dt) {}
}
