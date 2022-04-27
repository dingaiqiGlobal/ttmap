import BaseLayer from "./BaseLayer";
/**
 * 3dtiles 三维地形图层
 * @extends BaseLayer
 */
class TerrainLayer extends BaseLayer{
    /**
     * 初始化
     * @param {object} options - 参数对象
     * @param {string} [options.id=uuid()] - 图层id标识
     * @param {string} [options.name] - 图层名称
     * @param {boolean} [options.show=true] - 图层是否显示
     * @param {string} [options.url] - url
     */
    constructor(options){
        super(options);
        this.url=options.url ? options.url : "";
        this.createLayer(options);
    }

    createLayer(options){
        if(this.url==null||this.url=="") {//默认地形
            this.terrainProvider = Cesium.createWorldTerrain();

        }else{
            this.terrainProvider = new Cesium.CesiumTerrainProvider({
                url : this.url
            })
        }

    }

    /**
     * 添加到地图上
     * @param {Globe} globe - 地图对象
     * @param {boolean} flyTo=false - 加载完成数据后是否自动飞行定位到数据所在的区域
     */
    addTo(globe,flyTo=false){
        super.addTo(globe);
        this.globe.viewer.terrainProvider=this.terrainProvider;
        if(flyTo){
            this.globe.viewer.flyTo(this.terrainProvider);
        }
    }

    /**
     * 从地图上移除
     */
    remove(){
        if(this.globe) {
            this.globe.viewer.terrainProvider=new Cesium.EllipsoidTerrainProvider({});
            super.remove(globe);
        }
    }

    /**
     * @param {boolean} flag - 设置是否显示
     */
    setVisible(flag){
        super.setVisible(flag);
        if(flag){
            this.globe.viewer.terrainProvider=this.terrainProvider;
        }else
        {
            this.globe.viewer.terrainProvider=new Cesium.EllipsoidTerrainProvider({});
        }
    }

}
export default TerrainLayer;
