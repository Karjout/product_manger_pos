odoo.define('product_brand.product_brand_order_line',function(require){
"use strict";
var models = require('point_of_sale.models');
var _super_product = models.Product.prototype;
var POS_db = require('point_of_sale.DB');

models.load_fields('product.product', 'product_brand_id');
  models.Product = models.Product.extend({
    initialize:function(attr,option){
        var line = _super_product.initialize.apply(this,arguments);
        this.brand_id = this.product_brand_id[1];

        console.log("brand->name",this.brand_id);
        }
    });

   POS_db.include({
    _product_search_string: function(product){
        var str = product.display_name;
        if (product.barcode) {
            str += '|' + product.barcode;
        }
        if (product.default_code) {
            str += '|' + product.default_code;
        }
        if (product.description) {
            str += '|' + product.description;
        }
        //search by brand_name
        if (product.product_brand_id[1]) {
            str += '|' + product.product_brand_id[1];
        }
        if (product.description_sale) {
            str += '|' + product.description_sale;
        }
        str  = product.id + ':' + str.replace(/:/g,'') + '\n';
        return str;
    },
});

})

