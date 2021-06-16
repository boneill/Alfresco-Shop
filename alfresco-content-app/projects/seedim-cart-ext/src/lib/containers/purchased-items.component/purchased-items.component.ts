import { DocumentListComponent } from '@alfresco/adf-content-services';
import { AlfrescoApiService, AuthenticationService } from '@alfresco/adf-core';
import { MinimalNodeEntity } from '@alfresco/js-api';

import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
//import { ActivatedRoute } from '@angular/router';
import { from, Observable} from 'rxjs';
import { AppStore, ViewNodeAction,  ViewNodeExtras } from '@alfresco/aca-shared/store'; 
import { Store } from '@ngrx/store';


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
    //private route: ActivatedRoute,
    private apiService: AlfrescoApiService,
    //private router: Router,
    protected store: Store<AppStore> ) { 

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

  navigateTo(node: MinimalNodeEntity) {
   
   console.log("Navigate to called for node", node);
   
    if (node && node.entry) {
     
      //this.showPreview(node, { location: '/cart/purchased-items' });
      this.showPreview(node, {path: '/cart/purchased-items'});
    }
  }

  showPreview(node: MinimalNodeEntity, extras?: ViewNodeExtras) {
   
   console.log("Show preview called for node ", node);
    if (node && node.entry) {
      let id: string;

      
        id = (node as any).entry.nodeId || (node as any).entry.guid || node.entry.id;
      
        console.log("Dispatching store action viewnodeaction ", id, extras)

      this.store.dispatch(new ViewNodeAction(id, extras));
    }
  }
}
