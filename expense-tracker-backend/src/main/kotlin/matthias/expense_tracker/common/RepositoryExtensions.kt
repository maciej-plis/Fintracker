package matthias.expense_tracker.common

import org.springframework.data.repository.CrudRepository
import javax.persistence.EntityNotFoundException

public fun <T, ID> CrudRepository<T, ID>.findByIdOrThrow(id: ID): T {
    return this.findById(id).orElseThrow { EntityNotFoundException("${javaClass.name} couldn't find entity by id: $id") }
}