import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../../resources';
import { createStandardContextIIFE } from '../../../_shared';
import { getRequired, makeRequiredValidationModelForInputs, HS, ValidationEntityInterface } from '../../../validations';
import { conicalSurfaceConstants } from './conical-surface-constants';
import { environment } from 'projects/bitbybit/src/environments/environment';

export function createConicalSurfaceBaseBlock(): void {

    const resources = ResourcesService.getResources();
    const blockSelector = 'verb_geometry_conical_surface_base';

    Blocks[blockSelector] = {
        init(): void {
            this.appendValueInput('Cone')
                .setCheck('NurbsSurface')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_geometry_conical_surface_base_input_cone);
            this.setOutput(true, 'Array');
            this.setColour('#fff');
            this.setTooltip(resources.block_verb_geometry_conical_surface_base_description);
            this.setHelpUrl(environment.docsUrl + conicalSurfaceConstants.helpUrl + '#' + 'base');
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            cone: (JavaScript as any).valueToCode(block, 'Cone', (JavaScript as any).ORDER_ATOMIC),
        };
        // this is first set of validations to check that all inputs are non empty strings
        HS.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_cone
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        const code = createStandardContextIIFE(block, blockSelector, inputs, true,
            `return bitbybit.verb.surface.cone.base(inputs);`
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
            getRequired(resources, resources.block_cone),
        ]
    }];
}
