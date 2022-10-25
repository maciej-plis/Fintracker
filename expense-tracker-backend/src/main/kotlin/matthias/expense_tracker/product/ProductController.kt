package matthias.expense_tracker.product

import matthias.expense_tracker.openapi.api.ProductsApi
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController

@CrossOrigin("*")
@RestController
internal class ProductController(private val productService: ProductService) : ProductsApi {

    override fun getProductNames(query: String): ResponseEntity<List<String>> {
        return ok(productService.getProductNames(query))
    }
}