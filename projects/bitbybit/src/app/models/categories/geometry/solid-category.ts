import { ResourcesService } from '../../../../resources';

export function solidCategory(): string {
    const resources = ResourcesService.getResources();
    return `
    <category name="${resources.block_toolbox_category_geom_solid}" expanded="true" categorystyle="geometry_category">
        <block type="babylon_draw_csg_mesh">
            <value name="Colour">
                <shadow type="colour_picker">
                    <field name="COLOUR">#555</field>
                </shadow>
            </value>
            <value name="Opacity">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="Updatable">
                <shadow type="logic_boolean">
                    <field name="BOOL">FALSE</field>
                </shadow>
            </value>
        </block>
        <block type="babylon_draw_csg_meshes">
            <value name="Colour">
                <shadow type="colour_picker">
                    <field name="COLOUR">#555</field>
                </shadow>
            </value>
            <value name="Opacity">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="Updatable">
                <shadow type="logic_boolean">
                    <field name="BOOL">FALSE</field>
                </shadow>
            </value>
        </block>
        <block type="babylon_draw_csg_primitive_2d_polygon">
            <value name="Colour">
                <shadow type="colour_picker">
                    <field name="COLOUR">#555</field>
                </shadow>
            </value>
            <value name="Opacity">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="Updatable">
                <shadow type="logic_boolean">
                    <field name="BOOL">FALSE</field>
                </shadow>
            </value>
        </block>
        <block type="babylon_draw_2d_path">
            <value name="Colour">
                <shadow type="colour_picker">
                    <field name="COLOUR">#555</field>
                </shadow>
            </value>
            <value name="Width">
                <shadow type="math_number">
                    <field name="NUM">3</field>
                </shadow>
            </value>
            <value name="Opacity">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="Updatable">
                <shadow type="logic_boolean">
                    <field name="BOOL">FALSE</field>
                </shadow>
            </value>
        </block>
        <category name="${resources.block_toolbox_category_create}" expanded="true" categorystyle="geometry_category">
            <category name="${resources.block_toolbox_category_2d_path}" categorystyle="geometry_category">
                <block type="csg_primitive_2d_path_from_points">
                    <value name="Closed">
                        <shadow type="logic_boolean">
                            <field name="BOOL">FALSE</field>
                        </shadow>
                    </value>
                </block>
                <block type="csg_primitive_2d_path_from_polyline">
                    <value name="Closed">
                        <shadow type="logic_boolean">
                            <field name="BOOL">FALSE</field>
                        </shadow>
                    </value>
                </block>
                <block type="csg_primitive_2d_path_from_curve">
                    <value name="Closed">
                        <shadow type="logic_boolean">
                            <field name="BOOL">FALSE</field>
                        </shadow>
                    </value>
                </block>
                <block type="csg_primitive_2d_path_empty">
                </block>
            </category>
            <category name="${resources.block_toolbox_category_2d_polygon}" categorystyle="geometry_category">
                <block type="csg_primitive_2d_polygon">
                </block>
                <block type="csg_primitive_2d_rectangle">
                    <value name="Center">
                        <shadow type="base_geometry_point_2d">
                            <value name="X">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="Z">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                        </shadow>
                    </value>
                    <value name="Width">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                    <value name="Length">
                        <shadow type="math_number">
                            <field name="NUM">2</field>
                        </shadow>
                    </value>
                </block>
            </category>
            <category name="${resources.block_toolbox_category_3d_solid}" categorystyle="geometry_category">
                <block type="csg_primitive_cube">
                    <value name="Center">
                        <shadow type="base_geometry_point">
                            <value name="X">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="Y">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="Z">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                        </shadow>
                    </value>
                    <value name="Size">
                        <shadow type="math_number">
                            <field name="NUM">2</field>
                        </shadow>
                    </value>
                </block>
                <block type="csg_primitive_cuboid">
                    <value name="Center">
                        <shadow type="base_geometry_point">
                            <value name="X">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="Y">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="Z">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                        </shadow>
                    </value>
                    <value name="Width">
                        <shadow type="math_number">
                            <field name="NUM">2</field>
                        </shadow>
                    </value>
                    <value name="Length">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                    <value name="Height">
                        <shadow type="math_number">
                            <field name="NUM">2</field>
                        </shadow>
                    </value>
                </block>
                <block type="csg_primitive_sphere">
                    <value name="Center">
                        <shadow type="base_geometry_point">
                            <value name="X">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="Y">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="Z">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                        </shadow>
                    </value>
                    <value name="Radius">
                        <shadow type="math_number">
                            <field name="NUM">2</field>
                        </shadow>
                    </value>
                    <value name="Segments">
                        <shadow type="math_number">
                            <field name="NUM">24</field>
                        </shadow>
                    </value>
                </block>
            </category>
            <category name="${resources.block_toolbox_category_extrusion}" categorystyle="geometry_category">
                <block type="csg_extrude_linear_polygon">
                    <value name="Height">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                    <value name="TwistAngle">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="TwistSteps">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                </block>
                <block type="csg_extrude_linear_polygon_objects">
                    <value name="Height">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                    <value name="TwistAngle">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="TwistSteps">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                </block>
                <block type="csg_extrude_rectangular_points">
                    <value name="Height">
                        <shadow type="math_number">
                            <field name="NUM">2</field>
                        </shadow>
                    </value>
                    <value name="Size">
                        <shadow type="math_number">
                            <field name="NUM">0.1</field>
                        </shadow>
                    </value>
                </block>
                <block type="csg_extrude_rectangular_path">
                    <value name="Height">
                        <shadow type="math_number">
                            <field name="NUM">2</field>
                        </shadow>
                    </value>
                    <value name="Size">
                        <shadow type="math_number">
                            <field name="NUM">0.1</field>
                        </shadow>
                    </value>
                </block>
                <block type="csg_extrude_rectangular_paths">
                    <value name="Height">
                        <shadow type="math_number">
                            <field name="NUM">2</field>
                        </shadow>
                    </value>
                    <value name="Size">
                        <shadow type="math_number">
                            <field name="NUM">0.1</field>
                        </shadow>
                    </value>
                </block>
            </category>
        </category>
        <category name="${resources.block_toolbox_category_apply}" expanded="true" categorystyle="geometry_category">
            <block type="csg_colour">
                <value name="Colour">
                    <shadow type="colour_picker">
                        <field name="COLOUR">#555</field>
                    </shadow>
                </value>
            </block>
            <block type="csg_transform">
            </block>
            <category name="${resources.block_toolbox_category_2d_path}" categorystyle="geometry_category">
                <block type="csg_primitive_2d_path_close">
                </block>
                <block type="csg_primitive_2d_path_append_points">
                </block>
                <block type="csg_primitive_2d_path_append_polyline">
                </block>
                <block type="csg_primitive_2d_path_append_curve">
                </block>
                <block type="csg_primitive_2d_path_append_arc">
                    <value name="EndPoint">
                        <shadow type="base_geometry_point_2d">
                            <value name="X">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="Z">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                        </shadow>
                    </value>
                    <value name="RadiusX">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                    <value name="RadiusZ">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                    <value name="XAxisRotation">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="Clockwise">
                        <shadow type="logic_boolean">
                            <field name="BOOL">FALSE</field>
                        </shadow>
                    </value>
                    <value name="Large">
                        <shadow type="logic_boolean">
                            <field name="BOOL">FALSE</field>
                        </shadow>
                    </value>
                    <value name="Segments">
                        <shadow type="math_number">
                            <field name="NUM">16</field>
                        </shadow>
                    </value>
                </block>
            </category>
            <category name="${resources.block_toolbox_category_boolean}" categorystyle="geometry_category">
                <block type="csg_boolean_subtract">
                </block>
                <block type="csg_boolean_subtract_objects">
                </block>
                <block type="csg_boolean_union">
                </block>
                <block type="csg_boolean_union_objects">
                </block>
                <block type="csg_boolean_intersect">
                </block>
                <block type="csg_boolean_intersect_objects">
                </block>
            </category>
        </category>
    </category>
`;
}
