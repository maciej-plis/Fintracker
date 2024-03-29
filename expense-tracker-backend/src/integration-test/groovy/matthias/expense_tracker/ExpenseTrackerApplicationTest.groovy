package matthias.expense_tracker

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.ApplicationContext

@SpringBootTest
class ExpenseTrackerApplicationTest extends IntegrationTestSpecification {

    @Autowired
    ApplicationContext context

    def "Should start application context"() {
        expect:
            context != null
    }
}
