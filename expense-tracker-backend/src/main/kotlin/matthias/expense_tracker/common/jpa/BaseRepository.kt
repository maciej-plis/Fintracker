package matthias.expense_tracker.common.jpa

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.NoRepositoryBean
import java.io.Serializable

@NoRepositoryBean
interface BaseRepository<T, ID : Serializable> : JpaRepository<T, ID> {

    fun clearContext(): Unit

    fun refresh(entity: T): T

    fun findByIdOrThrow(id: ID): T
}