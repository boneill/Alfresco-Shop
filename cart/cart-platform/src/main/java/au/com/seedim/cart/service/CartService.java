package au.com.seedim.cart.service;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.nodelocator.CompanyHomeNodeLocator;
import org.alfresco.repo.nodelocator.NodeLocatorService;
import org.alfresco.service.cmr.repository.CopyService;
import org.alfresco.service.cmr.repository.InvalidNodeRefException;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.NamespaceService;
import org.alfresco.service.namespace.QName;
import org.apache.log4j.Logger;

import au.com.seedim.cart.model.CartModel;

public class CartService {

    protected NodeService nodeService;
   	private NodeLocatorService nodeLocatorService;
    private CopyService copyService;
    

	
    static final Logger logger = Logger.getLogger(CartService.class);
    
    /**
     * Adds documents in cart to the users cart folder in companyhome/cart/<userId>
     * 
     * @param cartDocuments
     * @param userId
     * @return
     * @throws Exception
     */
    public NodeRef addPurchasedItems(List<NodeRef> cartDocuments, String userId) throws Exception {
    	
  	  
    	NodeRef usersCartFolderRef = null;
    	
    	try {
  	  
  			 
  			 logger.debug("CartService: AddPurchedItems entered");
  			     
  				 if(cartDocuments != null) {
  					 // create the users folder if it does not exist
  					 usersCartFolderRef = this.getOrCreateCartUserFolder(userId);
  					 // check 
  					logger.debug("CartService:addPurchasedItems list has  " + cartDocuments.size() + " documents");
  					 for(NodeRef srcNodeRef: cartDocuments) {
  						if(srcNodeRef != null && nodeService.exists(srcNodeRef)) {
  							
  							// get the name from the 
  							String name = (String)this.nodeService.getProperty(srcNodeRef, ContentModel.PROP_NAME);
  							
  							// copy the item to the cart users cart folder
  								
  							NodeRef copyRef = this.copyService.copy(srcNodeRef, usersCartFolderRef, ContentModel.ASSOC_CONTAINS, QName.createQName(name) );
  							nodeService.setType(copyRef, CartModel.TYPE_CART_PURCHASED_DOCUMENT);
  							nodeService.setProperty(copyRef, CartModel.PROP_CART_USER_ID, userId);
  							nodeService.setProperty(copyRef, ContentModel.PROP_NAME, name + "_" + copyRef.getId());
  							nodeService.setProperty(copyRef, CartModel.PROP_ORIGINAL_NAME, name);
  							
  							
  						}else {
  							throw new InvalidNodeRefException("Cart Item " + srcNodeRef + " no longer exists",srcNodeRef);
  						}
  					 }
  				 }
  				 
  				 return usersCartFolderRef;
  				 			 
  			 
  	  }finally {
  		logger.debug("CartService: AddPurchedItems exited");
  	  }
  	  
  	}  
	  
	  
	  
	/**
	 * Get the cart folder for the userId passed in.  If it does not exist create it.
	 * It should be create in Company Home/Cart/<user-Id>
	 * 
	 * @param userId
	 * @return
	 */
	private NodeRef getOrCreateCartUserFolder(String userId) {
		// TODO Auto-generated method stub
		NodeRef cartHomeRef = null;
		NodeRef userCartRef = null;
		
		NodeRef companyHomeNodeRef = nodeLocatorService.getNode(CompanyHomeNodeLocator.NAME, null, null);
		if(companyHomeNodeRef != null) {
			  cartHomeRef = this.nodeService.getChildByName(companyHomeNodeRef, ContentModel.ASSOC_CONTAINS, "Cart");
		 
			  if(cartHomeRef == null) {
				  
				Map<QName, Serializable> props = new HashMap<>();
				props.put(ContentModel.PROP_NAME, "Cart");
				
					
				cartHomeRef = this.nodeService.createNode(
						companyHomeNodeRef, 
			            ContentModel.ASSOC_CONTAINS, 
			            QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "Cart"),
			            ContentModel.TYPE_FOLDER, props).getChildRef();
			  }
		}
	  
		if(cartHomeRef != null) {
			
			userCartRef = this.nodeService.getChildByName(cartHomeRef, ContentModel.ASSOC_CONTAINS, userId);
			if(userCartRef == null) {
				Map<QName, Serializable> props = new HashMap<>();
				props.put(ContentModel.PROP_NAME, userId);
				props.put(CartModel.PROP_CART_USER_ID, userId);
				
					
				userCartRef = this.nodeService.createNode(
						cartHomeRef, 
			            ContentModel.ASSOC_CONTAINS, 
			            QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, userId),
			            ContentModel.TYPE_FOLDER, props).getChildRef();
			}
		}
			
		return userCartRef;
		  
		
	}


	public NodeLocatorService getNodeLocatorService() {
		return nodeLocatorService;
	}


	public void setNodeLocatorService(NodeLocatorService nodeLocatorService) {
		this.nodeLocatorService = nodeLocatorService;
	}
	
	public CopyService getCopyService() {
	    return copyService;
	  }

	  public void setCopyService(CopyService copyService) {
	    this.copyService = copyService;
	  }

	  public NodeService getNodeService() {
			return nodeService;
		}



		public void setNodeService(NodeService nodeService) {
			this.nodeService = nodeService;
		}


}
