package au.com.seedim.cart.model;

import org.alfresco.service.namespace.QName;


public interface CartModel {
	
    public static final String URI_MODEL = "http://www.seedim.com.au/cart/model/content/1.0";

	

    public static String PREFIX_MODEL = "cart";

    public static QName TYPE_CART_PURCHASED_DOCUMENT = QName.createQName(URI_MODEL, "cartPurchasedDocument");
    public static QName ASPECT_CART_DOCUMENT_ASPECT = QName.createQName(URI_MODEL, "cartDocumentAspect");
    public static QName ASPECT_CART_SKU = QName.createQName(URI_MODEL, "skuAspect");
    public static final QName PROP_ORIGINAL_NAME = QName.createQName(URI_MODEL, "originalDocumentName");
    public static QName PROP_CART_USER_ID = QName.createQName(URI_MODEL, "userId");
    public static QName PROP_CART_PRICE = QName.createQName(URI_MODEL, "price");
       
    
}