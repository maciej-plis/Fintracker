package matthias.expense_tracker.product

import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.*

@CrossOrigin("*")
@RestController
@RequestMapping("/purchases/products")
internal class ProductController(private val productService: ProductService) {

    @GetMapping("/names")
    fun getProductNames(@RequestParam query: String): ResponseEntity<List<String>> {
        return ok(productService.getProductNames(query))
    }
}