import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ArcRotateCamera, DirectionalLight } from '@babylonjs/core';
import { Engine } from '@babylonjs/core/Engines/engine';
import '@babylonjs/core/Materials/standardMaterial';
import { Color3, Color4, Matrix, Vector3 } from '@babylonjs/core/Maths/math';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { inject, svgResize, Theme, WorkspaceSvg, Xml } from 'blockly';
import * as Blockly from 'blockly';
import * as JavaScript from 'blockly/javascript';
import * as jsonpath from 'jsonpath';
import { BitByBitBlocklyHelperService } from 'src/blocks/_shared/bit-by-bit-blockly-helper.service';
import { PrintSaveInterface } from 'src/blocks/_shared/models/print-save.model';
import { PromptInterface } from 'src/blocks/_shared/models/prompt.interface';
import { BitByBitBlockHandlerService } from 'src/blocks/validations';
import { prepareBabylonForBlockly } from '../babylon-to-blockly';
import { assembleBlocks } from '../blocks/assemble-blocks';
import { ResourcesInterface, ResourcesService } from '../resources';
import { AboutDialogComponent } from './components/about-dialog/about-dialog.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ExamplesDialogComponent } from './components/examples-dialog/examples-dialog.component';
import { PrintSaveDialogComponent } from './components/print-save-dialog/print-save-dialog.component';
import { PromptDialogComponent } from './components/prompt-dialog/prompt-dialog.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { SponsorsDialogComponent } from './components/sponsors-dialog/sponsors-dialog.component';
import { ExamplesService } from './examples/example-service';
import { constantsModel } from './models/constants.model';
import { themeStyle } from './models/theme-styles.model';
import { toolboxDefinition } from './models/toolbox-definition';
import { SettingsService } from './shared/setting.service';
import { TagService } from './tags/tag.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    blocklyDiv: HTMLElement;
    blocklyArea: Element & HTMLElement;
    workspace: WorkspaceSvg;
    defaultPointsMesh: Mesh;
    scene: Scene;
    engine: Engine;
    windowBlockly;
    constants = constantsModel;
    resources: ResourcesInterface;
    firstTimeOpen = true;
    tagsNeedUpdate = false;

    constructor(
        public dialog: MatDialog,
        public readonly router: Router,
        public readonly route: ActivatedRoute,
        public readonly examplesService: ExamplesService,
        private readonly settingsService: SettingsService,
        private readonly changeDetectorService: ChangeDetectorRef,
        private readonly httpClient: HttpClient,
        private readonly tagService: TagService,
    ) {
    }

    ngAfterViewInit(): void {

        setTimeout(() => {
            const theme = Theme.defineTheme('themeName', themeStyle());

            this.blocklyArea = document.getElementById('blocklyArea');
            this.blocklyDiv = document.getElementById('blocklyDiv');
            this.workspace = inject(this.blocklyDiv,
                {
                    toolbox: document.getElementById('toolbox'),
                    zoom:
                    {
                        controls: true,
                        wheel: true,
                        startScale: 0.7,
                        maxScale: 3,
                        minScale: 0.3,
                        scaleSpeed: 1.2
                    },
                    trashcan: false,
                    theme
                });

            window.addEventListener('resize', () => this.onResize(), false);
            const toolbox = this.workspace.getToolbox();
            const flyout = toolbox.getFlyout();
            flyout.MARGIN = 40;
            flyout.CORNER_RADIUS = 10;
            this.onResize();

            this.collapseExpandedMenus();
            toolbox.clearSelection();

            (Blockly.prompt as any) = (message, defaultValue, callback) => { this.openPromptDialog({ message, defaultValue, callback }); };

            svgResize(this.workspace);

            const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
            this.engine = new Engine(canvas);
            this.scene = new Scene(this.engine);
            this.scene.clearColor = new Color4(1, 1, 1, 1);

            const camera = new ArcRotateCamera('Camera', 0, 10, 10, new Vector3(0, 0, 0), this.scene);
            camera.setPosition(new Vector3(0, 10, 20));
            camera.attachControl(canvas, true);
            const light = new DirectionalLight('DirectionalLight', new Vector3(10, 10, 0), this.scene);
            light.diffuse = new Color3(1, 1, 1);
            light.specular = new Color3(1, 1, 1);
            light.intensity = 1;
            const light2 = new DirectionalLight('DirectionalLight', new Vector3(-10, 10, -10), this.scene);
            light2.diffuse = new Color3(1, 1, 1);
            light2.specular = new Color3(1, 1, 1);
            light2.intensity = 1;
            this.scene.ambientColor = new Color3(0.1, 0.1, 0.1);

            this.windowBlockly = {};
            this.windowBlockly.scene = this.scene;
            this.windowBlockly.workspace = this.workspace;
            (window as any).blockly = this.windowBlockly;

            this.engine.runRenderLoop(() => {
                this.scene.render();

            });

            this.tagsNeedUpdate = false;

            camera.onProjectionMatrixChangedObservable.add(() => {
                this.tagsNeedUpdate = true;
            });

            camera.onViewMatrixChangedObservable.add(() => {
                this.tagsNeedUpdate = true;
            });

            this.scene.registerAfterRender(() => {
                this.tagService.handleTags(camera, this.tagsNeedUpdate, this.engine, this.scene);
                this.tagsNeedUpdate = false;
            });

            BitByBitBlocklyHelperService.promptPrintSave = (prompt: PrintSaveInterface) => this.openPrintSaveDialog(prompt);
            BitByBitBlocklyHelperService.angular = {
                httpClient: this.httpClient,
                HttpHeaders,
                HttpParams
            };
            BitByBitBlocklyHelperService.jsonpath = jsonpath;
            BitByBitBlocklyHelperService.clearAllDrawn = () => this.clearMeshesAndMaterials();

            this.settingsService.initSettings(this.workspace, this.changeDetectorService).subscribe(s => {

                this.route.queryParamMap.subscribe(param => {
                    const exampleParam = param.get('examples');
                    if (exampleParam) {
                        this.firstTimeOpen = false;
                        const xml = Xml.textToDom(this.examplesService.getExampleXml(exampleParam));
                        if (xml) {
                            this.workspace.clear();
                            Xml.domToWorkspace(xml, this.workspace);
                            this.workspace.zoomToFit();
                            this.workspace.zoomCenter(-3);
                            this.run();
                        }
                    } else {
                        if (this.firstTimeOpen) {
                            this.examples();
                            this.firstTimeOpen = false;
                        }
                    }
                });
            });
        }, 500);
    }

    private collapseExpandedMenus() {
        const treeRows = document.body.querySelectorAll(
            '.blocklyTreeRow');
        treeRows.forEach((element) => {
            const ariaExpanded = element.parentElement.attributes.getNamedItem('aria-expanded');
            if (ariaExpanded) {
                (element as HTMLElement).click();
            }
        });
    }

    ngOnInit(): void {

        this.resources = ResourcesService.getResources();
        prepareBabylonForBlockly();
        assembleBlocks();

        const el = document.getElementById('blocklyArea');
        el.insertAdjacentHTML('afterend', toolboxDefinition());

    }

    onResize() {
        let element = this.blocklyArea;
        if (this.engine) {
            this.engine.resize();
        }
        let x = 0;
        let y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent as HTMLElement;
        } while (element);
        this.blocklyDiv.style.width = this.blocklyArea.offsetWidth + 'px';
        this.blocklyDiv.style.height = this.blocklyArea.offsetHeight + 'px';
        svgResize(this.workspace);
    }

    onCode(code: string) { }

    import() {
        const inputFileElement = document.getElementById('exampleInput') as HTMLInputElement;
        inputFileElement.click();
        inputFileElement.onchange = (e) => {
            const file = inputFileElement.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = (evt) => {
                    const xml = Xml.textToDom(evt.target.result as string);
                    this.cleanCanvas();
                    Xml.domToWorkspace(xml, this.workspace);
                    this.workspace.zoomToFit();
                    this.workspace.zoomCenter(-3);
                    this.run();
                };
                reader.onerror = (evt) => {
                    document.getElementById('fileContents').innerHTML = 'error reading file';
                };
            }
        };
    }

    export() {
        const xml = Xml.workspaceToDom(this.workspace);
        const xmlText = Xml.domToText(xml);
        const blob = new Blob([xmlText], { type: 'text/xml' });
        const blobUrl = URL.createObjectURL(blob);

        const fileLink = document.createElement('a');
        fileLink.href = blobUrl;
        fileLink.target = '_self';
        fileLink.download = 'workspace.bitbybit';
        fileLink.click();
        fileLink.remove();
    }

    examples() {
        this.openExamplesDialog();
    }

    about() {
        this.openAboutDialog();
    }

    settings() {
        this.openSettingsDialog();
    }

    sponsors() {
        this.openSponsorsDialog();
    }

    cleanCanvas() {
        this.workspace.clear();
        this.router.navigate(['/']);
        this.run();
    }

    run() {
        try {
            this.clearMeshesAndMaterials();
            this.tagService.removeTagsIfNeeded();
            BitByBitBlocklyHelperService.intervalBag.forEach(i => clearInterval(i));
            BitByBitBlocklyHelperService.timeoutBag.forEach(t => clearTimeout(t));

            this.scene.clearColor = new Color4(1, 1, 1, 1);

            const javascript = JavaScript;
            (window as any).LoopTrap = 10000;
            javascript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop cancelled after 10000 iterations.";\n';
            const code = javascript.workspaceToCode(this.workspace);
            eval(`
'use reserved'
const scene = window.blockly.scene;
const blocklyWorkspace = window.blockly.workspace;
const BABYLON = window.BABYLON;
const verb = window.verb;
const Blockly = window.BlocklyGlobal;
const BitByBitBlockHandlerService = window.BitByBitBlockHandlerService;
const BitByBitBlocklyHelperService = window.BitByBitBlocklyHelperService;
${code}
            `);

            if (this.tagService.tagsExist()) {
                this.tagsNeedUpdate = true;
            }

        } catch (e) {
            const blockThatWasActive = this.workspace.getBlockById(BitByBitBlockHandlerService.runningBlockId);
            BitByBitBlockHandlerService.handleBlockException(blockThatWasActive, e);
            this.openAlertDialog({
                title: 'Code execution failed',
                details: `Something went wrong when running the code. Check if there are no disconnected or misconfigured components on your canvas`,
                message: `${e}`,
            });
        }
    }

    clearMeshesAndMaterials() {
        this.scene.meshes.forEach(m => m.dispose());
        this.scene.meshes = [];
        this.scene.materials.forEach(m => m.dispose());
        this.scene.materials = [];
    }

    private openAlertDialog(error: { title: string, details: string, message: string }): void {
        this.dialog.open(AlertDialogComponent, {
            width: '600px',
            height: '300px',
            autoFocus: false,
            data: error,
        });
    }

    private openExamplesDialog(): void {
        this.dialog.open(ExamplesDialogComponent, {
            width: '600px',
            height: '700px',
            autoFocus: false
        });
    }

    private openAboutDialog(): void {
        this.dialog.open(AboutDialogComponent, {
            width: '600px',
            height: '500px',
            autoFocus: false
        });
    }

    private openSponsorsDialog(): void {
        this.dialog.open(SponsorsDialogComponent, {
            width: '700px',
            height: '700px',
            autoFocus: false
        });
    }

    private openSettingsDialog(): void {
        this.dialog.open(SettingsDialogComponent, {
            width: '500px',
            height: '500px',
            autoFocus: false,
            data: {
                workspace: this.workspace
            }
        });
    }

    private openPrintSaveDialog(prompt: PrintSaveInterface): void {
        this.dialog.open(PrintSaveDialogComponent, {
            width: '500px',
            height: '450px',
            autoFocus: false,
            data: prompt
        });
    }

    private openPromptDialog(prompt: PromptInterface): void {
        const dialogRef = this.dialog.open(PromptDialogComponent, {
            width: '500px',
            height: '200px',
            autoFocus: false,
            data: prompt
        });

        dialogRef.afterClosed().subscribe(result => {
            prompt.callback(null);
        });
    }
}
