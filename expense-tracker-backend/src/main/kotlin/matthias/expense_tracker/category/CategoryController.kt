package matthias.expense_tracker.category

import matthias.expense_tracker.openapi.model.AddCategoryRequest
import matthias.expense_tracker.openapi.model.CategoryDto
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.*

@CrossOrigin("*")
@RestController
@RequestMapping("/api/categories")
internal class CategoryController(private val categoryService: CategoryService) {

    @GetMapping
    fun getProductCategories(): ResponseEntity<List<CategoryDto>> {
        return ok(categoryService.getProductCategories())
    }

    @PostMapping
    fun addProductCategory(@RequestBody addCategoryRequest: AddCategoryRequest): ResponseEntity<CategoryDto> {
        return ok(categoryService.addProductCategory(addCategoryRequest))
    }
}