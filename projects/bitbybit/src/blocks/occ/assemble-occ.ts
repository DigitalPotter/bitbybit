import { createChamferEdgesBlock } from './chamfer-edges';
import { createBooleanDifferenceBlock } from './boolean-difference';
import { createDrawShapeBlock } from './draw-shape';
import { createExtrudeBlock } from './extrude';
import { createFacesCreateCircleBlock } from './faces-create-circle';
import { createFilletEdgesBlock } from './fillet-edges';
import { createLoftBlock } from './loft';
import { createOffsetBlock } from './offset';
import { createRevolveBlock } from './revolve';
import { createBoxBlock } from './shapes-create-box';
import { createConeBlock } from './shapes-create-cone';
import { createCylinderBlock } from './shapes-create-cylinder';
import { createSphereBlock } from './shapes-create-sphere';
import { createBooleanUnionBlock } from './boolean-union';
import { createWiresCreateBezierBlock } from './wires-create-bezier';
import { createWiresCreateBSplineBlock } from './wires-create-bspline';
import { createWiresCreateCircleBlock } from './wires-create-circle';
import { createBooleanIntersectionBlock } from './boolean-intersection';
import { createWiresCreatePolygonBlock } from './wires-create-polygon';
import { createFacesCreatePolygonBlock } from './faces-create-polygon';
import { createTransformRotateBlock } from './transform-rotate';
import { createTransformScaleBlock } from './transform-scale';
import { createTransformTranslateBlock } from './transform-translate';
import { createTransformTransformBlock } from './transform-transform';
import { createRotatedExtrudeBlock } from './rotated-extrude';
import { createPipeBlock } from './pipe';
import { createFacesGetFaceBlock } from './faces-get-face';
import { createEdgesGetEdgeBlock } from './edges-get-edge';
import { createWiresGetWireBlock } from './wires-get-wire';

export function assembleOCCBlocks(): void {
    createBoxBlock();
    createDrawShapeBlock();
    createSphereBlock();
    createConeBlock();
    createCylinderBlock();
    createWiresCreateBSplineBlock();
    createWiresCreateBezierBlock();
    createWiresCreateCircleBlock();
    createFacesCreateCircleBlock();
    createOffsetBlock();
    createExtrudeBlock();
    createLoftBlock();
    createRevolveBlock();
    createFilletEdgesBlock();
    createChamferEdgesBlock();
    createBooleanUnionBlock();
    createBooleanDifferenceBlock();
    createBooleanIntersectionBlock();
    createWiresCreatePolygonBlock();
    createFacesCreatePolygonBlock();
    createTransformRotateBlock();
    createTransformScaleBlock();
    createTransformTranslateBlock();
    createTransformTransformBlock();
    createRotatedExtrudeBlock();
    createPipeBlock();
    createFacesGetFaceBlock();
    createEdgesGetEdgeBlock();
    createWiresGetWireBlock();
}
