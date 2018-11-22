import { NgModule } from '@angular/core';
import { SafePipe } from './safe-url/safe-url';
@NgModule({
	declarations: [SafePipe],
	imports: [],
	exports: [SafePipe]
})
export class PipesModule {}
