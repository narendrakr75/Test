let str = "UK:B123AB1234567:Gloves:20:Mask:10";
var myArr = str.split(":");
var country;
var passport;
var Gloves;
var Mask;





if (myArr.length == 6)
{
    country = myArr[0];
    passport = myArr[1];

    if (myArr.indexOf("Gloves") != -1)
    {
        Gloves = myArr[myArr.indexOf("Gloves")+1];
    }

    if (myArr.indexOf("Mask") != -1)
    {
        Mask = myArr[myArr.indexOf("Mask")+1];
    }
}
else if(myArr.length == 5)
{
    country = myArr[0];

    if (myArr.indexOf("Gloves") != -1)
    {
        Gloves = myArr[myArr.indexOf("Gloves")+1];
    }

    if (myArr.indexOf("Mask") != -1)
    {
        Mask = myArr[myArr.indexOf("Mask")+1];
    }
    passport = "";

}
else
{
    console.log("Invalid imput format");
    return false;
}



var uk_inventry_mask = 100;
var uk_mask_unit_price = 65;

var uk_inventry_gloves = 100;
var uk_gloves_unit_price = 100;


var german_inventry_mask = 100;
var german_mask_unit_price = 100;

var german_inventry_gloves = 50;
var german_gloves_unit_price = 150;


var shipping_cost = 400;
var discount_shipping_cost = 400 - (400 * (20 / 100));

var total_sale_price = 0;
var Mask_UK_inventory;
var Mask_Germany_inventory;
var Gloves_UK_inventory;
var Gloves_Germany_inventory;


if ((Mask > (uk_inventry_mask + german_inventry_mask)) || (Gloves > (uk_inventry_gloves + german_inventry_gloves))) {
var total_sale_price = "OUT_OF_STOCK";
var Mask_UK_inventory = uk_inventry_mask;
var Mask_Germany_inventory = german_inventry_mask;
var Gloves_UK_inventory =uk_inventry_gloves;
var Gloves_Germany_inventory = german_inventry_gloves;
}
else
{
    calculatePrice("Masks",country, Mask, uk_mask_unit_price, uk_inventry_mask, german_mask_unit_price, german_inventry_mask, discount_shipping_cost);
calculatePrice("Gloves",country, Gloves, uk_gloves_unit_price, uk_inventry_gloves, german_gloves_unit_price, german_inventry_gloves, discount_shipping_cost);

    }




function calculatePrice(type,country, mask, uk_mask_unit_price, uk_inventry_mask, german_mask_unit_price, german_inventry_mask, discount_shipping_cost)
{

    if (country == 'UK')
    {
        if (passport != "")
        {

            if (checkGermanyPassport(passport))
            {
                // use discount shipping cost 320
                //console.log("germany");
                getprice(type,mask, uk_mask_unit_price, uk_inventry_mask, german_mask_unit_price, german_inventry_mask, discount_shipping_cost);
               

            }
            else
            {
              //  console.log("germany1");
                getprice(type,mask, uk_mask_unit_price, uk_inventry_mask, german_mask_unit_price, german_inventry_mask, shipping_cost);
            }
        }
        else
        {
         // no discount allowed   
         getprice(type,mask, uk_mask_unit_price, uk_inventry_mask, german_mask_unit_price, german_inventry_mask, shipping_cost);
        }
    }
    else if (country == 'Germany')
    {
        if (passport != "")
        {

            if (checkUkPassport(passport))
            {
                // use discount shipping cost 320
                console.log("UK");
                getprice_germany(type,mask, uk_mask_unit_price, german_mask_unit_price, discount_shipping_cost);
            }
            else
            {

                getprice_germany(type,mask, uk_mask_unit_price, german_mask_unit_price, shipping_cost);
                
            }
        }
        else
        {
         // no discount allowed   
         getprice_germany(typemask, uk_mask_unit_price, german_mask_unit_price, shipping_cost);
        }
        
    }
}


function getprice(type,mask,uk_mask_unit_price,uk_inventry_mask,german_mask_unit_price,german_inventry_mask,discount_shipping_cost)
{
    var masktotal_price;
    if (mask <= uk_inventry_mask) {
        masktotal_price = (mask * uk_mask_unit_price);
       
        if (type == "Masks")
        {
            Mask_UK_inventory = uk_inventry_mask - mask;
            Mask_Germany_inventory = german_inventry_mask;
            
        }
        else if (type == "Gloves")
        {
            Gloves_UK_inventory = uk_inventry_mask - mask;
            Gloves_Germany_inventory = german_inventry_mask;
        }
     


    }
    else if (mask <= (uk_inventry_mask + german_inventry_mask)) {


       
        
        masktotal_price_uk = (uk_inventry_mask * uk_mask_unit_price);
        mask_for_german = mask - uk_inventry_mask;

        masktotal_price_german = (mask_for_german * german_mask_unit_price);
        shipping_price = Math.ceil(mask_for_german / 10);
        masktotal_price = (shipping_price * discount_shipping_cost) + masktotal_price_uk + masktotal_price_german;
        
        if (type == "Masks")
        {
            Mask_UK_inventory = 0;
            Mask_Germany_inventory = german_inventry_mask - mask_for_german;
        }
        else if (type == "Gloves")
        {
            Gloves_UK_inventory = 0;
            Gloves_Germany_inventory = german_inventry_mask - mask_for_german;
        }

    }
    total_sale_price += masktotal_price;
   
}


function getprice_germany(type,mask,uk_mask_unit_price,german_mask_unit_price,discount_shipping_cost)
{
        
                
                var price = 0;
                var count = Math.ceil(mask/10);
                for (i = 1; i <= count; i++) {
                    if (mask >= i * 10) { 
                        germanyprice = 10 * german_mask_unit_price;
                        ukprice = (10 * uk_mask_unit_price) + discount_shipping_cost;

                        if (germanyprice <= ukprice)
                        {
                            price += germanyprice;
                            if (type == "Masks")
                            {
                                
                                german_inventry_mask = german_inventry_mask - 10;
                            }
                            else if (type == "Gloves")
                            {
                                
                                german_inventry_gloves = german_inventry_gloves - 10;
                            }
                        }
                        else
                        {
                            price += ukprice;
                            if (type == "Masks")
                            {
                                
                                uk_inventry_mask = uk_inventry_mask - 10;
                            }
                            else if (type == "Gloves")
                            {
                                
                                uk_inventry_gloves = uk_inventry_gloves - 10;
                            }
                        }
                            
                    }
                    else
                    {
                        leftquantuty = (mask - (i - 1) * 10);
                        germanyprice = leftquantuty * german_mask_unit_price;
                        ukprice = (leftquantuty * uk_mask_unit_price) + discount_shipping_cost;
                       
                        if (germanyprice <= ukprice)
                        {
                            price += germanyprice;
                            if (type == "Masks")
                            {
                                
                                german_inventry_mask = german_inventry_mask - leftquantuty;
                            }
                            else if (type == "Gloves")
                            {
                                
                                german_inventry_gloves = german_inventry_gloves - leftquantuty;
                            }
                        }
                        else
                        {
                            price += ukprice;
                            if (type == "Masks")
                            {
                                
                                uk_inventry_mask = uk_inventry_mask - leftquantuty;
                            }
                            else if (type == "Gloves")
                            {
                                
                                uk_inventry_gloves = uk_inventry_gloves - leftquantuty;
                            }
                        }
                       
                    }
                }
                total_sale_price += price;
                Mask_UK_inventory = uk_inventry_mask;
                Mask_Germany_inventory = german_inventry_mask;
                Gloves_UK_inventory =uk_inventry_gloves;
                Gloves_Germany_inventory = german_inventry_gloves;
}


function checkUkPassport(passport)
{
   
    var regex = /[B]{1}[0-9]{3}[A-Z]{2}[0-9A-Z]{7}$/i;    
    if (regex.test(passport))
    {
        return true;
    }
    else
        return false
}

function checkGermanyPassport(passport)
{
    var regex = /[A]{1}[A-Z]{2}[0-9A-Z]{9}$/i;    
    if (regex.test(passport)) {  
        return true;
    }
    else
        return false;
}

console.log(total_sale_price + ":"+Mask_UK_inventory + ":"+Mask_Germany_inventory + ":"+Gloves_UK_inventory + ":"+Gloves_Germany_inventory);