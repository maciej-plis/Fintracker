package matthias.expense_tracker.common

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant
import javax.persistence.EntityListeners
import javax.persistence.MappedSuperclass

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
abstract class AuditEntity : BaseEntity() {

    @CreatedDate
    val createdAt: Instant? = null

    @LastModifiedBy
    val modifiedAt: Instant? = null
}