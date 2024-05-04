package com.matthias.fintracker

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext

class FinTrackerApplicationTest extends IntegrationTestSpecification {

    @Autowired
    ApplicationContext context

    def "Should start application context"() {
        expect:
            context != null
    }
}
