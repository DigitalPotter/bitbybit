import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../../resources';
import { createStandardContextIIFE } from '../../../_shared';
import {
    getOfLength,
    getRequired,
    makeRequiredValidationModelForInputs,
    BitByBitBlockHandlerService,
    ValidationEntityInterface
} from '../../../validations';
import { environment } from 'projects/bitbybit/src/environments/environment';
import { lineConstants } from './line-constants';

export function createLineBlock(): void {

    const resources = ResourcesService.getResources();
    const blockSelector = 'base_geometry_line';

    Blocks[blockSelector] = {
        init(): void {
            this.appendValueInput('StartPoint')
                .setCheck('Array')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_base_geometry_input_line_start_point);
            this.appendValueInput('EndPoint')
                .setCheck('Array')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_base_geometry_input_line_end_point.toLowerCase());
            this.setOutput(true, 'Line');
            this.setColour('#fff');
            this.setTooltip(resources.block_base_geometry_line_description);
            this.setHelpUrl(environment.docsUrl + lineConstants.helpUrl + '#' + 'create');
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            start: (JavaScript as any).valueToCode(block, 'StartPoint', (JavaScript as any).ORDER_ATOMIC),
            end: (JavaScript as any).valueToCode(block, 'EndPoint', (JavaScript as any).ORDER_ATOMIC),
        };

        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_point, resources.block_point
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        const code = createStandardContextIIFE(block, blockSelector, inputs, true, `return bitbybit.line.create(inputs);`);
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
            getRequired(resources, resources.block_point),
            getOfLength(resources, resources.block_point, 3)
        ]
    },
    {
        entity: keys[1],
        validations: [
            getRequired(resources, resources.block_point),
            getOfLength(resources, resources.block_point, 3)
        ]
    }];
}
