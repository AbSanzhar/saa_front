import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor() { }
  public table = 1;
  ngOnInit() {
  }
  getTable() {
    return +this.table;
  }
  showTableSelect() {
    console.log(this.table);
  }
  public menu_condition = false;
  public content_condition = false;
  pushMenu() {
      if(this.menu_condition == false && this.content_condition == false) {
        this.menu_condition = true;
        this.content_condition = true;
      }
      else {
        this.menu_condition = false;
        this.content_condition = false;
      }

  }
}
