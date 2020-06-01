import { createSurfaceByCornersBlock } from './surface-by-corners';
import { createSurfaceByKnotsControlPointsWeightsBlock } from './surface-by-knots-control-points-weights';
import { createSurfaceByLoftingCurvesBlock } from './surface-by-lofting-curves';
import { createSurfaceDegreeUBlock } from './surface-degree-u';
import { createSurfaceDegreeVBlock } from './surface-degree-v';
import { createSurfaceKnotsUBlock } from './surface-knots-u';
import { createSurfaceKnotsVBlock } from './surface-knots-v';
import { createSurfaceControlPointsBlock } from './surface-control-points';
import { createSurfaceWeightsBlock } from './surface-weights';
import { createSurfaceCloneBlock } from './surface-clone';
import { createSurfaceDomainUBlock } from './surface-domain-u';
import { createSurfaceDomainVBlock } from './surface-domain-v';
import { createSurfacePointBlock } from './surface-point';
import { createSurfaceNormalBlock } from './surface-normal';
import { createSurfaceDerivativesBlock } from './surface-derivatives';
import { createSurfaceClosestParamBlock } from './surface-closest-param';
import { createSurfaceClosestPointBlock } from './surface-closest-point';

export function assembleSurfaceBlocks() {
    createSurfaceByCornersBlock();
    createSurfaceByKnotsControlPointsWeightsBlock();
    createSurfaceByLoftingCurvesBlock();
    createSurfaceDegreeUBlock();
    createSurfaceDegreeVBlock();
    createSurfaceKnotsUBlock();
    createSurfaceKnotsVBlock();
    createSurfaceControlPointsBlock();
    createSurfaceWeightsBlock();
    createSurfaceCloneBlock();
    createSurfaceDomainUBlock();
    createSurfaceDomainVBlock();
    createSurfacePointBlock();
    createSurfaceNormalBlock();
    createSurfaceDerivativesBlock();
    createSurfaceClosestParamBlock();
    createSurfaceClosestPointBlock();
}