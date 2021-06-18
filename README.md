<<<<<<< HEAD
Alfresco Shopfront Addon

The Alfresco Shopfront Addon turns Alfresco into an eCommerce site.  Shoppers can use Alfresco to find content by either browsing or searching and add content to a shopping cart.  Users cannot download content unless they have purchased it.  On Checkout, users are directed to a Credit Card payment checkout page so that they can pay for the content.  Once paid, the users can download or print out the content items they have purchased

Building Alfresco Shopfront Addon
=======
**Alfresco Shopfront Addon

The Alfresco Shopfront Addon turns Alfresco into an eCommerce site.  Shoppers can use Alfresco to find content by either browsing or searching and add content to a shopping cart.  Users cannot download content unless they have purchased it.  On Checkout, users are directed to a Credit Card payment checkout page so that they can pay for the content.  Once paid, the users can download or print out the content items they have purchased

**Building Alfresco Shopfront Addon
>>>>>>> 2942cdd3479ba6d8740d971b80dd2127eb8e19de

	Clone Alfresco Shop from github repo
		$ git clone https://github.com/boneill/Alfresco-Shop.git
	
	Update Stripe Details
		Update your Stripe account details in alfresco.global.properties located in Alfresco-Shop/cart/cart-platform/src/main/resources/alfresco/module/cart-platform
	
	Build Alfresco AMPs
		From Alfresco-Shop/cart directory, run the following command
		./run.sh build_start
		The above command generated two amps located in the following directory;
		o	Repo AMP
			Alfresco-Shop/cart/cart-platform/target/cart-platform-1.0-SNAPSHOT.amp
		o	Share AMP 
			Alfresco-Shop/cart/cart-share/target/ cart-share-1.0-SNAPSHOT.amp

	Build Alfresco Shopfront Content App
		From Alfresco-Shop/Alfresco-Content-App folder run the folder command to build the Alfresco Shop App.
		Install Alfresco Content App dependencies
			npm install
		Build ACA-Shared library since the Alfresco Shop Add On uses resources from the ACA-Shared
			ng build aca-shared
		Build CART library which is the core of the Alfresco Shop App
			npm run build:cart
		The following command to verify the app builds and works accordingly
			npm start
		The following command creates a transpiled version of the code in Alfresco-Shop/Alfresco-Content-App/dist folder that can be released to a web server like Apache/NGIX or a 		web container like Apache Tomcat. The default release folder is called app but it can be renamed as required.
			ng build –prod

<<<<<<< HEAD
=======
**Installing Alfresco Shopfront Addon**

Installing Alfresco AMPs
	*This requires the installation of the Repository and Share amps.
	*Download the required AMPs from Github
	*Stop Alfresco
		*Copy cart-platform-1.0-SNAPSHOT.amp to $AlfrescoHome/amps
		*Copy cart-share-1.0-SNAPSHOT.ampto $AlfrescoHome/amps_share
		*Run <AlfrescoHome>/bin/apply_amps.sh -force
	*Restart Alfresco and verify that the install has been successful by adding the SKUItem Aspect to a content item in your Repository

Installing the Alfresco Shopfront Angular Application
	The following install instructions are for installing the Angular  Application on the Tomcat that you are running Alfresco on.  
	However, it does not need to be co-located with the Alfresco application and could be installed on nginx or apache web server.
		*Download the alfresco-shopfront.zip from Github
		*Extract the alfresco-shopfront.zip folder and copy the alfresco-shopfront folder to Tomcat webapps directory.
		*Update the app.config.json (in the root of the alfresco-shopfront folder).  set “ecmHost”: “<URL to your Alfresco application>.  eg http://localhost:8080”
>>>>>>> 2942cdd3479ba6d8740d971b80dd2127eb8e19de
