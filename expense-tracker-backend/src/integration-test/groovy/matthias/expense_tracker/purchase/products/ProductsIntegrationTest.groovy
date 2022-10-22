package matthias.expense_tracker.purchase.products

import matthias.expense_tracker.IntegrationTestSpecification
import matthias.expense_tracker.purchase.categories.CategoriesRepository
import matthias.expense_tracker.purchase.categories.CategoryEntity
import org.springframework.beans.factory.annotation.Autowired

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class ProductsIntegrationTest extends IntegrationTestSpecification {

    @Autowired
    ProductsRepository productsRepository

    @Autowired
    CategoriesRepository categoriesRepository

    def "Should return 200 (OK) and product names based on given query"() {
        given:
            CategoryEntity category = categoriesRepository.save(new CategoryEntity(name: "category"))
            productsRepository.saveAll([
                new ProductEntity(name: "product 1", amount: 1, price: 0.99, category: category),
                new ProductEntity(name: "product 2", amount: 1, price: 0.99, category: category),
                new ProductEntity(name: "product 11", amount: 1, price: 0.99, category: category)
            ])

        when:
            def result = mvc
                .perform(get("/purchases/products/names")
                    .queryParam("query", "duct 1"))
                .andDo(print())

        then: "Should return 200 (OK) and list of product names"
            with(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$', hasSize(2)))
                andExpect(jsonPath('$[0]').value("product 1"))
                andExpect(jsonPath('$[1]').value("product 11"))
            }

    }
}
