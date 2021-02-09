import { ResourcesService } from '../../../../../resources';

export function curveCategory(): string {
    const resources = ResourcesService.getResources();
    return `
    <category name="${resources.block_toolbox_category_geom_curve}"  categorystyle="geometry_category">
        <category name="${resources.block_toolbox_category_draw}"  categorystyle="geometry_category">
            <block type="babylon_draw_curve">
                <value name="Colour">
                    <block type="colour_picker">
                        <field name="COLOUR">#555</field>
                    </block>
                </value>
                <value name="Width">
                    <block type="math_number">
                        <field name="NUM">3</field>
                    </block>
                </value>
                <value name="Opacity">
                    <block type="math_number">
                        <field name="NUM">1</field>
                    </block>
                </value>
                <value name="Updatable">
                    <block type="logic_boolean">
                        <field name="BOOL">FALSE</field>
                    </block>
                </value>
            </block>
            <block type="babylon_draw_curves">
                <value name="Colour">
                    <block type="colour_picker">
                        <field name="COLOUR">#555</field>
                    </block>
                </value>
                <value name="Width">
                    <block type="math_number">
                        <field name="NUM">3</field>
                    </block>
                </value>
                <value name="Opacity">
                    <block type="math_number">
                        <field name="NUM">1</field>
                    </block>
                </value>
                <value name="Updatable">
                    <block type="logic_boolean">
                        <field name="BOOL">FALSE</field>
                    </block>
                </value>
            </block>
        </category>
        <category name="${resources.block_toolbox_category_apply_transform}" categorystyle="geometry_category">
            <block type="verb_geometry_nurbs_curve_transform">
            </block>
            <block type="verb_geometry_nurbs_curves_transform">
            </block>
        </category>
            <category name="${resources.block_toolbox_category_geom_base}" categorystyle="geometry_category">
                <category name="${resources.block_toolbox_category_create}" categorystyle="geometry_category">
                    <block type="verb_geometry_nurbs_curve_by_points">
                        <value name="Degree">
                            <block type="math_number">
                                <field name="NUM">3</field>
                            </block>
                        </value>
                    </block>
                    <block type="verb_geometry_nurbs_curve_by_knots_control_points_weights">
                    </block>
                    <block type="verb_geometry_bezier_curve_by_points">
                    </block>
                </category>
                <category name="${resources.block_toolbox_category_apply}" categorystyle="geometry_category">
                    <block type="verb_geometry_nurbs_curve_divide_by_arc_length_points">
                    </block>
                    <block type="verb_geometry_nurbs_curve_divide_by_arc_length_params">
                    </block>
                    <block type="verb_geometry_nurbs_curve_divide_by_equal_arc_length_points">
                    </block>
                    <block type="verb_geometry_nurbs_curve_divide_by_equal_arc_length_params">
                    </block>
                    <block type="verb_geometry_nurbs_curve_split">
                    </block>
                    <block type="verb_geometry_nurbs_curve_closest_point">
                    </block>
                    <block type="verb_geometry_nurbs_curve_closest_points">
                    </block>
                    <block type="verb_geometry_nurbs_curve_closest_param">
                    </block>
                    <block type="verb_geometry_nurbs_curve_closest_params">
                    </block>
                    <block type="verb_geometry_nurbs_curve_start_point">
                    </block>
                    <block type="verb_geometry_nurbs_curve_end_point">
                    </block>
                    <block type="verb_geometry_nurbs_curve_point_at_param">
                    </block>
                    <block type="verb_geometry_nurbs_curve_length">
                    </block>
                    <block type="verb_geometry_nurbs_curve_degree">
                    </block>
                    <block type="verb_geometry_nurbs_curve_knots">
                    </block>
                    <block type="verb_geometry_nurbs_curve_weights">
                    </block>
                    <block type="verb_geometry_nurbs_curve_control_points">
                    </block>
                    <block type="verb_geometry_nurbs_curve_length_at_param">
                    </block>
                    <block type="verb_geometry_nurbs_curve_param_at_length">
                    </block>
                    <block type="verb_geometry_nurbs_curve_clone">
                    </block>
                    <block type="verb_geometry_nurbs_curve_domain">
                    </block>
                    <block type="verb_geometry_nurbs_curve_derivatives">
                    </block>
                    <block type="verb_geometry_nurbs_curve_reverse">
                    </block>
                    <block type="verb_geometry_nurbs_curve_tangent">
                    </block>
                    <block type="verb_geometry_nurbs_curve_tessellate">
                    </block>
                    <block type="verb_geometry_nurbs_curves_points_at_param">
                    </block>
                    <block type="verb_geometry_nurbs_curves_start_points">
                    </block>
                    <block type="verb_geometry_nurbs_curves_end_points">
                    </block>
                    <block type="verb_geometry_nurbs_curves_divide_by_arc_length_points">
                    </block>
                    <block type="verb_geometry_nurbs_curves_divide_by_equal_arc_length_points">
                    </block>
                </category>
            </category>
            <category name="${resources.block_toolbox_category_geom_circle}"   categorystyle="geometry_category">
                <category name="${resources.block_toolbox_category_create}"   categorystyle="geometry_category">
                    <block type="verb_geometry_nurbs_curve_circle">
                        <value name="Center">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="XAxis">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">1</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="YAxis">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">1</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="Radius">
                            <block type="math_number">
                                <field name="NUM">1</field>
                            </block>
                        </value>
                    </block>
                    <block type="verb_geometry_nurbs_curve_arc">
                        <value name="Center">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="XAxis">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">1</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="YAxis">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">1</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="Radius">
                            <block type="math_number">
                                <field name="NUM">1</field>
                            </block>
                        </value>
                        <value name="MinAngle">
                            <block type="math_number">
                                <field name="NUM">0</field>
                            </block>
                        </value>
                        <value name="MaxAngle">
                            <block type="math_number">
                                <field name="NUM">90</field>
                            </block>
                        </value>
                    </block>
                </category>
                <category name="${resources.block_toolbox_category_apply}"  categorystyle="geometry_category">
                    <block type="verb_geometry_nurbs_curve_circle_center">
                    </block>
                    <block type="verb_geometry_nurbs_curve_circle_radius">
                    </block>
                    <block type="verb_geometry_nurbs_curve_circle_x_axis">
                    </block>
                    <block type="verb_geometry_nurbs_curve_circle_y_axis">
                    </block>
                    <block type="verb_geometry_nurbs_curve_circle_min_angle">
                    </block>
                    <block type="verb_geometry_nurbs_curve_circle_max_angle">
                    </block>
                </category>
            </category>
            <category name="${resources.block_toolbox_category_geom_ellipse}"   categorystyle="geometry_category">
                <category name="${resources.block_toolbox_category_create}"   categorystyle="geometry_category">
                    <block type="verb_geometry_nurbs_curve_ellipse">
                        <value name="Center">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="XAxis">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">2</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="YAxis">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">1</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                    </block>
                    <block type="verb_geometry_nurbs_curve_ellipse_arc">
                        <value name="Center">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="XAxis">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">2</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="YAxis">
                            <block type="base_geometry_point">
                                <value name="X">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                                <value name="Y">
                                    <block type="math_number">
                                        <field name="NUM">1</field>
                                    </block>
                                </value>
                                <value name="Z">
                                    <block type="math_number">
                                        <field name="NUM">0</field>
                                    </block>
                                </value>
                            </block>
                        </value>
                        <value name="MinAngle">
                            <block type="math_number">
                                <field name="NUM">0</field>
                            </block>
                        </value>
                        <value name="MaxAngle">
                            <block type="math_number">
                                <field name="NUM">90</field>
                            </block>
                        </value>
                    </block>
                </category>
                <category name="${resources.block_toolbox_category_apply}"  categorystyle="geometry_category">
                    <block type="verb_geometry_nurbs_curve_ellipse_center">
                    </block>
                    <block type="verb_geometry_nurbs_curve_ellipse_x_axis">
                    </block>
                    <block type="verb_geometry_nurbs_curve_ellipse_y_axis">
                    </block>
                    <block type="verb_geometry_nurbs_curve_ellipse_min_angle">
                    </block>
                    <block type="verb_geometry_nurbs_curve_ellipse_max_angle">
                    </block>
                </category>
            </category>
    </category>
`;
}
