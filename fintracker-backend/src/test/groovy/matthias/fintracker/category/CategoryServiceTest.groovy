package matthias.fintracker.category

import jakarta.persistence.EntityExistsException
import matthias.fintracker.api.models.AddCategoryRequest
import matthias.fintracker.common.jpa.TransactionExecutor
import spock.lang.Specification
import spock.lang.Subject

import static java.util.UUID.randomUUID

class CategoryServiceTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    CategoryRepository categoryRepository = Mock()
    TransactionExecutor txExecutor = new TransactionExecutor()

    @Subject
    CategoryService categoriesService = new CategoryService(categoryRepository, txExecutor)

    def "Should return list of categories"() {
        when:
            def result = categoriesService.getProductCategories()

        then: "Should get categories from repository"
            1 * categoryRepository.findAllByOrderByName() >> categoryEntityFixtures()

        and: "Should return categories"
            result.size() == 2
            verifyAll(result.get(0)) {
                id == idFixtures[0]
                name == "Food"
            }
            verifyAll(result.get(1)) {
                id == idFixtures[1]
                name == "Clothes"
            }
    }

    def "Should return category for id"() {
        given:
            def categoryId = idFixtures[0]

        when:
            def result = categoriesService.getProductCategoryOrThrow(categoryId)

        then: "Should get category from repository"
            1 * categoryRepository.findByIdOrThrow(idFixtures[0]) >> categoryEntityFixtures()[0]

        and: "Should return category"
            verifyAll(result) {
                id == idFixtures[0]
                name == "Food"
            }
    }

    def "Should save new category and return its id"() {
        given:
            def request = new AddCategoryRequest("Tools")

        and:
            CategoryEntity savedCategory = null

        when:
            def result = categoriesService.addProductCategory(request)

        then: "Should check if category name already exists"
            1 * categoryRepository.existsByNameIgnoreCase("Tools") >> false

        and: "Should save category"
            1 * categoryRepository.save(_ as CategoryEntity) >> { CategoryEntity category ->
                category.id != null
                category.name == "Tools"
                return savedCategory = category
            }

        and: "Should return saved category id"
            result == savedCategory?.id
    }

    def "Should throw EntityExistsException when category name already exists"() {
        given:
            def request = new AddCategoryRequest("Tools")

        when:
            categoriesService.addProductCategory(request)

        then: "Should check if category name already exists"
            1 * categoryRepository.existsByNameIgnoreCase("Tools") >> true

        and: "Should throw EntityExistsException"
            thrown(EntityExistsException)
    }

    private static List<CategoryEntity> categoryEntityFixtures() {
        return [
            new CategoryEntity(idFixtures[0]).tap { name = "Food" },
            new CategoryEntity(idFixtures[1]).tap { name = "Clothes" }
        ]
    }
}
