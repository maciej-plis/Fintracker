package matthias.expense_tracker.purchase

import matthias.expense_tracker.openapi.model.CategoryDto
import matthias.expense_tracker.openapi.model.ProductDto
import matthias.expense_tracker.openapi.model.PurchaseDto
import matthias.expense_tracker.openapi.model.ShopDto
import matthias.expense_tracker.purchase.products.ProductsMapper
import spock.lang.Specification
import spock.lang.Subject

import javax.persistence.EntityManager
import java.time.LocalDate

import static java.util.UUID.randomUUID
import static org.mapstruct.factory.Mappers.getMapper

class PurchasesServiceTest extends Specification {

    static def idSamples = (0..9).collect { randomUUID() }

    def productDto1 = new ProductDto(new CategoryDto(idSamples[0], "Food"), "Bread", 1, 1.99f, randomUUID(), null)
    def productDto2 = new ProductDto(new CategoryDto(idSamples[1], "Clothes"), "T-Shirt", 2, 29.99f, randomUUID(), "Metallica T-Shirts")
    def purchaseDto = new PurchaseDto(new ShopDto(idSamples[2], "Walmart"), LocalDate.parse("2020-12-20"), randomUUID(), [productDto1, productDto2])

    PurchaseRepository purchaseRepository = Mock()
    ProductsMapper productsMapper = getMapper(ProductsMapper)
    PurchaseMapper purchaseMapper = new PurchaseMapperImpl(productsMapper)
    EntityManager entityManager = Mock()

    @Subject
    PurchaseService purchaseService = new PurchaseService(purchaseRepository, purchaseMapper, entityManager)

    def "Should save new purchase and return it"() {
        when:
            def result = purchaseService.addPurchases(purchaseDto)

        then: "Should save purchase"
            1 * purchaseRepository.saveAndFlush(_ as PurchaseEntity) >> { args ->
                PurchaseEntity purchaseEntity = args[0]
                purchaseEntity.id = idSamples[3]
                purchaseEntity.products[0].id = idSamples[4]
                purchaseEntity.products[1].id = idSamples[5]
                return purchaseEntity
            }

        and: "Should refresh saved purchase"
            1 * entityManager.refresh(_ as PurchaseEntity) >> { args ->
                PurchaseEntity purchaseEntity = args[0]
                purchaseEntity.shop.name = "Walmart"
                purchaseEntity.products[0].category.name = "Food"
                purchaseEntity.products[1].category.name = "Clothes"
            }

        and: "Should return saved and refreshed purchase"
            with(result) {
                id == idSamples[3]
                shop.id == idSamples[2]
                shop.name == "Walmart"
                date == LocalDate.parse("2020-12-20")
                with(products.find { it.id == idSamples[4] }) {
                    id == idSamples[4]
                    name == "Bread"
                    amount == 1
                    price == 1.99f
                    description == null
                    category.id == idSamples[0]
                    category.name == "Food"
                }
                with(products.find { it.id == idSamples[5] }) {
                    id == idSamples[5]
                    name == "T-Shirt"
                    amount == 2
                    price == 29.99f
                    description == "Metallica T-Shirts"
                    category.id == idSamples[1]
                    category.name == "Clothes"
                }
            }
    }
}
