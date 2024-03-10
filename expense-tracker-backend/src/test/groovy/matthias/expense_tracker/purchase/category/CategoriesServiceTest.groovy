package matthias.expense_tracker.purchase.category

import jakarta.persistence.EntityExistsException
import matthias.expense_tracker.api.models.CategoryDto
import matthias.expense_tracker.category.CategoryMapper
import spock.lang.Specification
import spock.lang.Subject

import static java.util.UUID.randomUUID
import static org.mapstruct.factory.Mappers.getMapper

class CategoriesServiceTest extends Specification {

    static def idSamples = (0..9).collect { randomUUID() }

    def categoryDto1 = new CategoryDto(name: "Food")

    CategoriesRepository categoriesDAO = Mock()
    CategoryMapper categoriesMapper = getMapper(CategoryMapper)

    @Subject
    CategoriesService categoriesService = new CategoriesService(categoriesDAO, categoriesMapper)

    def "Should return list of categories"() {
        when:
            def result = categoriesService.getProductCategories()

        then: "Should get categories"
            1 * categoriesDAO.findAll() >> [
                new CategoryEntity(id: idSamples[0], name: "Food"),
                new CategoryEntity(id: idSamples[1], name: "Clothes")
            ]

        and:
            with(result.get(0)) {
                id == idSamples[0]
                name == "Food"
            }
            with(result.get(1)) {
                id == idSamples[1]
                name == "Clothes"
            }
    }

    def "Should save new category and return it"() {
        when:
            def result = categoriesService.addProductCategory(categoryDto1)

        then: "Should check if category already exists"
            1 * categoriesDAO.existsByName(categoryDto1.name) >> false

        and: "Should save category"
            1 * categoriesDAO.save(_ as CategoryEntity) >> { args ->
                CategoryEntity category = args[0]
                category.id = idSamples[0]
                return category
            }

        and: "Should return saved category"
            with(result) {
                id == idSamples[0]
                name == "Food"
            }
    }

    def "Should throw EntityExistsException when category already exists"() {
        when:
            categoriesService.addProductCategory(categoryDto1)

        then: "Should check if category already exists"
            1 * categoriesDAO.existsByName(categoryDto1.name) >> true

        and: "EntityExistsException is thrown"
            thrown(EntityExistsException)
    }
}
