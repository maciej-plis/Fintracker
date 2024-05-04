package com.matthias.fintracker.product

import com.matthias.fintracker.api.apis.ProductsApi
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.RestController

@RestController
internal class ProductController(
    private val productService: ProductService
) : ProductsApi {

    override fun getProductNames(filter: String): ResponseEntity<List<String>> {
        return ok(productService.getProductNames(filter))
    }
}
