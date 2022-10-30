package matthias.expense_tracker.common.jpa

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant
import java.util.*
import javax.persistence.EntityListeners
import javax.persistence.MappedSuperclass

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
abstract class AuditEntity : BaseEntity {

    constructor() : super()
    constructor(id: UUID?) : super(id)

    @CreatedDate
    val createdAt: Instant? = null

    @LastModifiedBy
    val modifiedAt: Instant? = null
}