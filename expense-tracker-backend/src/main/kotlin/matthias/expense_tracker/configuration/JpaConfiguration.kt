package matthias.expense_tracker.configuration

import matthias.expense_tracker.ExpenseTrackerApplication
import matthias.expense_tracker.common.jpa.BaseRepositoryImpl
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.transaction.annotation.EnableTransactionManagement

@EnableJpaAuditing
@EnableTransactionManagement
@EnableJpaRepositories(basePackageClasses = [ExpenseTrackerApplication::class], repositoryBaseClass = BaseRepositoryImpl::class)
@Configuration
class JpaConfiguration
