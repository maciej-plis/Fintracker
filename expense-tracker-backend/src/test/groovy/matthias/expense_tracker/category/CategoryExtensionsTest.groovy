package matthias.expense_tracker.category

import matthias.expense_tracker.api.models.AddCategoryRequest
import spock.lang.Specification
import spock.lang.Unroll

import static java.util.UUID.randomUUID

class CategoryExtensionsTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    @Unroll
    def "Should map AddCategoryRequest to CategoryEntity #testCase"() {
        given:
            def addCategoryRequest = new AddCategoryRequest("Food")

        when:
            def result = CategoryExtensionsKt.toEntity(addCategoryRequest, categoryId)

        then:
            verifyAll(result) {
                verifyIdFunc.call(id)
                name == "Food"
            }

        where:
            categoryId    | verifyIdFunc              || testCase
            null          | ({ it != null })          || "without id"
            idFixtures[0] | ({ it == idFixtures[0] }) || "with id"
    }

    def "Should map CategoryEntity to CategoryDTO"() {
        given:
            def categoryEntity = new CategoryEntity(idFixtures[0]).tap { name = "Food" }

        when:
            def result = CategoryExtensionsKt.toDTO(categoryEntity)

        then:
            verifyAll(result) {
                id == idFixtures[0]
                name == "Food"
            }
    }
}
