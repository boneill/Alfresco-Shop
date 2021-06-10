import { DocumentListComponent } from '@alfresco/adf-content-services';
import { AlfrescoApiService, AuthenticationService } from '@alfresco/adf-core';

import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { from, Observable} from 'rxjs';


@Component({
  selector: 'lib-purchased-items.component',
  templateUrl: './purchased-items.component.html',
  styleUrls: ['./purchased-items.component.scss']
})
export class PurchasedItemsComponent implements OnInit {

  userCartFolderNode$: Observable<any>;
  
  //userCartFolderNode$: Observable<any> = Observable.of<any>({});

  
  documentList: DocumentListComponent;
  isItemSelected = false;

  constructor(
    private authService: AuthenticationService, 
    // private route: ActivatedRoute,
    private apiService: AlfrescoApiService ) { 

      //this.userCartFolderNode$ = of<any>({id: null});

    }

  ngOnInit(): void {
    
    //this.route.params.subscribe(parameters => {
      //this.userCartFolderId = parameters.id;
      //console.log("userCartFOlderId ", parameters );
      //console.log("DocumentList", this.documentList;  
    //});

    const userId = this.authService.getEcmUsername();
    this.userCartFolderNode$ = this.getUserCartFolder(userId);
  


  }

getUserCartFolder(userId: string): Observable <any>
{
  let nodeService: any = this.apiService.getInstance().nodes;

  return from(nodeService.getNodeInfo('-root-', {
        includeSource: true,
        include: ['path', 'properties'],
        relativePath: '/cart/' + userId
      }
    )
  );
  
//   return observable$.pipe(switchMap((node: MinimalNodeEntryEntity) => {
//   const tenant :Tenant = {
//   "id":tenantId,
//   "homeId": node.id
//   };
//   return of(tenant);
// }));
}


  nodeSelected($event){
    
    console.log("Node Selected", $event);
    
    if($event)  
      this.isItemSelected = true;

  }
}
