import BaseLayer from "./BaseLayer";
/**
 * ogc wmts图层
 * @extends BaseLayer
 */
class WMTS extends BaseLayer{
    /**
     * 初始化
     * @param {object} options - 参数对象
     * @param {string} [options.id=uuid()] - 图层id标识
     * @param {string} [options.name] - 图层名称
     * @param {boolean} [options.show=true] - 图层是否显示
     * @param {Number} [options.zIndex] - zIndex
     * @param {alpha} [options.alpha=1] - alpha
     * @param {string} options.url - url
     * @param {string} options.layer - layer
     * @param {string} [options.format='image/png'] - 瓦片格式
     * @param {string} [options.style=''] - 样式
     * @param {string} options.tileMatrixSetID - tileMatrixSetID 例如 EPSG:4326
     * @param {string} options.tileMatrixLabels - tileMatrixLabels 例如 ['EPSG:4326:0','EPSG:4326:1','EPSG:4326:2','EPSG:4326:3','EPSG:4326:4','EPSG:4326:5','EPSG:4326:6']
     * @param {object} [options.center] - 图层自定义定位视角
     * @param {Number} options.center.lng - 经度值, 180 - 180
     * @param {Number} options.center.lat - 纬度值, -90 - 90
     * @param {Number} options.center.alt - 高度值
     */
    constructor(options){
        super(options);
        this.url=options.url ? options.url : "";
        this.zIndex=options.zIndex;
        this.alpha=options.alpha ? options.alpha : 1;
        this.layer=options.layer;
        this.format=options.format ? options.format : 'image/png';
        this.style=options.style ? options.style : '';
        this.tileMatrixSetID=options.tileMatrixSetID;
        this.tileMatrixLabels=options.tileMatrixLabels;
        this.center=options.center;
        if(this.url === null || this.url === ""){
            console.log("wmts地址不可为空!");
            return;
        }
        this.createLayer(options);
    }

    createLayer(options){
        this.provider=new Cesium.WebMapTileServiceImageryProvider({
            url : this.url,
            layer : this.layer,
            style:this.style,
            format: this.format,
            tileMatrixSetID : this.tileMatrixSetID,
            tileMatrixLabels:this.tileMatrixLabels,
            tilingScheme:new Cesium.GeographicTilingScheme()
        });

        if(this.tileMatrixSetID.indexOf("4326")){
            this.provider=new Cesium.WebMapTileServiceImageryProvider({
                url : this.url,
                layer : this.layer,
                style:this.style,
                format: this.format,
                tileMatrixSetID : this.tileMatrixSetID,
                tileMatrixLabels:this.tileMatrixLabels,
                tilingScheme:new Cesium.GeographicTilingScheme()
            });
        }else{
            this.provider=new Cesium.WebMapTileServiceImageryProvider({
                url : this.url,
                layer : this.layer,
                style:this.style,
                format: this.format,
                tileMatrixSetID : this.tileMatrixSetID,
                tileMatrixLabels:this.tileMatrixLabels
            });
        }

        this.wmts=new Cesium.ImageryLayer(this.provider,{show:this.show,alpha:this.alpha});
    }

    /**
     * 添加到地图上
     * @param {Globe} globe - 地图对象
     * @param {boolean} flyTo=false - 加载完成数据后是否自动飞行定位到数据所在的区域
     */
    addTo(globe,flyTo=false){
        super.addTo(globe);
        if(this.zIndex)
            this.globe.viewer.imageryLayers.add(this.wmts,this.zIndex);
        else
            this.globe.viewer.imageryLayers.add(this.wmts);
        if(flyTo&&this.center){
            this.globe.viewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(this.center.lng, this.center.lat, this.center.alt)
            });
        }
    }

    /**
     * 从地图上移除
     */
    remove(){
        if(this.globe) {
            this.globe.viewer.imageryLayers.remove(this.wmts);
            super.remove(globe);
        }
    }

    /**
     * @param {boolean} flag - 设置是否显示
     */
    setVisible(flag){
        super.setVisible(flag);
        this.wmts.show=flag;
    }
}
export default WMTS;
