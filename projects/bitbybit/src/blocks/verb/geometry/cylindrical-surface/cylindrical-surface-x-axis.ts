import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../../resources';
import { createStandardContextIIFE } from '../../../_shared';
import { getRequired, makeRequiredValidationModelForInputs, BitByBitBlockHandlerService, ValidationEntityInterface } from '../../../validations';
import { environment } from 'projects/bitbybit/src/environments/environment';
import { cylindricalSurfaceConstants } from './cylindrical-surface-constants';

export function createCylindricalSurfaceXAxisBlock(): void {

    const resources = ResourcesService.getResources();
    const blockSelector = 'verb_geometry_cylindrical_surface_x_axis';

    Blocks[blockSelector] = {
        init(): void {
            this.appendValueInput('Cylinder')
                .setCheck('NurbsSurface')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_geometry_cylindrical_surface_x_axis_input_cylinder);
            this.setOutput(true, 'Array');
            this.setColour('#fff');
            this.setTooltip(resources.block_verb_geometry_cylindrical_surface_x_axis_description);
            this.setHelpUrl(environment.docsUrl + cylindricalSurfaceConstants.helpUrl + '#' + 'xaxis');
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            cylinder: (JavaScript as any).valueToCode(block, 'Cylinder', (JavaScript as any).ORDER_ATOMIC),
        };
        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_cylinder
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        const code = createStandardContextIIFE(block, blockSelector, inputs, true,
            `return bitbybit.surface.cylinder.xAxis(inputs);`
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
            getRequired(resources, resources.block_cylinder),
        ]
    }];
}
