package matthias.expense_tracker.common.jpa

import io.github.perplexhub.rsql.RSQLJPASupport.toSort
import io.github.perplexhub.rsql.RSQLJPASupport.toSpecification
import jakarta.persistence.EntityManager
import jakarta.persistence.EntityNotFoundException
import org.springframework.data.domain.Page
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.support.JpaEntityInformation
import org.springframework.data.jpa.repository.support.SimpleJpaRepository
import org.springframework.data.repository.NoRepositoryBean
import java.io.Serializable

@NoRepositoryBean
interface BaseRepository<T, ID : Serializable> : JpaRepository<T, ID> {
    fun findAll(paginationRequest: PaginationRequest): Page<T>
    fun findByIdOrThrow(id: ID): T
}

class BaseRepositoryImpl<T, ID : Serializable>(
    jpaEntityInformation: JpaEntityInformation<T, ID>,
    entityManager: EntityManager
) : SimpleJpaRepository<T, ID>(jpaEntityInformation, entityManager), BaseRepository<T, ID> {

    override fun findAll(paginationRequest: PaginationRequest): Page<T> = findAll(
        toSpecification<T>(paginationRequest.filter).and(toSort(paginationRequest.sort + ";id,asc")),
        paginationRequest.pageable
    )

    override fun findByIdOrThrow(id: ID): T {
        return findById(id).orElseThrow { EntityNotFoundException("couldn't find ${domainClass.simpleName} by id: $id") }
    }
}
