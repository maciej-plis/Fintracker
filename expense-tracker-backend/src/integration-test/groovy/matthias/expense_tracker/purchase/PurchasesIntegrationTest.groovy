package matthias.expense_tracker.purchase

import matthias.expense_tracker.IntegrationTestSpecification
import matthias.expense_tracker.purchase.categories.CategoriesRepository
import matthias.expense_tracker.purchase.categories.CategoryEntity
import matthias.expense_tracker.purchase.shops.ShopsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.transaction.annotation.Transactional

import static groovy.json.JsonOutput.toJson
import static java.time.LocalDate.parse
import static org.hamcrest.Matchers.hasSize
import static org.springframework.http.MediaType.APPLICATION_JSON
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@Transactional
class PurchasesIntegrationTest extends IntegrationTestSpecification {

    @Autowired
    PurchasesRepository purchasesRepository

    @Autowired
    ShopsRepository shopsRepository

    @Autowired
    CategoriesRepository categoriesRepository

    def "Should return 200 (OK) and save new purchase"() {
        given:
            ShopEntity purchaseShop = shopsRepository.save(new ShopEntity(name: "shop name"))
            CategoryEntity purchaseCategory1 = categoriesRepository.save(new CategoryEntity(name: "category 1 name"))
            CategoryEntity purchaseCategory2 = categoriesRepository.save(new CategoryEntity(name: "category 2 name"))
            String requestBody = newPurchaseRequestBody(purchaseShop.id, purchaseCategory1.id, purchaseCategory2.id)

        when:
            def result = mvc
                .perform(post("/purchases")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON))
                .andDo(print())

        then: "Should save purchase"
            def purchaseEntities = purchasesRepository.findAll()
            purchaseEntities.size() == 1
            with(purchaseEntities.get(0)) {
                id != null
                date == parse("2020-12-20")
                shop.id == purchaseShop.id
                shop.name == "shop name"
                products.size() == 2
                with(products.get(0)) {
                    id != null
                    name == "product 1"
                    amount == 1d
                    price == 1.99d
                    description == "product 1 description"
                    category.id == purchaseCategory1.id
                    category.name == "category 1 name"
                }
                with(products.get(1)) {
                    id != null
                    name == "product 2"
                    amount == 0.234d
                    price == 29.99d
                    description == "product 2 description"
                    category.id == purchaseCategory2.id
                    category.name == "category 2 name"
                }
            }

        and: "Should return 200 (OK) with newly created purchase"
            with(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$.id').isNotEmpty())
                andExpect(jsonPath('$.date').value("2020-12-20"))
                andExpect(jsonPath('$.shop.id').value(purchaseShop.id.toString()))
                andExpect(jsonPath('$.shop.name').value("shop name"))
                andExpect(jsonPath('$.products', hasSize(2)))

                andExpect(jsonPath('$.products[0].id').isNotEmpty())
                andExpect(jsonPath('$.products[0].name').value("product 1"))
                andExpect(jsonPath('$.products[0].amount').value(1))
                andExpect(jsonPath('$.products[0].price').value(1.99))
                andExpect(jsonPath('$.products[0].description').value("product 1 description"))
                andExpect(jsonPath('$.products[0].category.id').value(purchaseCategory1.id.toString()))
                andExpect(jsonPath('$.products[0].category.name').value("category 1 name"))

                andExpect(jsonPath('$.products[1].id').isNotEmpty())
                andExpect(jsonPath('$.products[1].name').value("product 2"))
                andExpect(jsonPath('$.products[1].amount').value(0.234))
                andExpect(jsonPath('$.products[1].price').value(29.99))
                andExpect(jsonPath('$.products[1].description').value("product 2 description"))
                andExpect(jsonPath('$.products[1].category.id').value(purchaseCategory2.id.toString()))
                andExpect(jsonPath('$.products[1].category.name').value("category 2 name"))
            }
    }

    private String newPurchaseRequestBody(UUID shopId, UUID... categoryIds) {
        return toJson([
            shop    : [id: shopId],
            date    : "2020-12-20",
            products: [
                [
                    name       : "product 1",
                    amount     : 1,
                    price      : 1.99,
                    description: "product 1 description",
                    category   : [id: categoryIds[0]]
                ],
                [
                    name       : "product 2",
                    amount     : 0.234,
                    price      : 29.99,
                    description: "product 2 description",
                    category   : [id: categoryIds[1]]
                ]
            ]
        ])
    }
}
