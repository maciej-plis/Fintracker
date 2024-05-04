package com.matthias.fintracker.category

import com.matthias.fintracker.api.apis.CategoriesApi
import com.matthias.fintracker.api.models.AddCategoryRequest
import com.matthias.fintracker.api.models.CategoryDTO
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
internal class CategoryController(
    private val categoryService: CategoryService
) : CategoriesApi {

    override fun getCategories(): ResponseEntity<List<CategoryDTO>> {
        return ok(categoryService.getProductCategories())
    }

    override fun getCategory(categoryId: UUID): ResponseEntity<CategoryDTO> {
        return ok(categoryService.getProductCategoryOrThrow(categoryId))
    }

    override fun addCategory(addCategoryRequest: AddCategoryRequest): ResponseEntity<UUID> {
        return ok(categoryService.addProductCategory(addCategoryRequest))
    }
}
