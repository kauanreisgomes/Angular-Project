
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SecurityUpdate } from './SecurityUpdate';
import '@angular/localize/init'
import { SecurityUpdateService } from './SecurityUpdate.service';
import { filter } from 'rxjs';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public listUpdates: SecurityUpdate[] = [];
  public pagUpdates: SecurityUpdate[] = [];
  public search: string = '';
  public page = 1;
  public pageSize: number = 15;
  public collectionsSize: number = 0;

  onKeyUp(target: any){
    if(target instanceof EventTarget) {
      var elemento = target as HTMLInputElement;
      this.search = elemento.value;
      this.filter(this.search);
    }
  }
  
  constructor(private service: SecurityUpdateService){}

  ngOnInit() {
    this.getSecurityUpdates();
  }

  public getSecurityUpdates(): void{
    this.service.getSecurityUpdates().subscribe(
      (response: SecurityUpdate[]) => {
        this.listUpdates = response;
        console.log(this.listUpdates);
        this.collectionsSize = this.listUpdates.length
        this.pagUpdates = this.listUpdates;
      }
    );
  }

  filter(filter: string) {
    if (filter) {
      filter = filter.toUpperCase();

      this.pagUpdates = this.listUpdates.filter(a =>
          a.id.toUpperCase().includes(filter) || a.documentTitle.toUpperCase().includes(filter) || a.alias.toUpperCase().includes(filter) ||
          a.cvrfUrl.toUpperCase().includes(filter) || formatDate(a.currentReleaseDate,'yyyy-MM-dd HH:mm:ss zzz', "en-US").includes(filter) ||
          formatDate(a.initialReleaseDate,'yyyy-MM-dd HH:mm:ss zzz', "en-US").includes(filter)
      );
    }else{
      this.pagUpdates = this.listUpdates;
    }

    this.collectionsSize = this.pagUpdates.length
  }

}
