package com.matthias.fintracker.purchase

import com.matthias.fintracker.api.models.AddProductRequest
import com.matthias.fintracker.api.models.AddPurchaseRequest
import com.matthias.fintracker.api.models.PurchaseDTO
import com.matthias.fintracker.product.toDTO
import com.matthias.fintracker.product.toEntity
import com.matthias.fintracker.shop.ShopEntity
import com.matthias.fintracker.shop.toDTO
import java.util.*

fun PurchaseEntity.toDTO() = PurchaseDTO(
    id = id,
    shop = shop.toDTO(),
    date = date,
    products = products.map { it.toDTO() }
)

fun AddPurchaseRequest.toEntity(id: UUID? = null) = PurchaseEntity(id).also {
    it.shop = ShopEntity(shopId)
    it.date = date
    it.products = products.map(AddProductRequest::toEntity).toMutableList()
}
