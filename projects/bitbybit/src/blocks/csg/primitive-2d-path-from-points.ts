import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../resources';
import { createStandardContextIIFE } from '../_shared';
import { getRequired, makeRequiredValidationModelForInputs, BitByBitBlockHandlerService, ValidationEntityInterface } from '../validations';

export function createPrimitive2dPathFromPointsBlock(): void {

    const resources = ResourcesService.getResources();
    const blockSelector = 'csg_primitive_2d_path_from_points';

    Blocks[blockSelector] = {
        init(): void {
            this.appendValueInput('Points')
                .setCheck('Array')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_primitive_2d_path_from_points_input_points);
            this.appendValueInput('Closed')
                .setCheck('Boolean')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_primitive_2d_path_from_points_input_closed.toLowerCase());
            this.setOutput(true, 'Path');
            this.setColour('#fff');
            this.setTooltip(resources.block_csg_primitive_2d_path_from_points_description);
            this.setHelpUrl('');
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            points: JavaScript.valueToCode(block, 'Points', JavaScript.ORDER_ATOMIC),
            closed: JavaScript.valueToCode(block, 'Closed', JavaScript.ORDER_ATOMIC),
        };

        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_points, resources.block_closed
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        const code = createStandardContextIIFE(block, blockSelector, inputs, true,
            `
            const twoDimensionalPoints = inputs.points.map(pt => [pt[0], pt[2]]);
            const duplicatePointsRemoved = BitByBit.BitByBitBlocklyHelperService.removeConsecutiveDuplicates(twoDimensionalPoints, BitByBit.BitByBitBlocklyHelperService.tolerance);
            let path2d = BitByBit.CSG.geometries.path2.fromPoints({}, duplicatePointsRemoved);
            if(inputs.closed){
                path2d = BitByBit.CSG.geometries.path2.close(path2d);
            }
            return path2d;
`
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
            getRequired(resources, resources.block_points),
        ]
    }, {
        entity: keys[1],
        validations: [
            getRequired(resources, resources.block_closed),
        ]
    }];
}
