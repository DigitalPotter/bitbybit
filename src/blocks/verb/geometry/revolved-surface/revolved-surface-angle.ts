import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../../resources';
import { createStandardContextIIFE } from '../../../_shared';
import { getRequired, makeRequiredValidationModelForInputs, BitByBitBlockHandlerService, ValidationEntityInterface } from '../../../validations';

export function createRevolvedSurfaceAngleBlock() {

    const resources = ResourcesService.getResources();
    const blockSelector = 'verb_geometry_revolved_surface_angle';

    Blocks[blockSelector] = {
        init() {
            this.appendValueInput('Revolution')
                .setCheck('NurbsSurface')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_geometry_revolved_surface_angle_input_revolution);
            this.setOutput(true, 'Number');
            this.setColour('#fff');
            this.setTooltip(resources.block_verb_geometry_revolved_surface_angle_description);
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            revolution: JavaScript.valueToCode(block, 'Revolution', JavaScript.ORDER_ATOMIC),
        };
        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_revolution
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        const code = createStandardContextIIFE(block, blockSelector, inputs, true,
            `return BABYLON.Angle.FromRadians(inputs.revolution.angle()).degrees();`
        );
        return [code, JavaScript.ORDER_ATOMIC];
    };
}

function makeRuntimeValidationModel(
    resources: ResourcesInterface,
    keys: string[]
): ValidationEntityInterface[] {

    return [{
        entity: keys[0],
        validations: [
            getRequired(resources, resources.block_revolution),
        ]
    }];
}
