import { OpenCascadeInstance, TopoDS_Face, TopoDS_Shape } from '../../../../../bitbybit-dev-occt/bitbybit-dev-occt';
import { OccHelper } from '../../occ-helper';
import * as Inputs from '../../../../api/inputs/inputs';

export class OCCTSurfaces {

    constructor(
        private readonly occ: OpenCascadeInstance,
        private readonly och: OccHelper
    ) {
    }

    cylindricalSurface(inputs: Inputs.OCCT.GeomCylindricalSurfaceDto) {
        const ax = this.och.gpAx3(inputs.center, inputs.direction);
        return new this.occ.Geom_CylindricalSurface_1(ax, inputs.radius);
    }

    surfaceFromFace(inputs: Inputs.OCCT.ShapeDto<TopoDS_Face>) {
        return this.och.surfaceFromFace(inputs);
    }

}
