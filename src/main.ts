import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { prepareBabylonForBlockly } from './babylon-to-blockly';
import { assembleBlocks } from './blocks/assemble-blocks';
import { languagesEnum } from './resources/languages.enum';
import { ResourcesService } from './resources/resources.service';

ResourcesService.setLanguage(languagesEnum.en);
prepareBabylonForBlockly();
assembleBlocks();

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
