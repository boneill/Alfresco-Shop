import { RuleContext } from '@alfresco/adf-extensions';

/**
 * Checks if user has selected a file.
 * JSON ref: `app.selection.file`
 */
 export function hasFileSelected(context: RuleContext): boolean {
    if (context && context.selection && context.selection.file) {
      return true;
    }
    return false;
  }

/**
 * Determines if an item has a sku aspect attached and therefore if the item should be allowed to be added to the cart.
 * @param context 
 * @returns 
 */
export function isSkuItem(context: RuleContext): boolean {
  
  console.log("Rules ", context);
  
  if (hasFileSelected(context)) {

   
    if (
        context.selection.file.entry.aspectNames &&
        context.selection.file.entry.aspectNames.includes('cart:skuAspect')
    ) {
      return true;
    }
  }

  return false;
}

