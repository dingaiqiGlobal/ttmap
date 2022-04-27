/** 三维场景Globe. */
import TdtLayer from "./layer/TdtLayer";
import WMTS from "./layer/WMTS";
import BingLayer from "./layer/BingLayer"
import CesiumLayer from "./layer/CesiumLayer"
import MapboxLayer from "./layer/MapboxLayer"
import OsmLayer from "./layer/OsmLayer"
import XyzLayer from "./layer/XyzLayer"
import BaiduLayer from "./layer/BaiduLayer"
import GaodeLayer from "./layer/GaodeLayer"
import GeojsonLayer from "./layer/GeojsonLayer";
import WFS from "./layer/WFS";
import WMS from "./layer/WMS";

class Globe {
    /**
     * 初始化globe
     * @param {string} id - 场景容器DOM 的 ID
     * @param {object} mapOptions - mapOptions
     * @param {object} [mapOptions.center] - 默认视角参数
     * @param {Number} [mapOptions.center.lat] - 经度值, 180 - 180
     * @param {Number} [mapOptions.center.lng] - 纬度值, -90 - 90
     * @param {Number} [mapOptions.center.alt] - 高度值
     * @param {Number} [mapOptions.center.heading] - 方向角度值，绕垂直于地心的轴旋转角度, 0-360
     * @param {Number} [mapOptions.center.pitch] - 俯仰角度值，绕纬度线旋转角度, 0-360
     * @param {Number} [mapOptions.center.roll] - 翻滚角度值，绕经度线旋转角度, 0-360
     *
     * @param {object} mapOptions.control - 控件参数
     * @param {boolean} [mapOptions.control.animation=false] - 如果设置为false，将不会创建'动画'小部件。
     * @param {boolean} [mapOptions.control.baseLayerPicker=false] - 如果设置为false，将不会创建BaseLayerPicker小部件。
     * @param {boolean} [mapOptions.control.fullscreenButton=false] - 如果设置为false，将不会创建FullscreenButton小部件。
     * @param {boolean} [mapOptions.control.geocoder=false] - 如果设置为false，则将不会创建Geocoder小部件。
     * @param {boolean} [mapOptions.control.homeButton=false] - 如果设置为false，将不会创建'主页按钮'小部件。
     * @param {boolean} [mapOptions.control.infoBox=false] - 如果设置为false，则不会创建InfoBox小部件。
     * @param {boolean} [mapOptions.control.sceneModePicker=false] - 如果设置为false，将不会创建SceneModePicker小部件。
     * @param {boolean} [mapOptions.control.selectionIndicator=false] - 如果设置为false，将不会创建SelectionIndicator小部件。
     * @param {boolean} [mapOptions.control.timeline=false] - 如果设置为false，则不会创建时间轴小部件。
     * @param {boolean} [mapOptions.control.navigationHelpButton=false] - 如果设置为false，将不会创建导航帮助按钮。
     *
     * @param {Array<BaseLayer>} mapOptions.basemaps - 底图图层参数 参考 LayerType及BaseLayer子类 例如[{type:'tdt',...},{type:'wmts',...}]
     */
    constructor(id,mapOptions){
        if(!id){
            alert("id 不可为空!")
        }

        this.id=id;
        mapOptions=mapOptions ? mapOptions : {};
        this.centerOption=mapOptions.center;
        this.controlOption=mapOptions.control ? mapOptions.control : {};
        this.basemapsOption=mapOptions.basemaps ? mapOptions.basemaps : [];
        this.createViewer(id,mapOptions)
    }

    createViewer(id,mapOptions) {
        var viewer = new Cesium.Viewer(id,{
            animation:this.controlOption.animation ? this.controlOption.animation : false,//是否显示动画控件(左下方那个控制地球自转时间)
            baseLayerPicker:this.controlOption.baseLayerPicker ? this.controlOption.baseLayerPicker : false, //是否显示图层选择控件
            fullscreenButton:this.controlOption.fullscreenButton ? this.controlOption.fullscreenButton : false,
            geocoder: this.controlOption.geocoder ? this.controlOption.geocoder : false, //是否显示地名查找控件
            homeButton:  this.controlOption.homeButton ? this.controlOption.homeButton : false, //是否显示Home按钮
            infoBox: this.controlOption.infoBox ? this.controlOption.infoBox : false, //是否显示信息框
            sceneModePicker: this.controlOption.sceneModePicker ? this.controlOption.sceneModePicker : false, //是否显示3D/2D选择器
            selectionIndicator:this.controlOption.selectionIndicator ? this.controlOption.selectionIndicator : false, // 实体对象选择框
            timeline: this.controlOption.timeline ? this.controlOption.timeline : false, //是否显示时间线控件
            navigationHelpButton:this.controlOption.navigationHelpButton ? this.controlOption.navigationHelpButton : false //是否显示帮助信息控件
        });



        this.viewer = viewer;
        viewer.cesiumWidget.creditContainer.style.display = "none";
        if(this.centerOption){
            this.viewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(this.centerOption.lng, this.centerOption.lat, this.centerOption.alt)
            });
        }

        if(this.basemapsOption&&this.basemapsOption.length>0){
            viewer.imageryLayers.removeAll();
            for(var i=0;i<this.basemapsOption.length;i++)
            {
                var lyrOption=this.basemapsOption[i];
                if(lyrOption.type==="tdt"){
                    var tdt=new TdtLayer(lyrOption);
                    viewer.imageryLayers.add(tdt.tdt);
                }else if(lyrOption.type==="wmts"){
                    var wmts=new WMTS(lyrOption);
                    viewer.imageryLayers.add(wmts.wmts);
                }else if(lyrOption.type==="bing"){
                    var bing=new BingLayer(lyrOption);
                    viewer.imageryLayers.add(bing.bing);
                }else if(lyrOption.type==="cesium"){
                    var clayer=new CesiumLayer(lyrOption);
                    viewer.imageryLayers.add(clayer.cesium);
                }else if(lyrOption.type==="osm"){
                    var osm=new OsmLayer(lyrOption);
                    viewer.imageryLayers.add(osm.osm);
                }else if(lyrOption.type==="mapbox"){
                    var mapbox=new MapboxLayer(lyrOption);
                    viewer.imageryLayers.add(mapbox.mapbox);
                }else if(lyrOption.type==="baidu"){
                    var baidu=new BaiduLayer(lyrOption);
                    viewer.imageryLayers.add(baidu.baidu);
                }else if(lyrOption.type==="gaode"){
                    var gaode=new GaodeLayer(lyrOption);
                    viewer.imageryLayers.add(gaode.gaode);
                }else if(lyrOption.type==="geojson"){
                    var geojson=new GeojsonLayer(lyrOption);
                    viewer.dataSources.add(geojson.dataSource);
                }else if(lyrOption.type==="wfs"){
                    var wfs=new WFS(lyrOption);
                    viewer.dataSources.add(wfs.dataSource);
                }else if(lyrOption.type==="xyz"){
                    var xyz=new XyzLayer(lyrOption);
                    viewer.imageryLayers.add(xyz.xyz);
                }else if(lyrOption.type==="wms"){
                    var wms=new WMS(lyrOption);
                    viewer.imageryLayers.add(wms.wms);
                }
            }
        }
        return viewer;
    }

    /**
     * 添加图层
     * @param layer {BaseLayer}  - 图层对象
     * @param {boolean} flyTo=false - 加载完成数据后是否自动飞行定位到数据所在的区域
     * @return {layer} -layer.
     */
    addLayer (layer,flyTo=false) {
        layer.addTo(this,flyTo);
        return layer;
    }

    /**
     * 添加控件
     * @param options {Object} -
     * @return {control} control.
     */
    addControl (options) {
        var control;
        return control;
    }

    /**
     * 添加效果
     * @param options {Object} -
     * @return {appearence} appearence.
     */
    addAppearence (options) {
        var appearence;
        return appearence;
    }

    /**
     * 添加空间分析
     * @param options {Object} -
     * @return {analysis} analysis.
     */
    addAnalysis (options) {
        var analysis;
        return analysis;
    }

    /**
     * 改变天空盒
     * @param {string} positiveX=../../images/skybox/posx.jpg {url} -图片路径
     * @param {string} negativeX=../../images/skybox/negx.jpg {url} -图片路径
     * @param {string} positiveY=../../images/skybox/posy.jpg {url} -图片路径
     * @param {string} negativeY=../../images/skybox/negy.jpg {url} -图片路径
     * @param {string} positiveZ=../../images/skybox/posz.jpg {url} -图片路径
     * @param {string} negativeZ=../../images/skybox/negz.jpg {url} -图片路径
     */
    changeSkyBox(positiveX,negativeX,positiveY,negativeY,positiveZ,negativeZ) {
        this.viewer.scene.skyBox = new Cesium.SkyBox({
            sources : {
                positiveX : positiveX || '../../images/skybox/posx.jpg',
                negativeX : negativeX || '../../images/skybox/negx.jpg',
                positiveY : positiveY || '../../images/skybox/posy.jpg',
                negativeY : negativeY || '../../images/skybox/negy.jpg',
                positiveZ : positiveZ || '../../images/skybox/posz.jpg',
                negativeZ : negativeZ || '../../images/skybox/negz.jpg',
            }
        });
    }

    /**
     * 显示隐藏太阳月亮
     * @param {boolean} flag=true -boolean
     */
    setMoonAndSun(flag) {
        this.viewer.scene.sun.show = flag;
        this.viewer.scene.moon.show = flag;
    }

    /**
     * 隐藏光和大气
     * @param {boolean} flag=true -boolean
     */
    setLightingAndAtmosphere(flag) {
        this.viewer.scene.skyAtmosphere.show = flag;
    }


}
export default Globe;
