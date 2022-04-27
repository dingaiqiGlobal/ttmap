import BaseLayer from "./BaseLayer";
/**
 * 3dtiles 三维模型图层
 * @extends BaseLayer
 */
class Tile3DLayer extends BaseLayer{
    /**
     * 初始化
     * @param {object} options - 参数对象
     * @param {string} [options.id=uuid()] - 图层id标识
     * @param {string} [options.name] - 图层名称
     * @param {boolean} [options.show=true] - 图层是否显示
     * @param {string} options.url - url
     * @param {Object} [options.position] - 模型位置
     * @param {Number} [options.position.lng] - 经度值, 180 - 180
     * @param {Number} [options.position.lat] - 纬度值, -90 - 90
     * @param {Number} [options.position.alt] - 高度值（单位：米）
     * @param {Number} [options.scale=1] - 自定义缩放比例
     */
    constructor(options){
        super(options);
        this.url=options.url ? options.url : "";
        this.position=options.position ? options.position : null;
        this.scale=options.scale ? options.scale : 1;
        if(this.url === null || this.url === ""){
            console.log("三维模型切片地址不可为空!");
            return;
        }
        this.createLayer(options);
    }

    createLayer(options){
        this.tileset = new Cesium.Cesium3DTileset({
            url: this.url ,
            show:this.show
        });
    }

    /**
     * 添加到地图上
     * @param {Globe} globe - 地图对象
     * @param {boolean} flyTo=false - 加载完成数据后是否自动飞行定位到数据所在的区域
     */
    addTo(globe,flyTo=false){
        super.addTo(globe);
        this.globe.viewer.scene.primitives.add(this.tileset);
        if(flyTo){
            this.globe.viewer.flyTo(this.tileset);
        }
    }

    /**
     * 从地图上移除
     */
    remove(){
        if(this.globe) {
            this.globe.viewer.scene.primitives.remove(this.tileset);
            super.remove(globe);
        }
    }

    /**
     * @param {boolean} flag - 设置是否显示
     */
    setVisible(flag){
        super.setVisible(flag);
        this.tileset.show=flag;
    }

}
export default Tile3DLayer;
