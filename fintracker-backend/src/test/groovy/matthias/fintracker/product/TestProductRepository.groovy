package matthias.fintracker.product


import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface TestProductRepository extends ProductRepository {

    @Query(value = "SELECT * FROM product WHERE id = :id and deleted = true", nativeQuery = true)
    ProductEntity getDeletedById(@Param("id") UUID id)
}
