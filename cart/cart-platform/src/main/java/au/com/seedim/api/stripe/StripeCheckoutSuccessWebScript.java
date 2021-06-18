/**
 * Copyright (C) 2017 Alfresco Software Limited.
 * <p/>
 * This file is part of the Alfresco SDK project.
 * <p/>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p/>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p/>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package au.com.seedim.api.stripe;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.alfresco.service.cmr.repository.NodeRef;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptRequest;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;

import au.com.seedim.cart.service.CartService;



/**
 * Controller class for StripeSessionWebscript
 * 
 * Note: Expected body input
 * 
 * {
	"cartItems": [{
		"id": "96a7d34f-7045-49f7-9e23-f6f1835cde94",
		"name": "Seed-Customer-SOW.pdf",
		"price": 1299,
		"image": "",
		"quantity": 1,
		"data": {}
	}, {
		"id": "8f04f8e6-6845-499b-85e6-d9d279bcc21f",
		"name": "LeftSide.docx",
		"price": 1299,
		"image": "",
		"quantity": 1,
		"data": {}
	}]
}
 *
 * @author brian.oneill@seedim.com.au
 * @since 6.2.0
 */
public class StripeCheckoutSuccessWebScript extends DeclarativeWebScript {
    private static Log logger = LogFactory.getLog(StripeCheckoutSuccessWebScript.class);

    private CartService cartService;
    
    
	protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        
    	
    	// TODO store secret key somewhere safe that can be configured.
    	Session session = null;
    	String userId = null;
    	NodeRef userCartFolderId = null;
    	String paymentStatus = "unpaid";
    	Customer customer = null;
    	
    	try {
    	
    			//get the session id from the json object
	    		String jsonString  = req.getContent().getContent();
		        if(logger.isDebugEnabled()){logger.debug("StripeSessionWebScript: json params" + jsonString);}
		        
		        JSONParser parser = new JSONParser();
		        JSONObject jsonObject = (JSONObject) parser.parse(jsonString);
		        
		        userId =(String) jsonObject.get("user_id");
		        if(userId == null) {		        	
	    				throw new Exception("user_id is a mandatory json body parameter");
		        }
		        
		        String sessionId =(String) jsonObject.get("session_id"); 
		        if(sessionId == null) {		        	
    				throw new Exception("session_id is a mandatory json body parameter");
		        }
    		
    			//String sessionId = processParameter(req, "session_id");    	        
		        
    			session = Session.retrieve(sessionId);
    			paymentStatus = session.getPaymentStatus();
    			if(session.getCustomer() != null) {
    				customer = Customer.retrieve(session.getCustomer());
    			}
    			
    			// get the details of the items that have been paid for
    			
    			JSONArray items = (JSONArray)jsonObject.get("cartItems");
    			if(items != null && items.size() > 0) {
    				  //String name = WebscriptUtil.processParameter(jsonData,"cm:name");	
    		        Iterator<JSONObject> iterator = items.iterator();
    		        List<NodeRef> lineItems = new ArrayList<NodeRef>();
        	        while (iterator.hasNext()) {
    			        // do something. Fetch fields in services array.
    			    	  JSONObject item = (JSONObject)iterator.next();
    			    	  logger.debug("json Array item " + item.toJSONString());
    			    	  String id =(String) item.get("id"); 
    			    	  	  
    			    	  NodeRef itemRef = new NodeRef("workspace://SpacesStore/" + id);
    			    	  lineItems.add(itemRef);
    			    	  
    			      }
        			
        			// get all of the nodes that need to be copied ot the users cart folder and copy them
        	        userCartFolderId = this.cartService.addPurchasedItems(lineItems, userId);
        			logger.debug("Payment Status: " + paymentStatus);
    			}
		        
		      
    					    	

        }catch(StripeException se) {
        	
    		status.setCode(Status.STATUS_BAD_REQUEST); 
    		status.setMessage(se.getMessage());
    		status.setException(se);
    		status.setRedirect(true);
    		
				
        
		}catch(Exception e){
      
	    	e.printStackTrace();
	    	status.setCode(Status.STATUS_INTERNAL_SERVER_ERROR); 
			status.setMessage("Error creating client " + e.getMessage());
			status.setException(e);
			status.setRedirect(true);
			
			throw new WebScriptException(Status.STATUS_INTERNAL_SERVER_ERROR, e.getMessage(), e);
      
		}	
    	
    	
    	Map<String, Object> model = new HashMap<String, Object>();
        
    	String sessionId = session != null && session.getId() != null? session.getId() : "Error";
        //String sessionId = "test";
    	logger.debug("StripeSessionWebScript - Stripe Session ID returned " + sessionId);
        
    	String customerName = customer != null && customer.getName() != null? customer.getName() : "";
    	String customerEmail = customer != null && customer.getEmail() != null? customer.getEmail() : "";
    	
        model.put("paymentstatus", paymentStatus);
        model.put("customername", customerName);
        model.put("customeremail", customerEmail);
       // model.put("userCartFolderId", userCartFolderId != null? userCartFolderId.getId() : "");
        

        return model;
    }
    
    /**
     * Check if the parameter has been set and if not throw an exception
     * @param request
     * @param param
     * @param value
     * @return
     */
    public static String processParameter(WebScriptRequest request, String param){
     
    	String value = null;
    	if((request.getParameter(param))!= null && !(StringUtils.isBlank(request.getParameter(param)))){
        
          value = request.getParameter(param);
          if(logger.isDebugEnabled()){logger.debug("Passed value for: "+ param + " - " + value);}
      }else{
        throw new WebScriptException(400,
                "Invalid Parameter passed for " + param);
      }
      
      return value;
    }
    
    public CartService getCartService() {
		return cartService;
	}

	public void setCartService(CartService cartService) {
		this.cartService = cartService;
	}

}