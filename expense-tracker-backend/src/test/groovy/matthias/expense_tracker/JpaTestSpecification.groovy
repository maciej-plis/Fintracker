package matthias.expense_tracker

import matthias.expense_tracker.configuration.JpaConfiguration
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.context.annotation.Import
import org.springframework.test.context.ActiveProfiles

@DataJpaTest
@ActiveProfiles("test")
@Import(JpaConfiguration)
class JpaTestSpecification extends PostgreSqlTestSpecification {
}
