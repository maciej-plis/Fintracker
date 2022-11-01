package matthias.expense_tracker.common.jpa

import org.springframework.data.jpa.repository.support.JpaEntityInformation
import org.springframework.data.jpa.repository.support.SimpleJpaRepository
import org.springframework.transaction.annotation.Transactional
import java.io.Serializable
import javax.persistence.EntityManager
import javax.persistence.EntityNotFoundException

class BaseRepositoryImpl<T, ID : Serializable>(
    jpaEntityInformation: JpaEntityInformation<T, ID>,
    private val entityManager: EntityManager
) : SimpleJpaRepository<T, ID>(jpaEntityInformation, entityManager), BaseRepository<T, ID> {

    override fun clearContext(): Unit {
        entityManager.clear()
    }

    @Transactional
    override fun refresh(entity: T): T {
        entityManager.refresh(entity)
        return entity
    }

    @Transactional
    override fun findByIdOrThrow(id: ID): T {
        return findById(id).orElseThrow { EntityNotFoundException("couldn't find ${domainClass.simpleName} by id: $id") }
    }
}