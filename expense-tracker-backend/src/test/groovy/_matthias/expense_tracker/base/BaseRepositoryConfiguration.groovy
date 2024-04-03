package _matthias.expense_tracker.base

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import matthias.expense_tracker.common.jpa.BaseRepository
import matthias.expense_tracker.common.jpa.BaseRepositoryImpl
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.stereotype.Repository

import java.time.LocalDate

@TestConfiguration
@EnableJpaRepositories(basePackageClasses = BaseRepositoryConfiguration, repositoryBaseClass = BaseRepositoryImpl)
@EntityScan(basePackageClasses = BaseRepositoryConfiguration)
class BaseRepositoryConfiguration {
}

@Entity
@Table(name = "base")
class BaseEntity {
    @Id
    long id
    String name
    LocalDate date
}

@Repository
interface BaseEntityRepository extends BaseRepository<BaseEntity, Long> {

}


