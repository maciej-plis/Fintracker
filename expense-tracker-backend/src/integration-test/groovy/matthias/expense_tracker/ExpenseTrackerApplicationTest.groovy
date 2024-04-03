package matthias.expense_tracker

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext

class ExpenseTrackerApplicationTest extends IntegrationTestSpecification {

    @Autowired
    ApplicationContext context

    def "Should start application context"() {
        expect:
            context != null
    }
}
