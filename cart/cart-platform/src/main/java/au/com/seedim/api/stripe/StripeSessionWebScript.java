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

import org.springframework.extensions.webscripts.Cache;


import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;

import au.com.seedim.cart.config.ShopConfig;



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
public class StripeSessionWebScript extends DeclarativeWebScript {
    
	private static Log logger = LogFactory.getLog(StripeSessionWebScript.class);
	private ShopConfig shopConfig;
	private String stripePrivateApiKey = null;
	private String stripeTaxRateId = null;
	private String appBaseUrl = "http://localhost:4200";
	
    protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        
    	
    	// store secret key in bean config that can be configured.
    	Session session = null;    	
    	Stripe.apiKey = this.stripePrivateApiKey;
    	
    	
    	try {
    	
		    	// get the values from the body and parse them into a json object
		  		String jsonString  = req.getContent().getContent();
		        if(logger.isDebugEnabled()){logger.debug("StripeSessionWebScript: json params" + jsonString);}
		        
		        JSONParser parser = new JSONParser();
		        JSONObject jsonObject = (JSONObject) parser.parse(jsonString);
		
		        JSONArray items = (JSONArray)jsonObject.get("cartItems");
		        //String name = WebscriptUtil.processParameter(jsonData,"cm:name");	
		        Iterator<JSONObject> iterator = items.iterator();
    	          List<LineItem> lineItems = new ArrayList<LineItem>();
    	          while (iterator.hasNext()) {
			        // do something. Fetch fields in services array.
			    	  JSONObject item = (JSONObject)iterator.next();
			    	  logger.debug("json Array item " + item.toJSONString());
			    	  Long price =(Long) item.get("price"); 
			    	  String name = (String)item.get("name");
			    	  
			    	  LineItem lineItem = SessionCreateParams.LineItem.builder()
	    	            .setQuantity(1L)
	    	            .addTaxRate(stripeTaxRateId)
	    	            .setPriceData(
	    	              SessionCreateParams.LineItem.PriceData.builder()
	    	                .setCurrency("aud")
	    	                .setUnitAmount(price)
	    	                .setProductData(
	    	                  SessionCreateParams.LineItem.PriceData.ProductData.builder()
	    	                    .setName(name)
	    	                    .build())
	    	                .build())
	    	            .build();
			    	  
			    	  	lineItems.add(lineItem);
			    	  
			      }
    	          
    	          SessionCreateParams params = 
    	              SessionCreateParams.builder()
	    	          .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
	    	          .setMode(SessionCreateParams.Mode.PAYMENT)
	    	          .setSuccessUrl(this.appBaseUrl + "/#/cart/checkout/success?session_id={CHECKOUT_SESSION_ID}")
	    	          .setCancelUrl(this.appBaseUrl + "/#/cart/checkout/cancel")
	    	          .addAllLineItem(lineItems)
	    	          .build();
		    	
    	      	session = Session.create(params);
		    	
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
        
        model.put("id", sessionId);

        

        return model;
    }
    
    /**
     * Set shopconfig 
     * 
     * @param shopConfig
     */
    public void setShopConfig(ShopConfig shopConfig) {
        
          this.shopConfig = shopConfig;
          this.stripePrivateApiKey = this.shopConfig.getStripeApiPrivateKey();
          this.stripeTaxRateId = this.shopConfig.getStripeTaxRateId();
          this.appBaseUrl = this.shopConfig.getShopAppUrl();
      }
}