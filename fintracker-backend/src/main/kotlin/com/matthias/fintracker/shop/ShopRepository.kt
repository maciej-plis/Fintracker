package com.matthias.fintracker.shop

import com.matthias.fintracker.common.jpa.BaseRepository
import java.util.*

internal interface ShopRepository : BaseRepository<ShopEntity, UUID> {
    fun existsByNameIgnoreCase(name: String): Boolean
    fun findAllByOrderByName(): List<ShopEntity>
}
