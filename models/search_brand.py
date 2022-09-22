from odoo import api, fields, models
from odoo.osv import expression
class SearchBrand(models.Model):
    _inherit="sale.order"
    product_brand_id = fields.Many2one(comodel_name="product.brand", string="Brand")
    def get_name(self):
        res =[]
        for rec in self:
            res.append((rec.id,'%s - %s' %(rec.porduct_id, rec.product_brand_id)))
        return  res
    @api.model
    def _name_search(self, name='', args=None, operator='in', limit=100):
        if args is None:
            args =[]
        domain = args + ['|', ('name', operator, name), ('product_brand_id.name', operator, name)]
        return super(SearchBrand, self).search(domain , limit=limit).get_name()