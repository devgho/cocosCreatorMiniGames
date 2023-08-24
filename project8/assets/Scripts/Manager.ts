// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

interface Monster {
    name:string,
    grade:number,
    serial:number
}

@ccclass
export default class Manager extends cc.Component {

    @property(cc.Prefab)
    preTip: cc.Prefab;

    @property(cc.Node)
    TipNode: cc.Node

    static Instance: Manager = null;

    /* 本地存储 */
    /* 用户数据 */
    grade: number = 1;   //等级
    /*签到天数*/
    signNum: number = -1;
    /*上一次签到的时间戳*/
    preSignDay = null;
    /* 当前最大关卡 */
    curMaxCustoms:number = 0;
    /* 属性 */
    attribute={
    }

    
    /* 本地存储end */

    saveLocalStorage() {
        const localStorageArr = [this.grade, this.signNum, this.preSignDay,this.curMaxCustoms,this.attribute];
        cc.sys.localStorage.setItem("localStorageArr2", JSON.stringify(localStorageArr));
    }

    getLocalStorage(storage) {
        this.grade = storage[0];
        this.signNum = storage[1];
        this.preSignDay = storage[2];
        this.curMaxCustoms = storage[3];
    }

    onLoad() {
        if (Manager.Instance == null) {
            Manager.Instance = this;
        } else {
            console.error("two manager");
            this.destroy();
        }
    }

    protected start(): void {
        this.localStorageFun();
    }

    startBtn(){
        cc.find("Canvas/UI/start").destroy();
    }


    localStorageFun() {
        const localStorageArr = cc.sys.localStorage.getItem("localStorageArr2");        //新游戏本地存储后面的数字改一下就行了
        if (localStorageArr == null) {
            this.saveLocalStorage();
        } else {
            this.getLocalStorage(JSON.parse(localStorageArr));
        }
    }

    showTip(content) {
        const newTip = cc.instantiate(this.preTip);
        newTip.getChildByName("LblContent").getComponent(cc.Label).string = content;
        this.TipNode.addChild(newTip);
        this.scheduleOnce(() => {
            newTip.destroy();
        }, 1.6);
    }

    // update (dt) {}
}
