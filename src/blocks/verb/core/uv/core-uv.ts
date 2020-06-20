import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../../resources';
import { createStandardContextIIFE } from '../../../_shared';
import { getRequired, makeRequiredValidationModelForInputs, BitByBitBlockHandlerService, ValidationEntityInterface } from '../../../validations';

export function createCoreUVBlock() {

    const resources = ResourcesService.getResources();
    const blockSelector = 'verb_core_uv';

    Blocks[blockSelector] = {
        init() {
            this.appendValueInput('U')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_core_uv_input_u);
            this.appendValueInput('V')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_core_uv_input_v);
            this.setOutput(true, 'UV');
            this.setColour('#fff');
            this.setTooltip(resources.block_verb_core_uv_description);
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            u: JavaScript.valueToCode(block, 'U', JavaScript.ORDER_ATOMIC),
            v: JavaScript.valueToCode(block, 'V', JavaScript.ORDER_ATOMIC),
        };

        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_u, resources.block_v
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        const code = createStandardContextIIFE(block, blockSelector, inputs, true,
            `return {u: inputs.u, v: inputs.v};`);
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
            getRequired(resources, resources.block_u),
        ]
    }, {
        entity: keys[1],
        validations: [
            getRequired(resources, resources.block_v),
        ]
    }];
}
