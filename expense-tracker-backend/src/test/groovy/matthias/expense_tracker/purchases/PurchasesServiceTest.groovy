package matthias.expense_tracker.purchases

import matthias.expense_tracker.openapi.model.CategoryDto
import matthias.expense_tracker.openapi.model.ProductDto
import matthias.expense_tracker.openapi.model.PurchaseDto
import matthias.expense_tracker.openapi.model.ShopDto
import matthias.expense_tracker.purchases.products.ProductsMapper
import spock.lang.Specification
import spock.lang.Subject

import javax.persistence.EntityManager
import java.time.LocalDate

import static java.util.UUID.randomUUID
import static org.mapstruct.factory.Mappers.getMapper

class PurchasesServiceTest extends Specification {

    static def idSamples = (0..9).collect { randomUUID() }

    def productDto_1 = new ProductDto(name: "product 1", amount: 1, price: 1.99, description: "product 1 description", category: new CategoryDto(id: randomUUID()))
    def productDto_2 = new ProductDto(name: "product 2", amount: 0.234, price: 29.99, description: "product 2 description", category: new CategoryDto(id: randomUUID()))
    def purchaseDto = new PurchaseDto(products: [productDto_1, productDto_2], date: LocalDate.parse("2020-12-20"), shop: new ShopDto(id: randomUUID()))

    PurchasesRepository purchasesRepository = Mock()
    ProductsMapper productsMapper = getMapper(ProductsMapper)
    PurchasesMapper purchasesMapper = new PurchasesMapperImpl(productsMapper)
    EntityManager entityManager = Mock()

    @Subject
    PurchasesService purchasesService = new PurchasesService(purchasesRepository, purchasesMapper, entityManager)

    def "Should save new purchase and return it"() {
        when:
            def result = purchasesService.addPurchases(purchaseDto)

        then: "Should save purchase"
            1 * purchasesRepository.saveAndFlush(_ as PurchaseEntity) >> { args ->
                PurchaseEntity purchaseEntity = args[0]
                purchaseEntity.id = idSamples[0]
                purchaseEntity.products[0].id = idSamples[1]
                purchaseEntity.products[1].id = idSamples[2]
                return purchaseEntity
            }

        and: "Should refresh saved purchase"
            1 * entityManager.refresh(_ as PurchaseEntity) >> { args ->
                PurchaseEntity purchaseEntity = args[0]
                purchaseEntity.shop.name = "shop name"
                purchaseEntity.products[0].category.name = "category 1"
                purchaseEntity.products[1].category.name = "category 2"
            }

        and: "Should return saved and refreshed purchase"
            with(result) {
                id == idSamples[0]
                shop == new ShopDto(id: purchaseDto.shop.id, name: "shop name")
                date == LocalDate.parse("2020-12-20")
                with(products.find { it.id == idSamples[1] }) {
                    id == idSamples[1]
                    name == "product 1"
                    amount == 1
                    price == 1.99
                    description == "product 1 description"
                    category == new CategoryDto(id: productDto_1.category.id, name: "category 1")
                }
                with(products.find { it.id == idSamples[2] }) {
                    id == idSamples[2]
                    name == "product 2"
                    amount == 0.234
                    price == 29.99
                    description == "product 2 description"
                    category == new CategoryDto(id: productDto_2.category.id, name: "category 2")
                }
            }
    }
}
