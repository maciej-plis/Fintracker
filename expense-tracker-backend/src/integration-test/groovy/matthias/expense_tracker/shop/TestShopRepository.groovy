package matthias.expense_tracker.shop


import org.springframework.stereotype.Repository

@Repository
interface TestShopRepository extends ShopRepository {

    ShopEntity findByName(String name)
}
