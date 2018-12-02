import { NgModule } from '@angular/core';
import { SafePipe } from './safe-url/safe-url';
import { CategoryFilterPipe } from './category-filter/category-filter';

@NgModule({
	declarations: [SafePipe,
    CategoryFilterPipe],
	imports: [],
	exports: [SafePipe,
    CategoryFilterPipe]
})
export class PipesModule {}
