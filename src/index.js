import Globe from "./Globe";
import WMS from "./layer/WMS"
import WMTS from "./layer/WMTS"
import TdtLayer from "./layer/TdtLayer"
import BingLayer from "./layer/BingLayer"
import CesiumLayer from "./layer/CesiumLayer"
import MapboxLayer from "./layer/MapboxLayer"
import OsmLayer from "./layer/OsmLayer"
import XyzLayer from "./layer/XyzLayer"
import BaiduLayer from "./layer/BaiduLayer"
import GaodeLayer from "./layer/GaodeLayer"
import GeojsonLayer from "./layer/GeojsonLayer"
import WFS from "./layer/WFS"
import Tile3DLayer from "./layer/Tile3DLayer"
import TerrainLayer from "./layer/TerrainLayer";

var TTMap = window['TTMap'] = {};

TTMap.Globe=Globe;
TTMap.layer={};
TTMap.layer.WMS=WMS;
TTMap.layer.WMTS=WMTS;
TTMap.layer.TdtLayer=TdtLayer;
TTMap.layer.BingLayer=BingLayer;
TTMap.layer.CesiumLayer=CesiumLayer;
TTMap.layer.MapboxLayer=MapboxLayer;
TTMap.layer.OsmLayer=OsmLayer;
TTMap.layer.XyzLayer=XyzLayer;
TTMap.layer.BaiduLayer=BaiduLayer;
TTMap.layer.GaodeLayer=GaodeLayer;
TTMap.layer.GeojsonLayer=GeojsonLayer;
TTMap.layer.WFS=WFS;
TTMap.layer.Tile3DLayer=Tile3DLayer;
TTMap.layer.TerrainLayer=TerrainLayer;

