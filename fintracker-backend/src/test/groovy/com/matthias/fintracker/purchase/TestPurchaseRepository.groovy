package com.matthias.fintracker.purchase

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface TestPurchaseRepository extends PurchaseRepository {

    @Query(value = "SELECT * FROM purchase WHERE id = :id and deleted = true", nativeQuery = true)
    PurchaseEntity getDeletedById(@Param("id") UUID id)
}
