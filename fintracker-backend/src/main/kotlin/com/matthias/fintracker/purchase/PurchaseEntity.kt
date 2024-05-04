package com.matthias.fintracker.purchase

import com.matthias.fintracker.common.jpa.AuditEntity
import com.matthias.fintracker.product.ProductEntity
import com.matthias.fintracker.shop.ShopEntity
import jakarta.persistence.*
import jakarta.persistence.CascadeType.ALL
import jakarta.persistence.FetchType.EAGER
import org.hibernate.annotations.Fetch
import org.hibernate.annotations.FetchMode.SUBSELECT
import org.hibernate.annotations.SQLDelete
import org.hibernate.annotations.SQLRestriction
import java.time.LocalDate
import java.util.*

@Entity
@Table(name = "purchase")
@SQLRestriction("deleted = false")
@SQLDelete(sql = "UPDATE purchase SET deleted = true where id = ?")
class PurchaseEntity : AuditEntity {

    constructor() : super()
    constructor(id: UUID?) : super(id)

    @Column(nullable = false)
    lateinit var date: LocalDate

    @ManyToOne(optional = false, fetch = EAGER)
    @JoinColumn(name = "shop_id", nullable = false)
    lateinit var shop: ShopEntity

    @Fetch(SUBSELECT)
    @OneToMany(cascade = [ALL], orphanRemoval = true)
    @JoinColumn(name = "purchase_id", nullable = false, updatable = false)
    @OrderColumn(columnDefinition = "int2", name = "ordinal", nullable = false)
    lateinit var products: MutableList<ProductEntity>

    @Column(nullable = false)
    var deleted: Boolean = false
}
