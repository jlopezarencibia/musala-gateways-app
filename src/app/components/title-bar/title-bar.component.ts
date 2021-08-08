import { Component, OnInit } from '@angular/core';
import {faMicrochip, faNetworkWired} from "@fortawesome/free-solid-svg-icons";
import {Observable} from "rxjs";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {

  // icons
  icLogo = faNetworkWired;
  icMicro = faMicrochip;

  path: Observable<string>

  constructor(
      private readonly appService: AppService
  ) {
      this.path = appService.path;
  }

  ngOnInit(): void {
  }

}
