package matthias.fintracker.common.jpa

import jakarta.persistence.Column
import jakarta.persistence.Id
import jakarta.persistence.MappedSuperclass
import java.util.*
import java.util.UUID.randomUUID

@MappedSuperclass
abstract class BaseEntity(id: UUID? = null) {

    @Id
    @Column(nullable = false, unique = true)
    open var id: UUID = id ?: randomUUID()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is BaseEntity) return false
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}
