import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MembersModule } from "./members/members.module";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MembersModule, StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
