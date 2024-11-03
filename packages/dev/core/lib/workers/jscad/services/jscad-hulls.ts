import * as Inputs from "../../../api/inputs/jscad-inputs";
import * as JSCAD from "@jscad/modeling";

/**
 * Contains various functions for Solid hulls from JSCAD library https://github.com/jscad/OpenJSCAD.org
 * Thanks JSCAD community for developing this kernel
 */
export class JSCADHulls {

    constructor(
        private readonly jscad: typeof JSCAD,
    ) { }

    hullChain(inputs: Inputs.JSCAD.HullDto): Inputs.JSCAD.JSCADEntity {
        return this.jscad.hulls.hullChain(...inputs.meshes);
    }

    hull(inputs: Inputs.JSCAD.HullDto): Inputs.JSCAD.JSCADEntity  {
        return this.jscad.hulls.hull(...inputs.meshes);
    }
}
