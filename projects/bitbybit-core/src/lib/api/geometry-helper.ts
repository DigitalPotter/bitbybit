import { Injectable } from '@angular/core';
import { LinesMesh, Matrix, Color3, Vector3, Color4, MeshBuilder } from '@babylonjs/core';
import { Context } from './context';
@Injectable()
export class GeometryHelper {
    constructor(private readonly context: Context) { }

    private readonly tolerance = 0.00001;
    private readonly snapTolerance = 0.00001;

    transformControlPoints(transformation: number[][] | number[][][], transformedControlPoints: number[][]): number[][] {
        let transformationArrays = [];

        if (this.getArrayDepth(transformation) === 2) {
            transformation.forEach(transform => {
                transformationArrays.push(...transform);
            });
        } else {
            transformationArrays = transformation;
        }

        transformationArrays.forEach(transform => {
            transformedControlPoints = this.transformPointsByMatrixArray(transformedControlPoints, transform);
        });
        return transformedControlPoints;
    }

    getArrayDepth = (value): number => {
        return Array.isArray(value) ?
            1 + Math.max(...value.map(this.getArrayDepth)) :
            0;
    }

    transformPointsByMatrixArray(points: number[][], transform: number[]): number[][] {
        const transformMatrix = Matrix.FromArray(transform);
        return this.transformPointsByMatrix(points, transformMatrix);
    }

    transformPointsByMatrix(points: number[][], transformMatrix: Matrix): number[][] {
        const transformedPoints = [];
        for (const pt of points) {
            const vector = new Vector3(pt[0], pt[1], pt[2]);
            const transformedVector = Vector3.TransformCoordinates(vector, transformMatrix);
            transformedPoints.push([transformedVector.x, transformedVector.y, transformedVector.z]);
        }
        return transformedPoints;
    }

    edgesRendering(mesh: LinesMesh, width: number, opacity: number, colour: string): void {
        mesh.enableEdgesRendering();
        mesh.edgesWidth = width;
        const edgeColor = Color3.FromHexString(colour);
        mesh.color = edgeColor;
        mesh.edgesColor = new Color4(edgeColor.r, edgeColor.g, edgeColor.b, opacity);
    }

    drawPolyline(mesh: LinesMesh, pointsToDraw: number[][], updatable: boolean, width: number, opacity: number, colour: string): LinesMesh {
        const points = [];
        const colors = [];
        pointsToDraw.forEach(pt => {
            points.push(new Vector3(pt[0], pt[1], pt[2]));
            colors.push(new Color4(1, 1, 1, 0));
        });

        mesh = this.drawPolylineFromPointsAndColours(mesh, updatable, points, colors, width, opacity, colour);
        return mesh;
    }

    drawPolylineFromPointsAndColours(
        mesh: LinesMesh, updatable: boolean, points: Vector3[], colors: Color4[], width: number, opacity: number, colour: string
    ): LinesMesh {
        if (mesh && updatable) {

            if (mesh.getTotalVertices() === points.length) {
                mesh = MeshBuilder.CreateLines(null, {
                    points,
                    colors,
                    instance: mesh,
                    useVertexAlpha: true,
                    updatable
                }, null);
            } else {
                mesh.dispose();
                mesh = this.createLines(updatable, points, colors);
            }
        } else {
            mesh = this.createLines(updatable, points, colors);
        }

        this.edgesRendering(mesh, width, opacity, colour);
        return mesh;
    }

    drawPolylines(
        mesh: LinesMesh, polylinePoints: number[][][], updatable: boolean,
        width: number, opacity: number, colour: string
    ): LinesMesh {
        const linesForRender = [];
        polylinePoints.forEach(polyline => {
            linesForRender.push(polyline.map(pt => new Vector3(pt[0], pt[1], pt[2])));
        });

        if (mesh && updatable) {
            if (mesh.getTotalVertices() / 2 === linesForRender.length) {
                mesh = MeshBuilder.CreateLineSystem(null,
                    {
                        lines: linesForRender,
                        instance: mesh,
                        useVertexAlpha: true,
                        updatable
                    }, null);
            } else {
                mesh.dispose();
                mesh = this.createLineSystem(updatable, linesForRender);
            }
        } else {
            mesh = this.createLineSystem(updatable, linesForRender);
        }

        this.edgesRendering(mesh, width, opacity, colour);
        return mesh;
    }

    createLineSystem(updatable: boolean, lines: Vector3[][]): LinesMesh {
        return MeshBuilder.CreateLineSystem(`lineSystem${Math.random()}`,
            {
                lines,
                useVertexAlpha: true,
                updatable
            }, this.context.scene);
    }

    createLines(updatable: boolean, points: Vector3[], colors: Color4[]): LinesMesh {
        return MeshBuilder.CreateLines(`lines${Math.random()}`,
            {
                points,
                colors,
                updatable,
                useVertexAlpha: true
            }, this.context.scene);
    }

    removeConsecutiveDuplicates(points: number[][], checkFirstAndLast: boolean = true): number[][] {
        const pointsRemaining = [];
        if (points.length > 1) {
            for (let i = 1; i < points.length; i++) {
                const currentPoint = points[i];
                const previousPoint = points[i - 1];
                if (!this.arePointsTheSame(currentPoint, previousPoint, this.tolerance)) {
                    pointsRemaining.push(previousPoint);
                }
                if (i === points.length - 1) {
                    pointsRemaining.push(currentPoint);
                }
            }
            if (checkFirstAndLast) {
                const firstPoint = pointsRemaining[0];
                const lastPoint = pointsRemaining[pointsRemaining.length - 1];
                if (this.arePointsTheSame(firstPoint, lastPoint, this.tolerance)) {
                    pointsRemaining.pop();
                }
            }
        } else if (points.length === 1) {
            pointsRemaining.push(...points);
        }
        return pointsRemaining;
    }

    arePointsTheSame(pointA: number[], pointB: number[], tolerance: number): boolean {
        let result = false;
        if (pointA.length === 2 && pointB.length === 2) {
            if (Math.abs(pointA[0] - pointB[0]) < tolerance
                && Math.abs(pointA[1] - pointB[1]) < tolerance) {
                result = true;
            }
        } else if (pointA.length === 3 && pointB.length === 3) {
            if (Math.abs(pointA[0] - pointB[0]) < tolerance
                && Math.abs(pointA[1] - pointB[1]) < tolerance
                && Math.abs(pointA[2] - pointB[2]) < tolerance) {
                result = true;
            }
        }
        return result;
    }

    snapGeometry(geometry): any {
        const polygons = this.context.jscad.geometries.geom3.toPolygons(geometry);
        const newpolygons = polygons.map((polygon) => {
            const newvertices = polygon.vertices.map((vertice) => this.snapVec3(vertice));
            return this.context.jscad.geometries.poly3.create(newvertices);
        });
        return this.context.jscad.geometries.geom3.create(newpolygons);
    }

    private snapVec3(v3): any {
        const tolerance = this.snapTolerance;
        const x = -(Math.round(v3[0] / tolerance) * tolerance) + 0; // no more -0
        const y = Math.round(v3[1] / tolerance) * tolerance + 0; // no more -0
        const z = Math.round(v3[2] / tolerance) * tolerance + 0; // no more -0
        return this.context.jscad.maths.vec3.fromValues(x, y, z);
    }
}
