import Util from "../Utils/Util";
/** 图层对象 的基类 */
class BaseLayer {
    /**
     * 初始化BaseLayer
     * @param {object} options - 参数对象
     * @param {string} [options.id=uuid()] - 图层id标识
     * @param {string} [options.name] - 图层名称
     * @param {boolean} [options.show=true] - 图层是否显示
     *
     */
    constructor(options){
        this.id=options.id ? options.id : Util.generateUUID();;
        this.name=options.name ? options.name : "tile3d_"+this.id;
        this.show=options.show ? options.show : true;
    }

    /**
     * 添加到地图上
     * @param {Globe} globe - 地图对象
     */
    addTo(globe){
        this.globe=globe;
    }

    /**
     * 从地图上移除
     */
    remove(){
        this.globe=null;
    }

    /**
     * @param {boolean} flag - 设置是否显示
     */
    setVisible(flag){
        this.show=flag;
    }

}
export default BaseLayer;
