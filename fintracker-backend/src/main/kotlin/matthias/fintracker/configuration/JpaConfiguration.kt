package matthias.fintracker.configuration

import matthias.fintracker.FinTrackerApplication
import matthias.fintracker.common.jpa.BaseRepositoryImpl
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.transaction.annotation.EnableTransactionManagement

@EnableJpaAuditing
@EnableTransactionManagement
@EnableJpaRepositories(basePackageClasses = [FinTrackerApplication::class], repositoryBaseClass = BaseRepositoryImpl::class)
@Configuration
class JpaConfiguration
