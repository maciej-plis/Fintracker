package com.matthias.fintracker.product

import com.matthias.fintracker.api.models.AddProductRequest
import com.matthias.fintracker.api.models.ProductDTO
import com.matthias.fintracker.api.models.UpdateProductRequest
import com.matthias.fintracker.category.CategoryEntity
import com.matthias.fintracker.category.toDTO

fun ProductEntity.toDTO() = ProductDTO(
    id = id,
    category = category.toDTO(),
    name = name,
    amount = amount,
    price = price,
    description = description
)

fun AddProductRequest.toEntity() = ProductEntity().also {
    it.category = CategoryEntity(categoryId)
    it.name = name
    it.amount = amount
    it.price = price
    it.description = description
}

fun UpdateProductRequest.toEntity() = ProductEntity(id).also {
    it.category = CategoryEntity(categoryId)
    it.name = name
    it.amount = amount
    it.price = price
    it.description = description
}
