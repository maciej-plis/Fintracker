package com.matthias.fintracker.common.jpa

import jakarta.persistence.EntityListeners
import jakarta.persistence.MappedSuperclass
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant
import java.util.*

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
abstract class AuditEntity : BaseEntity {

    constructor() : super()
    constructor(id: UUID?) : super(id)

    @CreatedDate
    var createdAt: Instant? = null

    @LastModifiedBy
    var modifiedAt: Instant? = null
}
