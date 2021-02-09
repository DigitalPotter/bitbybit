import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../../resources';
import { createStandardContextIIFE } from '../../../_shared';
import { getRequired, makeRequiredValidationModelForInputs, HS, ValidationEntityInterface } from '../../../validations';
import { environment } from 'projects/bitbybit/src/environments/environment';
import { sphericalSurfaceConstants } from './spherical-surface-constants';

export function createSphericalSurfaceCenterBlock(): void {

    const resources = ResourcesService.getResources();
    const blockSelector = 'verb_geometry_spherical_surface_center';

    Blocks[blockSelector] = {
        init(): void {
            this.appendValueInput('Sphere')
                .setCheck('NurbsSurface')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_geometry_spherical_surface_center_input_sphere);
            this.setOutput(true, 'Array');
            this.setColour('#fff');
            this.setTooltip(resources.block_verb_geometry_spherical_surface_center_description);
            this.setHelpUrl(environment.docsUrl + sphericalSurfaceConstants.helpUrl + '#' + 'center');
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            sphere: (JavaScript as any).valueToCode(block, 'Sphere', (JavaScript as any).ORDER_ATOMIC),
        };
        // this is first set of validations to check that all inputs are non empty strings
        HS.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_sphere
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        const code = createStandardContextIIFE(block, blockSelector, inputs, true,
            `return bitbybit.verb.surface.sphere.center(inputs);`
        );
        return [code, (JavaScript as any).ORDER_ATOMIC];
    };
}

function makeRuntimeValidationModel(
    resources: ResourcesInterface,
    keys: string[]
): ValidationEntityInterface[] {

    return [{
        entity: keys[0],
        validations: [
            getRequired(resources, resources.block_sphere),
        ]
    }];
}
