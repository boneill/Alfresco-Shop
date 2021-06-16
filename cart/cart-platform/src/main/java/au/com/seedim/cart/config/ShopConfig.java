package au.com.seedim.cart.config;

public class ShopConfig{
	
	public String stripeApiPrivateKey;
	public String stripeTaxRateId;
	
	public String shopAppUrl;
	
	public String getStripeApiPrivateKey() {
		return stripeApiPrivateKey;
	}
	public void setStripeApiPrivateKey(String stripeApiPrivateKey) {
		this.stripeApiPrivateKey = stripeApiPrivateKey;
	}
	
	public String getShopAppUrl() {
		return shopAppUrl;
	}
	public void setShopAppUrl(String shopAppUrl) {
		this.shopAppUrl = shopAppUrl;
	}
	
	public String getStripeTaxRateId() {
		return stripeTaxRateId;
	}
	public void setStripeTaxRateId(String stripeTaxRateId) {
		this.stripeTaxRateId = stripeTaxRateId;
	}
	
	
	/**
	   * Check if all the services are different of null
	   * @throws ReflectiveOperationException
	   */
	  public void init() throws ReflectiveOperationException {
	    
	  }
}
