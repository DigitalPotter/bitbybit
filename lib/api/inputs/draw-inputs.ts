/* eslint-disable @typescript-eslint/no-namespace */
import * as BABYLON from "@babylonjs/core";
import { Base } from "../../api/inputs";

// tslint:disable-next-line: no-namespace
export namespace Draw {

    export type DrawOptions = DrawBasicGeometryOptions | DrawOcctShapeOptions | DrawOcctShapeSimpleOptions | DrawOcctShapeMaterialOptions | DrawNodeOptions | any;

    export class DrawAny {
        /**
         * Entity to be drawn - can be a single or multiple points, lines, polylines, verb curves, verb surfaces, jscad meshes, jscad polygons, jscad paths, occt shapes, tags, nodes
         * @default undefined
         */
        entity: any;
        /**
         * Options that help you control how your drawn objects look like. This property is optional. In order to pick the right option you need to know which entity you are going to draw. For example if you draw points, lines, polylines or jscad meshes you can use basic geometry options, but if you want to draw OCCT shapes, use OCCT options.
         * @default undefined
         * @optional true
         */
        options?: DrawOptions;
        /**
         * Entity to be used when updating already drawn mesh in the render loop
         * @default undefined
         * @optional true
         */
        babylonMesh?: BABYLON.Mesh | BABYLON.LinesMesh;
    }

    export class SceneDrawGridMeshDto {
        /**
         * Width of the grid
         * @default 400
         * @minimum 0
         * @maximum Infinity
         * @step 10
         */
        width = 400;
        /**
         * Height of the ground
         * @default 400
         * @minimum 0
         * @maximum Infinity
         * @step 10
         */
        height = 400;
        /**
         * Ground subdivisions
         * @default 10
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        subdivisions = 10;
        /**
         * The frequency of thicker lines.
         * @default 10
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        majorUnitFrequency = 10;
        /**
         * The visibility of minor units in the grid.
         * @default 0.45
         * @minimum 0
         * @maximum 1
         * @step 0.1
         */
        minorUnitVisibility = 0.45;
        /**
         * The scale of the grid compared to unit.
         * @default 0.5
         * @minimum 0
         * @maximum Infinity
         * @step 0.1
         */
        gridRatio = 0.5;
        /**
         * The grid opacity outside of the lines.
         * @default 0.5
         * @minimum 0
         * @maximum 1
         * @step 0.1
         */
        opacity = 0.5;
        /**
         * Cull the back faces
         * @default false
         */
        backFaceCulling = false;
        /**
         * Main color of the grid (e.g. between lines)
         * @default #ffffff
         */
        mainColor: Base.Color = "#ffffff";
        /**
         * Color of the grid lines.
         * @default #ffffff
         */
        secondaryColor: Base.Color = "#ffffff";
    }

    /**
     * Draw options for basic geometry types like points, lines, polylines, surfaces and jscad meshes
     */
    export class DrawBasicGeometryOptions {
        /**
         * Basic geometry colours to use for lines, points, polylines, surfaces, jscad meshes.
         * @default #ff0000
         */
        colours: string | string[] = "#ff0000";
        /**
         * Size affect how big the drawn points are and how wide lines are.
         * @default 0.1
         * @minimum 0
         * @maximum Infinity
         * @step 0.1
         */
        size = 0.1;
        /**
         * Opacity of the point 0 to 1
         * @default 1
         * @minimum 0
         * @maximum 1
         * @step 0.1
         */
        opacity = 1;
        /**
         * If geometry needs to be updated later
         * @default false
         */
        updatable = false;
        /**
         * Hidden
         * @default false
         */
        hidden = false;
    }

    /**
     * Draw options for Nodes
     */
    export class DrawNodeOptions {
        /**
         * X Axis colour
         * @default #ff0000
         */
        colorX: Base.Color = "#0000ff";
        /**
         * Y Axis colour
         * @default #00ff00
         */
        colorY: Base.Color = "#00ff00";
        /**
         * Z Axis colour
         * @default #0000ff
         */
        colorZ: Base.Color = "#ff0000";
        /**
         * Length of the node axis
         * @default 2
         * @minimum 0
         * @maximum Infinity
         */
        size = 2;
    }

    /**
     * Draw options for OCCT shapes
     */
    export class DrawOcctShapeOptions {
        /**
         * Face opacity value between 0 and 1
         * @default 1
         * @minimum 0
         * @maximum Infinity
         * 
         */
        faceOpacity = 1;
        /**
         * Edge opacity value between 0 and 1
         * @default 1
         * @minimum 0
         * @maximum 1
         */
        edgeOpacity = 1;
        /**
         * Hex colour string for the edges
         * @default #ffffff
         */
        edgeColour: Base.Color = "#ffffff";
        /**
         * Hex colour string for face colour
         * @default #ff0000
         */
        faceColour: Base.Color = "#ff0000";
        /**
         * Face material
         * @default undefined
         * @optional true
         */
        faceMaterial?;
        /**
         * Edge width
         * @default 2
         * @minimum 0
         * @maximum Infinity
         */
        edgeWidth = 2;
        /**
         * You can turn off drawing of edges via this property
         * @default true
         */
        drawEdges = true;
        /**
         * You can turn off drawing of faces via this property
         * @default true
         */
        drawFaces = true;
        /**
         * Precision
         * @default 0.01
         * @minimum 0
         * @maximum Infinity
         */
        precision = 0.01;
        /**
         * Draw index of edges in space
         * @default false
         */
        drawEdgeIndexes = false;
        /**
         * Indicates the edge index height if they are drawn
         * @default 0.06
         * @minimum 0
         * @maximum Infinity
         */
        edgeIndexHeight = 0.06;
        /**
         * Edge index colour if the edges are drawn
         * @default ff00ff
         */
        edgeIndexColour: Base.Color = "#ff00ff";
        /**
         * Draw indexes of faces in space
         * @default false
         */
        drawFaceIndexes = false;
        /**
         * Indicates the edge index height if they are drawn
         * @default 0.06
         * @minimum 0
         * @maximum Infinity
         */
        faceIndexHeight = 0.06;
        /**
         * Edge index colour if the edges are drawn
         * @default #0000ff
         */
        faceIndexColour: Base.Color = "#0000ff";
    }
    export class DrawOcctShapeSimpleOptions {
        /**
         * Precision
         * @default 0.01
         * @minimum 0
         * @maximum Infinity
         */
        precision = 0.01;
        /**
         * You can turn off drawing of faces via this property
         * @default true
         */
        drawFaces = true;
        /**
         * Hex colour string for face colour
         * @default #ff0000
         */
        faceColour: Base.Color = "#ff0000";
        /**
        * You can turn off drawing of edges via this property
        * @default true
        */
        drawEdges = true;
        /**
         * Hex colour string for the edges
         * @default #ffffff
         */
        edgeColour: Base.Color = "#ffffff";
        /**
         * Edge width
         * @default 2
         * @minimum 0
         * @maximum Infinity
         */
        edgeWidth = 2;
    }

    export class DrawOcctShapeMaterialOptions {
        /**
        * Precision
        * @default 0.01
        * @minimum 0
        * @maximum Infinity
        */
        precision = 0.01;
        /**
         * Face material
         * @default undefined
         */
        faceMaterial;

        /**
        * You can turn off drawing of edges via this property
        * @default true
        */
        drawEdges = true;
        /**
         * Hex colour string for the edges
         * @default #ffffff
         */
        edgeColour: Base.Color = "#ffffff";
        /**
         * Edge width
         * @default 2
         * @minimum 0
         * @maximum Infinity
         */
        edgeWidth = 2;
    }

    export enum drawingTypes {
        point,
        points,
        line,
        lines,
        node,
        nodes,
        polyline,
        polylines,
        verbCurve,
        verbCurves,
        verbSurface,
        verbSurfaces,
        jscadMesh,
        jscadMeshes,
        occt,
        tag,
        tags,
    }
}
