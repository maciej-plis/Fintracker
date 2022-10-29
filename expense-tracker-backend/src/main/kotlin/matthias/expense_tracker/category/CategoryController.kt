package matthias.expense_tracker.category

import matthias.expense_tracker.openapi.api.CategoriesApi
import matthias.expense_tracker.openapi.model.AddCategoryRequest
import matthias.expense_tracker.openapi.model.CategoryDto
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController

@CrossOrigin("*")
@RestController
internal class CategoryController(private val categoryService: CategoryService) : CategoriesApi {

    override fun getProductCategories(): ResponseEntity<List<CategoryDto>> {
        return ok(categoryService.getProductCategories())
    }

    override fun addProductCategory(addCategoryRequest: AddCategoryRequest): ResponseEntity<CategoryDto> {
        return ok(categoryService.addProductCategory(addCategoryRequest))
    }
}